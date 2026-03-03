package com.scpm.inmemory.scpminmemory.userService.teachers.teachersDtos;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.Users;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UpdateTeacherResponeDto {
    private long teacherId;
    private String teacherName;
    private String subject;
    private Users users;
    private String teacherEmail;
    private String teacherYear;
}
