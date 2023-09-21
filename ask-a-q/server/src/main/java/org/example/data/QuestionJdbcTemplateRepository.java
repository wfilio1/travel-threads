package org.example.data;

import org.example.models.Category;
import org.example.models.Question;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class QuestionJdbcTemplateRepository implements QuestionRepository {

    private final JdbcTemplate jdbcTemplate;



    public QuestionJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Question> mapper = (resultSet, rowIndex) -> {
        Question question = new Question();

        question.setQuestionId(resultSet.getInt("question_id"));
        question.setQuestionTitle(resultSet.getString("question_title"));
        question.setQuestionInput(resultSet.getString("question_input"));
        question.setUserId(resultSet.getInt("app_user_id"));
        question.setUsername(resultSet.getString("username"));
        question.setCategoryId(resultSet.getInt("category_id"));

        return question;
    };

    private final RowMapper<Category> categoryMapper = (resultSet, rowIndex) -> {
        Category category = new Category();

        category.setCategoryId(resultSet.getInt("category_id"));
        category.setCategoryName(resultSet.getString("category_name"));

        return category;
    };

    @Override
    public List<Question> findAll() {
        final String sql = "select question_id, question_title, question_input, q.app_user_id, category_id, a.username " +
                "from question q join app_user a on q.app_user_id = a.app_user_id " +
                "order by question_id;";

        return jdbcTemplate.query(sql, mapper);
    }

    @Override
    public Question findByQuestionId(int questionId) {
        final String sql = "select question_id, question_title, question_input, q.app_user_id, category_id, a.username " +
                "from question q join app_user a on q.app_user_id = a.app_user_id " +
                "where question_id = ?;";

        return jdbcTemplate.queryForObject(sql, mapper, questionId);
    }

    @Override
    public List<Question> findQuestionByUserId(int userId) {
        final String sql = "select question_id, question_title, question_input, q.app_user_id, category_id, a.username " +
                "from question q join app_user a on q.app_user_id = a.app_user_id " +
                "where q.app_user_id=?;";

        return jdbcTemplate.query(sql, mapper, userId);

    }


    @Override
    public Question create(Question question) {
        final String sql = "insert into question (question_title, question_input, app_user_id, category_id) " +
                "values (?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, question.getQuestionTitle());
            statement.setString(2, question.getQuestionInput());
            statement.setInt(3, question.getUserId());
            statement.setInt(4, question.getCategoryId());
            return statement;
        }, keyHolder);

        if (rowsAffected == 0) {
            return null;
        }

        question.setQuestionId(keyHolder.getKey().intValue());

        return question;
    }

    @Override
    public boolean update(Question question) {
        final String sql = "update question set question_title = ?, " +
                "question_input = ?, " +
                "app_user_id = ?, " +
                "category_id = ? " +
                "where question_id = ?;";

        int rowsUpdated = jdbcTemplate.update(sql,
                question.getQuestionTitle(),
                question.getQuestionInput(),
                question.getUserId(),
                question.getCategoryId(),
                question.getQuestionId());

        return rowsUpdated > 0;
    }

    @Override
    public boolean delete(int questionId) {
        final String sql = "delete from question where question_id = ?;";
        return jdbcTemplate.update(sql, questionId) > 0;
    }



    public List<Category> findAllCategories() {
        final String sql = "select * from category";

        return jdbcTemplate.query(sql, categoryMapper);
    }


}