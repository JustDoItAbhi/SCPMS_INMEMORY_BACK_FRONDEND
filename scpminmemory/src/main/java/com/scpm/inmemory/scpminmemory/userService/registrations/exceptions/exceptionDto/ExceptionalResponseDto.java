package com.scpm.inmemory.scpminmemory.userService.registrations.exceptions.exceptionDto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ExceptionalResponseDto {
private String message;
private int code;
private LocalDateTime time;

    public ExceptionalResponseDto(String message, int code, LocalDateTime time) {
        this.message = message;
        this.code = code;
        this.time = time;
    }
}
