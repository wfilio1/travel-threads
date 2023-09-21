package org.example.data;

import org.example.models.Category;
import org.example.models.Question;

import java.util.List;

public interface QuestionRepository {

    List<Question> findAll();

    Question findByQuestionId(int questionId);

    Question create(Question question);

    boolean update(Question question);

    boolean delete(int questionId);

    List<Question> findQuestionByUserId(int userId);

    List<Category> findAllCategories();


}