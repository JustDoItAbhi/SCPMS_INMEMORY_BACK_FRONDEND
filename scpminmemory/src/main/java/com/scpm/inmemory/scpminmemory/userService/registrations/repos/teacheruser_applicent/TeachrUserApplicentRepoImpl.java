package com.scpm.inmemory.scpminmemory.userService.registrations.repos.teacheruser_applicent;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.model_teachers.ApplicentTeacher;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.model_teachers.Teachers;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.TeachrUser;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class TeachrUserApplicentRepoImpl implements TeachrUserApplicentRepo{
    Map<Long, ApplicentTeacher > teachersApplicent=new ConcurrentHashMap<>();

    @Override
    public void save(ApplicentTeacher teachers) {
        teachersApplicent.put(teachers.getId(),teachers);
    }

    @Override
    public List<ApplicentTeacher > findAll() {
        return new ArrayList<>(teachersApplicent.values());
    }

    @Override
    public void deleteById(long id) {
        ApplicentTeacher  teachers=teachersApplicent.get(id);
        if(teachers!=null){
           teachersApplicent.remove(teachers);
        }
    }
}
