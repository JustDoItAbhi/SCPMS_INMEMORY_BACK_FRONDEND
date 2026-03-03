package com.scpm.inmemory.scpminmemory.userService.students.stDto;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.modals_student.StudentAndSubject;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class SelectSubjectAndStudentDetailsResponseDto {
    private long studentAndSubjectId;
//    private StudentsResponseDto studentsResponseDto;
    private StudentAndSubject subject;
    private String subjectYear;
}
