package com.scpm.inmemory.scpminmemory.userService.registrations.dtos.user_dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class UpdateUserDto {
    private String name;
    private String email;
    private String password;
    private String address;
    private List<String> rolesList;
}
