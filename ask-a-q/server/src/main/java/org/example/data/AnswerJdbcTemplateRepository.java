package org.example.data;

import org.example.models.Answer;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class AnswerJdbcTemplateRepository implements AnswerRepository{

    private final JdbcTemplate jdbcTemplate;


    public AnswerJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    private final RowMapper<Answer> mapper = (resultSet, rowIndex) -> {
        Answer answer = new Answer();

        answer.setAnswerId(resultSet.getInt("answer_id"));
        answer.setAnswerInput(resultSet.getString("answer_input"));
        answer.setUserId(resultSet.getInt("app_user_id"));
        answer.setQuestionId(resultSet.getInt("question_id"));
        answer.setUsername(resultSet.getString("username"));

        return answer;
    };

    @Override
    public List<Answer> findAll() {
        final String sql = "select answer_id, answer_input, a.app_user_id, question_id, au.username " +
                "from answer a join app_user au on au.app_user_id = a.app_user_id " +
                "order by answer_id;";

        return jdbcTemplate.query(sql, mapper);
    }

    @Override
    public List<Answer> findByQuestion(int questionId) throws DataAccessException {
        final String sql = "select answer_id, answer_input, a.app_user_id, question_id, au.username " +
                "from answer a join app_user au on au.app_user_id = a.app_user_id " +
                "where question_id = ?;";

        return jdbcTemplate.query(sql, mapper, questionId);
    }

    @Override
    public Answer findByAnswerId(int answerId) {
        final String sql = "select answer_id, answer_input, a.app_user_id, question_id, au.username " +
                "from answer a join app_user au on au.app_user_id = a.app_user_id " +
                "where answer_id = ?";

        return jdbcTemplate.queryForObject(sql, mapper, answerId);
    }


    @Override
    public Answer findByUsername(String username) {
        String sql = "select answer_id, answer_input, a.app_user_id, question_id, au.username " +
                "from answer a join app_user au on au.app_user_id = a.app_user_id  " +
                "where au.username = ?";

        return jdbcTemplate.queryForObject(sql, mapper, username);
    }

    @Override
    public Answer create(Answer answer) {
        final String sql = "insert into answer (answer_input, app_user_id, question_id) " +
                "values (?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, answer.getAnswerInput());
            statement.setInt(2, answer.getUserId());
            statement.setInt(3, answer.getQuestionId());
            return statement;
        }, keyHolder);

        if (rowsAffected == 0) {
            return null;
        }

        answer.setAnswerId(keyHolder.getKey().intValue());

        return answer;
    }

}

