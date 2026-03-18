package com.scpm.inmemory.scpminmemory.userService.registrations.repos.teacher;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.TeachrUser;

import java.util.List;
import java.util.Optional;


public interface TeacherUserRepository  {
    void save(TeachrUser teachrUser);
    Optional<TeachrUser> findById(long id);
    List<TeachrUser> findAll();
    void deleteById(long id);
    Optional<TeachrUser>findByTeacherEmail(String teacherEmail);
    Optional<TeachrUser>findByRole(String teacherRole);
}
