package org.example.data;




import org.example.models.Answer;

import java.util.List;

public interface AnswerRepository {
    List<Answer> findAll();

    List<Answer> findByQuestion(int question_id);

    Answer findByAnswerId(int answerId);

//    Answer findByUserId(int userId);

    Answer findByUsername(String username);

    Answer create(Answer answer);

}
