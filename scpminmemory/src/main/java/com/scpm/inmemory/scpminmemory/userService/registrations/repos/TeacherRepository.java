package com.scpm.inmemory.scpminmemory.userService.registrations.repos;



import com.scpm.inmemory.scpminmemory.userService.registrations.entities.model_teachers.Teachers;

import java.util.List;
import java.util.Optional;


public interface TeacherRepository  {
  void save(Teachers teachers);
  Optional<Teachers> findById(long id);
  List<Teachers> findAll();
  void deleteById(long id);
    List<Teachers> findBySubject(String subject);

    List<Teachers> findBySubjectIgnoreCaseAndTrim(String subject);

    List<Teachers> findBySubjectContainingIgnoreCaseAndTrim( String subject);

    Optional<Teachers>findByUserEmail(String userEmail);
    List<Teachers> findByApplicentRole(String role);
}
