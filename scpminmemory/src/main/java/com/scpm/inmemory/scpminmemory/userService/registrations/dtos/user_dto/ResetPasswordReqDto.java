package com.scpm.inmemory.scpminmemory.userService.registrations.dtos.user_dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordReqDto {
    private String email;
    private String otp;
    private String password;
}
