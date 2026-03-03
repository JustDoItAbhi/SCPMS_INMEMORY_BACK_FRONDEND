package com.scpm.inmemory.scpminmemory.userService.teachers.teachersDtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherForStudentsResponseDto {
    private String subject;
    private String teacherEmail;
    private long teacherId;
}
