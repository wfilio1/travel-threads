package org.example.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import org.example.domain.AppUserService;
import org.example.domain.QuestionService;
import org.example.domain.Result;
import org.example.models.AppUser;
import org.example.models.Question;
import org.example.security.JwtConverter;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.web.servlet.MockMvc;


import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class QuestionControllerTest {

    @MockBean
    QuestionService service;

    @MockBean
    AppUserService appUserService;

    @MockBean
    JwtConverter jwtConverter;

    @Autowired
    MockMvc mvc;

    @Test
    void shouldFindAllShouldReturnSuccessful() throws Exception {
        List<Question> questions = List.of(
                new Question(1, "Title 1", "Input 1", 1, "john@smith.com"),
                new Question(2, "Title 2", "Input 2", 2, "sally@jones.com")
        );

        ObjectMapper jsonMapper = new ObjectMapper();
        String expectedJson = jsonMapper.writeValueAsString(questions);

        when(service.findAll()).thenReturn(questions);

        mvc.perform(get("/api/stackoverflow/question"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(expectedJson));

    }

//    @WithMockUser(authorities = {"USER"})
    @Test
    void findByQuestionIdShouldReturnSuccessful() throws Exception {

        Question question = new Question(3, "Title 3", "Input 3", 2, "sally@jones.com");

        ObjectMapper jsonMapper = new ObjectMapper();
        String expectedJson = jsonMapper.writeValueAsString(question);

        when(service.findByQuestionId(3)).thenReturn(question);

        mvc.perform(get("/api/stackoverflow/question/3"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(expectedJson));

    }

    @Test
    void findByQuestionIdShouldReturnNotFound() throws Exception {
        int questionId = 100;

        ObjectMapper jsonMapper = new ObjectMapper();
        String jsonIn = jsonMapper.writeValueAsString(questionId);

        when(service.findByQuestionId(100)).thenReturn(null);

        var request = get("/api/stackoverflow/question/100")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonIn);

        mvc.perform(request)
                .andExpect(status().isBadRequest());

    }

    @Test
    void create() {

        //mock the jwt converter mockbean jwtconverter
        //when jwtconverter.getUserFrom (token)


    }

    @Test
    public void createQuestion() throws Exception {
        // Mock authenticated user
        Authentication authentication = Mockito.mock(Authentication.class);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        when(authentication.getPrincipal()).thenReturn("username");

        AppUser mockAppUser = new AppUser();
        mockAppUser.setAppUserId(1);
        when(appUserService.loadUserByUsername("username")).thenReturn(mockAppUser);

        Question questionIn = new Question(0, "Test Question", "Test Input", 1, "username");
        Question questionOut = new Question(1, "Test Question", "Test Input", 1, "username");


        Result<Question> result = new Result();
        result.setPayload(questionIn);
        when(service.create(questionIn)).thenReturn(result);


        ObjectMapper jsonMapper = new ObjectMapper();
        String jsonIn = jsonMapper.writeValueAsString(questionIn);

        String jsonOut = jsonMapper.writeValueAsString(questionOut);

        var request = post("/api/question")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonIn);
        mvc.perform(request)
                .andExpect(status().isCreated())
                .andExpect(content().json(jsonOut));
    }

}