package com.scpm.inmemory.scpminmemory.userService.students.stDto;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.modals_student.enums.TOPIC_STATUS;
import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
public class TopicResponeDto {
    private long teacherId;
    private SelectSubjectAndStudentDetailsResponseDto selectSubjectAndStudentDetailsResponseDto;
    private String topic;
    private TOPIC_STATUS aprovels;
}
