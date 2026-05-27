package com.library.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.library.exception.InvalidBookException;



@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(InvalidBookException.class)
	public ResponseEntity<String> handleInvalidBook(InvalidBookException e) {
		return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
	}
}
