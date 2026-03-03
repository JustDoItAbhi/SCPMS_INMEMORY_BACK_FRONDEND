package com.scpm.inmemory.scpminmemory.userService.teachers.teachermappers;


import com.scpm.inmemory.scpminmemory.userService.registrations.entities.model_teachers.TeacherAndTopics;
import com.scpm.inmemory.scpminmemory.userService.teachers.teachersDtos.TeacherTopicResponseDto;

public class TeacherAndTopicMapper {
    public static TeacherTopicResponseDto fromTeacherTopicEntity(TeacherAndTopics teacherAndTopics){
        TeacherTopicResponseDto dto=new TeacherTopicResponseDto();
        dto.setTopicStatus(teacherAndTopics.getTopicStatus());
        dto.setTeacherTopicId(teacherAndTopics.getId());
        dto.setTeacherId(teacherAndTopics.getTeacherId());
        dto.setTopicId(teacherAndTopics.getTopicId());
        dto.setStudentSubjectId(teacherAndTopics.getStudentSubjectId());
        dto.setTopic(teacherAndTopics.getTopic());
        return dto;
    }
}
