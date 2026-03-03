package com.scpm.inmemory.scpminmemory.userService.teachers.teachersDtos;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherTopicRequestDto {
//    private long teacherTopicId;
    private String topicStatus;
    private long topicId;
    private long studentSubjectId;
    private long teacherId;
    private String topic;
}
