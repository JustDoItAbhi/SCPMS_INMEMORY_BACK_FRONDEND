package com.scpm.inmemory.scpminmemory.userService.registrations.dtos.student;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentSingupReqDto {
    private String email;
    private String otp;
}
