package com.scpm.inmemory.scpminmemory.userService.registrations.repos.student_subject_repo;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.modals_student.StudentAndSubject;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.modals_student.Students;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.Users;
import com.scpm.inmemory.scpminmemory.userService.registrations.repos.UserRepository;
import com.scpm.inmemory.scpminmemory.userService.registrations.repos.studentRepo.StudentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Repository
public class StudentSubjectRepoImpl implements StudentSubjectRepo {

    private final Map<Long, StudentAndSubject> sasMap = new ConcurrentHashMap<>();

    @Autowired
    private StudentsRepository studentsRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public void save(StudentAndSubject studentAndSubject) {
        if (studentAndSubject == null) {
            throw new IllegalArgumentException("StudentAndSubject object cannot be null");
        }

        sasMap.put(studentAndSubject.getId(), studentAndSubject);
    }

    @Override
    public Optional<StudentAndSubject> findById(long id) {
        StudentAndSubject studentAndSubject=sasMap.get(id);
        if(studentAndSubject!=null){
            System.out.println("HERE IS YOUR SUBJECT IN REPO IMPL");
            return Optional.of(studentAndSubject);
        }
        return Optional.empty();
    }

    @Override
    public List<StudentAndSubject> findAll() {
        return new ArrayList<>(sasMap.values());
    }

    @Override
    public void deleteById(long id) {
        sasMap.remove(id);
    }

    @Override
    public Optional<StudentAndSubject> findByUserId(long userId) {
        Users users=userRepository.findById(userId);
       Optional<Students>students=studentsRepository.findByUserId(users.getId());
       for(StudentAndSubject studentAndSubject:sasMap.values()){
           if(studentAndSubject.getStudents().getUser().getId()==students.get().getUser().getId()){
              return Optional.of(studentAndSubject);
           }
       }
       return Optional.empty();

    }

    @Override
    public void deleteByUserId(long userId) {
        sasMap.entrySet().removeIf(entry -> {
            StudentAndSubject sas = entry.getValue();
            Students student = sas.getStudents();
            if (student != null) {
                Users user = student.getUser();
                return user != null && user.getId() == userId;
            }
            return false;
        });
    }

    // Helper method to find all records for a specific user (if there could be multiple)
    public List<StudentAndSubject> findAllByUserId(long userId) {
        return sasMap.values().stream()
                .filter(sas -> {
                    Students student = sas.getStudents();
                    if (student != null) {
                        Users user = student.getUser();
                        return user != null && user.getId() == userId;
                    }
                    return false;
                })
                .collect(Collectors.toList());
    }

    // Helper method to find by student ID directly
    public Optional<StudentAndSubject> findByStudentId(long studentId) {
        return sasMap.values().stream()
                .filter(sas -> {
                    Students student = sas.getStudents();
                    return student != null && student.getId() == studentId;
                })
                .findFirst();
    }

    // Helper method to clear all data (useful for testing)
    public void clearAll() {
        sasMap.clear();

    }

    // Helper method to get current size
    public int size() {
        return sasMap.size();
    }
}