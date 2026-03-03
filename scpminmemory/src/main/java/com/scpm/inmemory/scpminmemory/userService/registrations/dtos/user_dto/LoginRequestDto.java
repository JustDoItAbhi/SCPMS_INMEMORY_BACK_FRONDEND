package com.scpm.inmemory.scpminmemory.userService.registrations.dtos.user_dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestDto {
    private String  userEmail;
    private String password;
}
