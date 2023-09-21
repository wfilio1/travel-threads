package org.example.controller;

import org.example.data.DataAccessException;
import org.example.data.QuestionRepository;
import org.example.domain.AppUserService;
import org.example.domain.QuestionService;
import org.example.domain.Result;
import org.example.domain.ResultType;
import org.example.models.AppUser;
import org.example.models.Question;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/question")
@CrossOrigin
public class QuestionController {

    private final QuestionService service;

    private final AppUserService appUserService;

    public QuestionController(QuestionService service, AppUserService appUserService) {
        this.service = service;
        this.appUserService = appUserService;
    }

    @GetMapping
    public List<Question> findAll() throws DataAccessException {
        return service.findAll();
    }

    @GetMapping("/{questionId}")
    public ResponseEntity<Question> findByQuestionId(@PathVariable int questionId) throws DataAccessException {
        Question question = service.findByQuestionId(questionId);
        if (question == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(question);
    }

    @GetMapping("/personal")
    public List<Question> findPersonalQuestions() throws DataAccessException {
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        AppUser appUser = (AppUser) appUserService.loadUserByUsername(username);

        return service.findQuestionByUsername(appUser.getAppUserId());
    }



    @PostMapping
    public ResponseEntity<Object> create(@RequestBody Question question) throws DataAccessException {
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        AppUser appUser = (AppUser) appUserService.loadUserByUsername(username);
        question.setUserId(appUser.getAppUserId());

        Result<Question> result = service.create(question);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{questionId}")
    public ResponseEntity<?> update(@PathVariable int questionId, @RequestBody Question question) throws DataAccessException {
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        AppUser appUser = (AppUser) appUserService.loadUserByUsername(username);
        question.setUserId(appUser.getAppUserId());

        if (questionId != question.getQuestionId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result result = service.update(question);
        if (!result.isSuccess()) {
            if (result.getResultType() == ResultType.NOT_FOUND) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(result.getErrorMessages(), HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{questionId}")
    public ResponseEntity<Void> delete(@PathVariable int questionId) throws DataAccessException {
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        AppUser appUser = (AppUser) appUserService.loadUserByUsername(username);

        Question question = service.findByQuestionId(questionId);

        if(appUser.getAppUserId() != question.getUserId()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Result result = service.delete(questionId);
        if (result.getResultType() == ResultType.NOT_FOUND) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
