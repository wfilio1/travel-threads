package org.example.domain;

import org.example.data.AnswerRepository;
import org.example.data.DataAccessException;
import org.example.models.Answer;
import org.springframework.stereotype.Service;

import javax.xml.crypto.Data;
import java.util.List;
@Service
public class AnswerService {

    private AnswerRepository answerRepository;

    public AnswerService(AnswerRepository answerRepository)
    {this.answerRepository = answerRepository;}

    public List<Answer> findAll() {return answerRepository.findAll();}

    public Answer findByAnswerId(int answerId) {
        return answerRepository.findByAnswerId(answerId);
    }

    public List<Answer> findByQuestion(int questionId) throws DataAccessException {
        return answerRepository.findByQuestion(questionId);
    }

    public Answer findByUsername(String username) throws DataAccessException {
        return answerRepository.findByUsername(username);
    }

    public Result create(Answer answer) throws DataAccessException{
        Result result = validate(answer);

        if (answer != null && answer.getAnswerId() > 0) {
            result.addErrorMessage("Answer `id` should not be set.", ResultType.INVALID);
        }

        if (result.isSuccess()) {
            answer = answerRepository.create(answer);
            result.setPayload(answer);
        }

        return result;
    }

    private Result validate(Answer answer) throws DataAccessException {
    Result<Answer> result = new Result<>();

    if (answer == null) {
        result.addErrorMessage("Answer cannot be null", ResultType.INVALID);
        return result;
    }

    if (answer.getAnswerInput() == null || answer.getAnswerInput().isBlank()) {
        result.addErrorMessage("Answer is required", ResultType.INVALID);
        return result;
    }

    if (answer.getUserId() == 0) {
        result.addErrorMessage("User ID is required", ResultType.INVALID);
    }

    if (answer.getQuestionId() == 0) {
        result.addErrorMessage("Question ID is required", ResultType.INVALID);
    }

    return result;
}
}

