package org.example.data;

import org.example.models.Question;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class QuestionJdbcTemplateRepositoryTest {

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    static boolean hasSetup = false;

    @BeforeEach
    void setup() {
        if (!hasSetup) {
            hasSetup = true;
            jdbcTemplate.update("call set_known_good_state();");
        }
    }

    @Test
    void shouldFindAll() {
        List<Question> result = questionRepository.findAll();
        assertNotNull(result);
        assertTrue(result.size() >= 2);
    }

    @Test
    void shouldFindByQuestionIdIfIdExists() {
        Question result = questionRepository.findByQuestionId(1);
        assertNotNull(result);

        assertEquals("Test Question Title 1", result.getQuestionTitle());
    }

//FOR SERVICE:
//    @Test
//    void shouldNotFindByQuestionIdIfIdDoesNotExist() {
//        int invalidQuestionId = 5;
//
//        Question result = questionRepository.findByQuestionId(invalidQuestionId);
//
//        assertNull(result);
//
//    }

    @Test
    void shouldCreate() {
        Question question = new Question();
        question.setQuestionTitle("Flat Earth");
        question.setQuestionInput("I believe that Earth is flat because asdkjladkjadjk");
        question.setUserId(1);
        question.setUsername("john@smith.com");

        Question result = questionRepository.create(question);

        assertNotNull(result);

        assertEquals(3, result.getQuestionId());
        assertEquals("Flat Earth", result.getQuestionTitle());

        assertEquals(result, questionRepository.findByQuestionId(3));

    }

}