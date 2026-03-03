package com.scpm.inmemory.scpminmemory.userService.teachers.teachersDtos;

import com.scpm.inmemory.scpminmemory.userService.students.stDto.SelectSubjectAndStudentDetailsResponseDto;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class TopicForTeacherResponseDto {
    private long topicId;
    private long teacherId;
    private SelectSubjectAndStudentDetailsResponseDto responseDto;
    private String topic;
}
