package org.example.controller;



import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.example.data.DataAccessException;
import org.example.domain.AnswerService;
import org.example.domain.Result;
import org.example.models.Answer;
import org.example.security.JwtConverter;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.web.servlet.MockMvc;



import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AnswerControllerTest {

    @MockBean
    AnswerService answerService;

    @MockBean
    JwtConverter jwtConverter;

    @InjectMocks
    private AnswerController answerController;

    @Autowired
    MockMvc mvc;

    //shouldFindAll
    //shouldCreateAnswerForValidQuestion
    //shouldNOTCreateAnswerIFBlank
    //shouldNOTCreateAnswerForInvalidQuestion
    public static String serializeObjectToJson(Object o) throws JsonProcessingException {
        return new ObjectMapper()
                .registerModule(new JavaTimeModule())
                .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
                .writeValueAsString(o);
    }
    @Test
    void shouldFindAll() throws Exception {
        List<Answer> answers = List.of(
                new Answer(1, "Answer 1 Input", 2, 1, "sally@jones.com"),
                new Answer(2, "Answer 2 Input", 1, 2, "john@smith.com"),
                new Answer(3, "Answer 2 Input", 1, 2, "john@smith.com")
        );

        ObjectMapper jsonMapper = new ObjectMapper();
        String expectedJson = jsonMapper.writeValueAsString(answers);

        when(answerService.findAll()).thenReturn(answers);

        mvc.perform(get("/api/stackoverflow/answer"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(expectedJson));
    }

    @Test
    void shouldCreateAnswerForValidQuestion() throws Exception {

            Answer newAnswer = new Answer(4, "New Answer Input", 1, 1, "john@smith.com");
//            String token = "aaa";

        UserDetails userDetails = User.withUsername("john@smith.com")
                .password("P@ssw0rd!")
                .roles("USER")
                .build();

            String token = jwtConverter.getTokenFromUser(userDetails);//something wrong here
           when(jwtConverter.getTokenFromUser(Mockito.any())).thenReturn(token); // Mock jwt converter
//            when(answerService.create(Mockito.any(Answer.class))).thenReturn(newAnswer); // Mock the service

            ObjectMapper objectMapper = new ObjectMapper();
            String newAnswerJson = objectMapper.writeValueAsString(newAnswer);

             Result<Answer> createResult = new Result<>();
             createResult.setPayload(newAnswer);
             when(answerService.create(Mockito.any())).thenReturn(createResult);


            mvc.perform(post("/api/stackoverflow/answer")
                            .header("Authorization", "Bearer " + token)
                            .content(newAnswerJson)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk());
//coming out as 403 so something isn't being authorized right// token is coming out null, should i force it?
        }
    }


