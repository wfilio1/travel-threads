package org.example.controller;

import org.example.domain.QuestionService;
import org.example.models.Category;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/category")
@CrossOrigin
public class CategoryController {

    private final QuestionService service;

    public CategoryController(QuestionService service) {
        this.service = service;
    }

    @GetMapping()
    public List<Category> findAllCategories() { return service.findAllCategories(); }
}
