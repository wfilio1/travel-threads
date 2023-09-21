package org.example.data;

import org.example.models.Answer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AnswerJdbcTemplateRepositoryTest {

    @Autowired
    private AnswerRepository answerRepository;

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
        List<Answer> result = answerRepository.findAll();
        assertNotNull(result);
        assertTrue(result.size() >= 2);
    }

    @Test
    void findByQuestionID() {
        List<Answer> result = answerRepository.findByQuestion(2);
        assertNotNull(result);
        assertTrue(result.size() == 2);
    }

    @Test
    void shouldFindByAnswerId() {
        Answer result = answerRepository.findByAnswerId(1);//existing id
        assertNotNull(result);
        assertEquals("Answer 1 Input", result.getAnswerInput());
    }

    @Test
    void shouldCreate() {
        Answer answer = new Answer();
        answer.setAnswerInput("I think something and something to your question");
        answer.setUserId(1);
        answer.setQuestionId(2);//existing question id

        Answer result = answerRepository.create(answer);


        assertNotNull(result);
        assertEquals("I think something and something to your question", result.getAnswerInput());

        assertEquals(result, answerRepository.findByAnswerId(4));

    }

}
