package com.scpm.inmemory.scpminmemory.userService.registrations.repos;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.modals_student.enums.TOPIC_STATUS;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.model_teachers.TeacherAndTopics;

import java.util.List;
import java.util.Optional;


public interface TeacherAndTopicsRepository {
    void save(TeacherAndTopics teacherAndTopics);
    Optional<TeacherAndTopics> findById(long id);
    List<TeacherAndTopics> findByTopicStatus(TOPIC_STATUS status);
    Optional<TeacherAndTopics>findByTopicId(long topicId);
    List<TeacherAndTopics>findByTeacherId(long teacherId);
    void deleteById(long teachrId);
}
