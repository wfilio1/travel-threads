package org.example.domain;

import org.example.data.DataAccessException;
import org.example.data.QuestionRepository;
import org.example.models.Question;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class QuestionServiceTest {

    @Autowired
    QuestionService service;

    @MockBean
    QuestionRepository repository;


    @Test
    void shouldFindByQuestionIdIfExists() throws DataAccessException {
        Question expected = new Question(1, "TITLE 1", "INPUT 1", 1, "john@smith.com");

        when(repository.findByQuestionId(1)).thenReturn(expected);

        Question actual = service.findByQuestionId(1);

        assertEquals(expected, actual);
        assertEquals("TITLE 1", expected.getQuestionTitle());
        assertEquals(1, expected.getQuestionId());


    }

    @Test
    void shouldNotFindByQuestionIdIfDoesNotExist() throws DataAccessException {
        Question actual = service.findByQuestionId(100);

        assertNull(actual);

    }

    @Test
    void shouldFindByUserIdIfIdExist() {

    }

    @Test
    void shouldCreate() throws DataAccessException {
        Question questionIn = new Question(0, "TITLE 1", "INPUT 1", 1, "john@smith.com");
        Question questionOut = new Question(1, "TITLE 1", "INPUT 1", 1, "john@smith.com");

        when(repository.create(questionIn)).thenReturn(questionOut);

        Result<Question> result = service.create(questionIn);

        assertTrue(result.isSuccess());

        assertEquals(questionOut, result.getPayload());
    }

    @Test
    void shouldNotCreateIfQuestionTitleIsEmpty() throws DataAccessException {
        Question questionIn = new Question(0, "", "INPUT 1", 1, "john@smith.com");

        Result<Question> result = service.create(questionIn);

        assertFalse(result.isSuccess());

        assertEquals(ResultType.INVALID, result.getResultType());
        assertTrue(result.getErrorMessages().contains("Title is required."));

        assertNull(result.getPayload());
    }

    @Test
    void shouldNotCreateIfQuestionInputIsEmpty() throws DataAccessException {
        Question questionIn = new Question(0, "TEST1 ", "", 1, "john@smith.com");

        Result<Question> result = service.create(questionIn);

        assertFalse(result.isSuccess());

        assertEquals(ResultType.INVALID, result.getResultType());
        assertTrue(result.getErrorMessages().contains("Question body message is required."));

        assertNull(result.getPayload());

    }

    @Test
    void shouldNotCreateIfUserIdIsZero() throws DataAccessException {
        Question questionIn = new Question(0, "TEST1 ", "INPUT 1", 0, "john@smith.com");

        Result<Question> result = service.create(questionIn);

        assertFalse(result.isSuccess());

        assertEquals(ResultType.INVALID, result.getResultType());
        assertTrue(result.getErrorMessages().contains("User ID is required."));

        assertNull(result.getPayload());

    }

}