package com.scpm.inmemory.scpminmemory.userService.teachers.teachersDtos;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.Users;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class TeacherResponseDto {
    private long teacherId;
    private String teacherName;
    private String teacherYear;
    private String subject;
    private String teacherEmail;
    private Users users;

}
