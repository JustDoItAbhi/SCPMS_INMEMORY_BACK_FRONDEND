package com.scpm.inmemory.scpminmemory.userService.registrations.repos.teacheruser_applicent;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.model_teachers.ApplicentTeacher;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.TeachrUser;

import java.util.List;

public interface TeachrUserApplicentRepo {
    void save(ApplicentTeacher applicentTeacher);
    List<ApplicentTeacher > findAll();
    void deleteById(long id);
}
