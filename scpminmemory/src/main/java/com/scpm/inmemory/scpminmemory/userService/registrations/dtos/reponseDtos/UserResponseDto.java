package com.scpm.inmemory.scpminmemory.userService.registrations.dtos.reponseDtos;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserResponseDto {
    private long id;
    private String name;
    private String email;
    private String password;
    private String address;
    private List<RoleResponseDto> rolesList;
}
