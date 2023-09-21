package org.example.domain;

import org.example.data.AppUserRepository;
import org.example.data.DataAccessException;
import org.example.data.QuestionRepository;
import org.example.models.Answer;
import org.example.models.AppUser;
import org.example.models.Category;
import org.example.models.Question;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    private QuestionRepository questionRepository;


    public QuestionService(QuestionRepository questionRepository) throws DataAccessException {
        this.questionRepository = questionRepository;
    }

    public List<Question> findAll() throws DataAccessException {
        return questionRepository.findAll();
    }

    public List<Category> findAllCategories() {
        return questionRepository.findAllCategories();
    }

    public Question findByQuestionId(int questionId) throws DataAccessException {
        return questionRepository.findByQuestionId(questionId);
    }

    public List<Question> findQuestionByUsername(int userId) throws DataAccessException {
        return questionRepository.findQuestionByUserId(userId);
    }

    public Result create(Question question) throws DataAccessException {
        Result result = validate(question);

        if (question != null && question.getQuestionId() > 0) {
            result.addErrorMessage("Question `id` should not be set.", ResultType.INVALID);
        }

        if (result.isSuccess()) {
            question = questionRepository.create(question);
            result.setPayload(question);
        }

        return result;
    }

    public Result update(Question question) throws DataAccessException {
        Result result = validate(question);

        if(question.getQuestionId() <= 0 ) {
            result.addErrorMessage("Question ID is required.", ResultType.INVALID);
        }

        if(result.isSuccess()) {
            if(questionRepository.update(question)) {
                result.setPayload(question);
            } else {
                result.addErrorMessage("Question was not found", ResultType.NOT_FOUND);
            }
        }
        return result;

    }

    public Result delete(int questionId) {
        Result result = new Result();

        if(!questionRepository.delete(questionId)) {
            result.addErrorMessage("Question was not found.", ResultType.NOT_FOUND);
        }
        return result;
    }

    private Result validate(Question question) throws DataAccessException {
        Result result = new Result();

        if (question == null) {
            result.addErrorMessage("Question cannot be null.", ResultType.INVALID);
            return result;
        }

        if (question.getQuestionTitle() == null || question.getQuestionTitle().isBlank()) {
            result.addErrorMessage("Title is required.", ResultType.INVALID);
        }

        if (question.getQuestionInput() == null || question.getQuestionInput().isBlank()) {
            result.addErrorMessage("Question body message is required.",
                    ResultType.INVALID);
        }

        if (question.getUserId() == 0) {
            result.addErrorMessage("User ID is required.", ResultType.INVALID);
        }

        if (question.getCategoryId() == 0) {
            result.addErrorMessage("Category is required.", ResultType.INVALID);
        }

        return result;
    }


}
