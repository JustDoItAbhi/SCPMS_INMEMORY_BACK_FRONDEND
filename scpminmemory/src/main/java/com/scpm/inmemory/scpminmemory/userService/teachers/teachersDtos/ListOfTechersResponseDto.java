package com.scpm.inmemory.scpminmemory.userService.teachers.teachersDtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ListOfTechersResponseDto {
    private long teacherId;
    private String teacherName;
    private String teacherYear;
    private String email;
    private String teacherSubject;

}
