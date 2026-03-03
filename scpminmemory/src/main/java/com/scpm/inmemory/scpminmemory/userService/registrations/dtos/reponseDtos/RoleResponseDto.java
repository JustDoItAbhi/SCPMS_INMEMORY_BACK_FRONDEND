package com.scpm.inmemory.scpminmemory.userService.registrations.dtos.reponseDtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class RoleResponseDto {
    private long id;
    private String roles;
    private LocalDateTime createdAt;
}
