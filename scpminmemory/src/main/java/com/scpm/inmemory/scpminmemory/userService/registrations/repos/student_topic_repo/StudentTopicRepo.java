package com.scpm.inmemory.scpminmemory.userService.registrations.repos.student_topic_repo;



import com.scpm.inmemory.scpminmemory.userService.registrations.entities.modals_student.StudentTopic;

import java.util.List;
import java.util.Optional;


public interface StudentTopicRepo  {
    void save(StudentTopic studentTopic);
    Optional<StudentTopic> findById(long id);
    List<StudentTopic>findAll();
    void deleteById(long id);
List<StudentTopic>findByTeacherId(long teacherId);

}
