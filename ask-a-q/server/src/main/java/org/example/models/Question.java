package org.example.models;

import java.util.Objects;

public class Question {

    private int questionId;

    private String questionTitle;

    private String questionInput;

    private int userId;

    private String username;

    private int categoryId;

    public Question() {}

    public Question(int questionId, String questionTitle, String questionInput, int userId, String username, int categoryId) {
        this.questionId = questionId;
        this.questionTitle = questionTitle;
        this.questionInput = questionInput;
        this.userId = userId;
        this.username = username;
        this.categoryId = categoryId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public String getQuestionTitle() {
        return questionTitle;
    }

    public void setQuestionTitle(String questionTitle) {
        this.questionTitle = questionTitle;
    }

    public String getQuestionInput() {
        return questionInput;
    }

    public void setQuestionInput(String questionInput) {
        this.questionInput = questionInput;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Question question)) return false;
        return questionId == question.questionId && userId == question.userId && categoryId == question.categoryId && Objects.equals(questionTitle, question.questionTitle) && Objects.equals(questionInput, question.questionInput) && Objects.equals(username, question.username);
    }

    @Override
    public int hashCode() {
        return Objects.hash(questionId, questionTitle, questionInput, userId, username, categoryId);
    }
}
