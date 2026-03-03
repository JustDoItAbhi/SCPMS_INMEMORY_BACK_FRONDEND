package com.scpm.inmemory.scpminmemory.userService.registrations.dtos.student;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentOtpRequest {
    private String email;
    private String roles;
}
