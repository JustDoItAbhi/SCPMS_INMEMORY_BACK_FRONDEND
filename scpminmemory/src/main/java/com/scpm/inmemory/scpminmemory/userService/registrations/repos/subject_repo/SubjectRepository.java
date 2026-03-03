package com.scpm.inmemory.scpminmemory.userService.registrations.repos.subject_repo;


import com.scpm.inmemory.scpminmemory.userService.registrations.entities.Subjects;

import java.util.List;
import java.util.Optional;


public interface SubjectRepository {
Optional<Subjects> findBySubject(String subject);
List<Subjects> findByCourseYear(String year);
    void save(Subjects subjects);
    List<Subjects> findAll();
    Optional<Subjects> findById(long id);

}
