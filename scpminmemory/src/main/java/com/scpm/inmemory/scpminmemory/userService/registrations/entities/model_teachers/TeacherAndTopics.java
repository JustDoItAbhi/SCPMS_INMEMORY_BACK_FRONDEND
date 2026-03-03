package com.scpm.inmemory.scpminmemory.userService.registrations.entities.model_teachers;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.BaseModels;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.modals_student.enums.TOPIC_STATUS;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class TeacherAndTopics extends BaseModels {
    private TOPIC_STATUS topicStatus;
    private long topicId;
    private long studentSubjectId;
    private long teacherId;
    private String topic;
}
