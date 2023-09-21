package org.example.domain;

import org.example.data.AnswerRepository;
import org.example.data.DataAccessException;
import org.example.models.Answer;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;


@SpringBootTest
class AnswerServiceTest {

    @Autowired
    AnswerService answerService;

    @MockBean
    AnswerRepository answerRepository;

//    @Test
//    void shouldFindOneAnswerForQuestionOne() throws DataAccessException {
//        when(answerRepository.findByQuestion(1)).thenReturn(List.of(
//                new Answer(1,"Answer 1 Input", 2, 1)
//        ));
//        List<Answer> answers = answerService.findByQuestion(1);
//        assertEquals(1, answers.size());
//    }

//    @Test
//    void shouldFindTwoAnswersForQuestionTwo() throws DataAccessException {
//        when(answerRepository.findByQuestion(2)).thenReturn(List.of(
//                new Answer(2,"Answer 2 Input", 1, 2),
//                new Answer(3,"Answer 2 Input", 1, 2)
//        ));
//        List<Answer> answers = answerService.findByQuestion(2);
//        assertEquals(2, answers.size());
//    }

    @Test
    void shouldFindByAnswerIdOf1() {
    }

    @Test
    void shouldCreateAnswer() throws DataAccessException{
        Answer answer = new Answer();
        answer.setAnswerInput("New Answer");
        answer.setUserId(1);//valid id
        answer.setQuestionId(1);//valid question id

        when(answerRepository.create(answer)).thenReturn(answer);

        Result result = answerService.create(answer);

        assertNotNull(result);
    }

//    @Test
//    void shouldNOTCreateAnswerWithInvalidUser() throws DataAccessException{
//        Answer answer = new Answer();
//        answer.setAnswerInput("New Answer");
//        answer.setUserId(5);//invalid id
//        answer.setQuestionId(1);//valid question id
//
//        when(answerRepository.create(answer)).thenReturn(answer);
//
//        Result result = answerService.create(answer);
//
//        assertNull(result);
//    }
//
//    @Test
//    void shouldNOTCreateAnswerWithInvalidQuestion() throws DataAccessException{
//        Answer answer = new Answer();
//        answer.setAnswerInput("New Answer");
//        answer.setUserId(1);
//        answer.setQuestionId(5);//invalid question id
//
//        when(answerRepository.create(answer)).thenReturn(answer);
//
//        Result result = answerService.create(answer);
//
//        assertNull(result);
//    }

    @Test
    void shouldValidateAnswer() {

    }
}
