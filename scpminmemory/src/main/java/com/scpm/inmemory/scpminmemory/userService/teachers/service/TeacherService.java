package com.scpm.inmemory.scpminmemory.userService.teachers.service;


import com.scpm.inmemory.scpminmemory.userService.teachers.teachersDtos.*;

import java.util.List;

public interface TeacherService {
    TeacherResponseDto completeSignup(long id, String subject);
    List<TeacherForStudentsResponseDto> listOfTeachersBySubject(String subject);
    boolean deteteTeacher(long id);
    List<TopicForTeacherResponseDto> getAllTheTopicRequestByTeacherId(long teacherId);
    UpdateTeacherResponeDto updateTeacher(long id, long userId, TeacherRequestDto dto);
    List<ListOfTechersResponseDto> getListOfTeacher();
    TeacherResponseDto getTeacherById(long id);
    long getTeacherByUserEmail(String userEmail);
    TeacherTopicResponseDto saveTopicwhichIsApproved(TeacherTopicRequestDto dto);
    long getListOfTopicsApprovedByTeacher(String approved);
    String deleteTopicByTeacher(long topicId);
    TeacherTopicResponseDto getTeacherTopicByTopicId(long teacherTopicid);
    List<TeacherTopicResponseDto> getAllTopicByTeacherId(long teacherId);

}
// student SENT REQUEST WITH STATUS WAITING IF TEACHER APROVE THE REQUEST
// THEN IT SHOULD SAVE STUDENT TOPIC AS APROVED AND TEACHER SHOULD BE ABLE TO CHECK ALL APPROVED TOICS
//TEACHER WILL RETURN ONLY APPROVED OR REJECTED  WITH TOPIC ID AND STUDENTSUBJECT ID, OR WITH STUDENT EMAIL

//1st find topic by topic id


