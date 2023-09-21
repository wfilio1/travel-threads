package org.example.controller;


import org.example.domain.AnswerService;
import org.example.domain.AppUserService;
import org.example.domain.QuestionService;
import org.example.domain.Result;
import org.example.models.Answer;
import org.example.models.AppUser;

import org.example.models.Question;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping ("/api/answer")
@CrossOrigin
public class AnswerController {
    private final AnswerService answerService;

    private final AppUserService appUserService;

    private final QuestionService questionService;

    public AnswerController(AnswerService answerService, AppUserService appUserService, QuestionService questionService) {
        this.answerService = answerService;
        this.appUserService = appUserService;
        this.questionService = questionService;
    }

    @GetMapping
    public List<Answer> findAll() throws DataAccessException {
        return answerService.findAll();
    }
    @GetMapping("/{questionId}")
    public List<Answer> getAnswersForQuestion(@PathVariable int questionId) throws org.example.data.DataAccessException {
        List<Answer> allAnswers = answerService.findByQuestion(questionId);

        return allAnswers;
    }

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody Answer question) throws DataAccessException, org.example.data.DataAccessException {
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        AppUser appUser = (AppUser) appUserService.loadUserByUsername(username);
        question.setUserId(appUser.getAppUserId());

        Result<Answer> result = answerService.create(question);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }
}
