package com.scpm.inmemory.scpminmemory.userService.registrations.entities.modals_student;


import com.scpm.inmemory.scpminmemory.userService.registrations.entities.BaseModels;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.modals_student.enums.TOPIC_STATUS;
import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
public class StudentTopic extends BaseModels {
    private long teacherId;
    private StudentAndSubject studentAndSubject;
    private String topic;
    private TOPIC_STATUS teacherAprovels;
}
