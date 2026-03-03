package com.scpm.inmemory.scpminmemory.userService.teachers.teachersDtos;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.modals_student.enums.TOPIC_STATUS;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class TeacherTopicResponseDto {
        private long teacherTopicId;
        private TOPIC_STATUS topicStatus;
        private long topicId;
        private long studentSubjectId;
        private long teacherId;
        private String topic;
    }

