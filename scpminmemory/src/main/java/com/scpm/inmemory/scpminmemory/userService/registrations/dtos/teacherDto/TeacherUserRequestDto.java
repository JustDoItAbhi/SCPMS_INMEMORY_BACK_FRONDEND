package com.scpm.inmemory.scpminmemory.userService.registrations.dtos.teacherDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherUserRequestDto {
    private String teacherEmail;
    private String role;
}
