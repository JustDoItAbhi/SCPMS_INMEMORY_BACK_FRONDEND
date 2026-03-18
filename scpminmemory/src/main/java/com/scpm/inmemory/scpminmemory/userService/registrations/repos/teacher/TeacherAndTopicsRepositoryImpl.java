package com.scpm.inmemory.scpminmemory.userService.registrations.repos.teacher;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.modals_student.enums.TOPIC_STATUS;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.model_teachers.TeacherAndTopics;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TeacherAndTopicsRepositoryImpl implements TeacherAndTopicsRepository{
    Map<Long,TeacherAndTopics> teacherAndTopicsHashMap=new ConcurrentHashMap<>();


    @Override
    public void save(TeacherAndTopics teacherAndTopics) {
        teacherAndTopicsHashMap.put(teacherAndTopics.getId(),teacherAndTopics);
    }

    @Override
    public Optional<TeacherAndTopics> findById(long id) {
        TeacherAndTopics topics=teacherAndTopicsHashMap.get(id);
        return Optional.ofNullable(topics);
    }

    @Override
    public List<TeacherAndTopics> findByTopicStatus(TOPIC_STATUS status) {
        List<TeacherAndTopics>topics=new ArrayList<>();
        for(TeacherAndTopics teacherAndTopics:teacherAndTopicsHashMap.values()){
            if(teacherAndTopics.getTopicStatus().equals(status)){
                topics.add(teacherAndTopics);
            }
        }
        return topics;
    }

    @Override
    public Optional<TeacherAndTopics> findByTopicId(long topicId) {
        for(TeacherAndTopics teacherAndTopics:teacherAndTopicsHashMap.values()){
            if(teacherAndTopics.getTopicId()==topicId){
                return Optional.of(teacherAndTopics);
            }
        }
        return Optional.empty();
    }

    @Override
    public List<TeacherAndTopics> findByTeacherId(long teacherId) {
        List<TeacherAndTopics>topics=new ArrayList<>();
        for(TeacherAndTopics teacherAndTopics:teacherAndTopicsHashMap.values()){
            if(teacherAndTopics.getTeacherId()==teacherId){
                topics.add(teacherAndTopics);
            }
        }
        return topics;
    }


    @Override
    public void deleteById(long teachrId) {
        for(TeacherAndTopics teacherAndTopics:teacherAndTopicsHashMap.values()){
            if(teacherAndTopics.getTeacherId()==teachrId){
             teacherAndTopicsHashMap.remove(teacherAndTopics);
            }
        }
    }
    //    @Override
//    public void deleteAllByTeacherId(long teacherId) {
//        List<TeacherAndTopics>topics=new ArrayList<>();
//        for(TeacherAndTopics teacherAndTopics:teacherAndTopicsHashMap.values()){
//            if(teacherAndTopics.getTeacherId()==teacherId){
//                topics.remove(teacherAndTopics);
//            }
//        }
//    }
}
