package com.scpm.inmemory.scpminmemory.userService.students.mapper;


import com.scpm.inmemory.scpminmemory.userService.registrations.entities.modals_student.StudentAndSubject;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.modals_student.StudentTopic;
import com.scpm.inmemory.scpminmemory.userService.students.stDto.SelectSubjectAndStudentDetailsResponseDto;
import com.scpm.inmemory.scpminmemory.userService.students.stDto.TopicResponeDto;

public class SubjectAndStudentMapper {
    public static TopicResponeDto fromTopicEntity(StudentTopic topic){
        TopicResponeDto dto=new TopicResponeDto();
        dto.setAprovels(topic.getTeacherAprovels());
        dto.setSelectSubjectAndStudentDetailsResponseDto(selectingFromEntityselectYourSubject(topic.getStudentAndSubject()));
        dto.setTeacherId(topic.getTeacherId());
        dto.setTopic(topic.getTopic());
        return dto;
    }

    public static SelectSubjectAndStudentDetailsResponseDto selectingFromEntityselectYourSubject(StudentAndSubject studentAndSubject){
        SelectSubjectAndStudentDetailsResponseDto dto=new SelectSubjectAndStudentDetailsResponseDto();
        dto.setStudentAndSubjectId(studentAndSubject.getId());
        dto.setSubjectYear(studentAndSubject.getSubjectYear());
        dto.setSubject(studentAndSubject);
        return dto;
    }

}
