package com.scpm.inmemory.scpminmemory.userService.registrations.entities.modals_student;


import com.scpm.inmemory.scpminmemory.userService.registrations.entities.BaseModels;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentAndSubject extends BaseModels {
    private Students students;
    private String Subject;
    private String subjectYear;
}
