package com.scpm.inmemory.scpminmemory.userService.registrations.repos.subject_repo;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.Subjects;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SubjectRepositoryImpl implements SubjectRepository{
    Map<Long, Subjects> subjectMap=new ConcurrentHashMap<>();


    @Override
    public void save(Subjects subjects) {
        if (subjects == null) {
            throw new IllegalArgumentException("Subjects cannot be null");
        }

        // ID should be generated in BaseModels constructor
        subjectMap.put(subjects.getId(), subjects);
        System.out.println("💾 Saved subject: " + subjects.getSubject() + " with ID: " + subjects.getCourseYear());
    }
    @Override
    public Optional<Subjects> findBySubject(String subject) {
       for(Subjects subjects:subjectMap.values()){
           if(subjects.getSubject().equals(subject))
           return Optional.of(subjects);
       }
       return Optional.empty();
    }

    @Override
    public List<Subjects> findByCourseYear(String year) {
        List<Subjects>subjectsList=new ArrayList<>();
        for(Subjects subjects:subjectMap.values()){
            if(subjects.getCourseYear().equals(year)){
                System.out.println("SUBJECT FOUND BY YEAR "+ subjects.getCourseYear());
                subjectsList.add(subjects);
            }
        }
        return subjectsList;
    }



    @Override
    public List<Subjects> findAll() {
        return new ArrayList<>(subjectMap.values());
    }

    @Override
    public Optional<Subjects> findById(long id) {
        Subjects subjects=subjectMap.get(id);
        return Optional.ofNullable(subjects);
    }
}
