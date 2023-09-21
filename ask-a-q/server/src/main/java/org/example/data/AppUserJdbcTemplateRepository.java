package org.example.data;

import org.example.data.mapper.AppUserMapper;
import org.example.models.AppUser;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Objects;

@Repository
public class AppUserJdbcTemplateRepository implements AppUserRepository {

    private final JdbcTemplate jdbcTemplate;


    public AppUserJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public AppUser findByUserName(String userName) {
        List<String> roles = getRolesByUsername(userName);

        String sql = "select app_user_id, username, password_hash, enabled " +
                "from app_user " +
                "where username = ?";

        return jdbcTemplate.query(sql, new AppUserMapper(roles), userName).stream().findFirst().orElse(null);
    }

    @Override
    public AppUser create(AppUser appUser) {
        final String sql = "insert into app_user (username, password_hash, enabled) " +
                "values (?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, appUser.getUsername());
            statement.setString(2, appUser.getPassword());
            statement.setBoolean(3, appUser.isEnabled());
            return statement;
        }, keyHolder);

        if (rowsAffected == 0) {
            return null;
        }

        appUser.setAppUserId(keyHolder.getKey().intValue());

        return appUser;
    }

    private List<String> getRolesByUsername(String username) {
        final String sql = "select r.name "
                + "from app_user_role ur "
                + "inner join app_role r on ur.app_role_id = r.app_role_id "
                + "inner join app_user au on ur.app_user_id = au.app_user_id "
                + "where au.username = ?";
        return jdbcTemplate.query(sql, (rs, rowId) -> rs.getString("name"), username);
    }

}