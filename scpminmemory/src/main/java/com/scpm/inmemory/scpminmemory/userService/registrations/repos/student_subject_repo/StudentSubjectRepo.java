package com.scpm.inmemory.scpminmemory.userService.registrations.repos.student_subject_repo;


import com.scpm.inmemory.scpminmemory.userService.registrations.entities.modals_student.StudentAndSubject;

import java.util.List;
import java.util.Optional;


public interface StudentSubjectRepo  {

    void save(StudentAndSubject studentAndSubject);
    Optional<StudentAndSubject> findById(long id);
    List<StudentAndSubject> findAll();
    void deleteById(long id);

    Optional<StudentAndSubject> findByUserId( long userId);

    void deleteByUserId(long userId);
}
