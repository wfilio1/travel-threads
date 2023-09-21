package org.example.controller;

import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {



    // https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/dao/DataIntegrityViolationException.html
    // Since this is a child of DataAccessException I put it above DAE so that if it specifically occurs we know so that
    // it doesn't get swept up under DAE happening first.
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Object> handleException (DataIntegrityViolationException ex) {
        // Log the exception
        ex.printStackTrace();
        return new ResponseEntity<>(("Data Integrity Error, we do apologize please try again later."),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // DataAccessException is the super class of many Spring database exceptions
    // including BadSqlGrammarException.
    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<Object> handleException (DataAccessException ex) {
        // Log the exception
        ex.printStackTrace();
        return new ResponseEntity<>(("Data Integrity Error, we do apologize please try again later."),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }


    // IllegalArgumentException is the super class for many Java exceptions
    // including all formatting (number, date) exceptions.
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleException (IllegalArgumentException ex) {
        ex.printStackTrace();
        return new ResponseEntity<>(("IlegalArgumentException. We can't show you the details but something went wrong on our end sorry."),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Non-500 error specific to HttpMessages
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Object> handleException (HttpMessageNotReadableException ex) {
        ex.printStackTrace();
        return new ResponseEntity<>(("HttpMessageNotReadable We can't show you the details but something went wrong on our end sorry."),
                HttpStatus.BAD_REQUEST);
    }

    // Final 'nasty' catch all according to the book.
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleException (Exception ex) {
        ex.printStackTrace();
        return new ResponseEntity<>(("CatchAllException. We can't show you the details but something went wrong on our end sorry."),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
