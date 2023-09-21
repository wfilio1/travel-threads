package org.example.models;

import java.util.Objects;

public class Answer {
    private int answerId;
    private String answerInput;
    int userId;
    int questionId;

    String username;

    public Answer() {}

    public Answer(int answerId, String answerInput, int userId, int questionId, String username) {
        this.answerId = answerId;
        this.answerInput = answerInput;
        this.userId = userId;
        this.questionId = questionId;
        this.username = username;
    }

    public int getAnswerId() {
        return answerId;
    }

    public void setAnswerId(int answerId) {
        this.answerId = answerId;
    }

    public String getAnswerInput() {
        return answerInput;
    }

    public void setAnswerInput(String answerInput) {
        this.answerInput = answerInput;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Answer answer = (Answer) o;
        return answerId == answer.answerId && userId == answer.userId && questionId == answer.questionId && Objects.equals(answerInput, answer.answerInput) && Objects.equals(username, answer.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(answerId, answerInput, userId, questionId, username);
    }
}
