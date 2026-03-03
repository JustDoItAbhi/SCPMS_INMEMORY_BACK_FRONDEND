package com.scpm.inmemory.scpminmemory.userService.registrations.repos.studentRepo;



import com.scpm.inmemory.scpminmemory.userService.registrations.entities.modals_student.Students;

import java.util.List;
import java.util.Optional;


public interface StudentsRepository  {
    void save(Students students);
    Optional<Students> findById(long id);
    List<Students>findAll();
    void deleteById(long id);
    Optional<Students> findByUserId(Long userId);
    void deleteByUserId( Long userId);
}
