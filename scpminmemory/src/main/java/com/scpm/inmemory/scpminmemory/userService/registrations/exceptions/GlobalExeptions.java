package com.scpm.inmemory.scpminmemory.userService.registrations.exceptions;

import com.scpm.inmemory.scpminmemory.userService.registrations.exceptions.exceptionDto.ExceptionalResponseDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.exceptions.exceptionDto.RoleNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;


import java.time.Instant;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExeptions {
    @ExceptionHandler(UserExceptions.class)
    public ResponseEntity<ExceptionalResponseDto> userNotFound(UserExceptions e){
        LocalDateTime time=LocalDateTime.now();
        ExceptionalResponseDto dto=new ExceptionalResponseDto(
                e.getMessage(),
                404,
                time
        );
        return new ResponseEntity<>(dto, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNoResourceFound(NoResourceFoundException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", Instant.now());
        body.put("status", HttpStatus.NOT_FOUND.value());
        body.put("error", "Not Found");
        body.put("message", "Resource not found: " + ex.getResourcePath());
        body.put("path", ex.getResourcePath());

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(Exception ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", Instant.now());
        body.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        body.put("error", "Internal Server Error");
        body.put("message", "An unexpected error occurred");

        return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(RoleNotFoundException.class)
    public ResponseEntity<ExceptionalResponseDto> roleNotFount(RoleNotFoundException e){
        LocalDateTime time=LocalDateTime.now();
        ExceptionalResponseDto dto=new ExceptionalResponseDto(
                e.getMessage(),
                404,
                time
        );
        return new ResponseEntity<>(dto, HttpStatus.NOT_FOUND);
    }
}
