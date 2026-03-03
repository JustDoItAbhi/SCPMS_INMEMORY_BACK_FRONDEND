package com.scpm.inmemory.scpminmemory.userService.teachers.controller;

import com.scpm.inmemory.scpminmemory.userService.teachers.service.TeacherService;
import com.scpm.inmemory.scpminmemory.userService.teachers.teachersDtos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/teachers")
public class TeacherController {
    @Autowired
    private TeacherService teacherService;
    //signup teacher
    @PostMapping("/finishSignUP/{userId}/{subject}")
    public ResponseEntity<TeacherResponseDto> completeSignup(@PathVariable ("userId")long userId, @PathVariable ("subject")String subject){
        return ResponseEntity.ok(teacherService.completeSignup(userId,subject));
    }
    //find list of teachers with subject name
    @GetMapping("/subject/{subject}")
    public ResponseEntity<List<TeacherForStudentsResponseDto>> findBySubject(@PathVariable ("subject")String subect){
        return ResponseEntity.ok(teacherService.listOfTeachersBySubject(subect));
    }
    // delete teacher by id
    @DeleteMapping("/deleteTeacher/{id}")
    public ResponseEntity<Boolean> deleteTeacher(@PathVariable ("id")long id){
        return ResponseEntity.ok(teacherService.deteteTeacher(id));
    }
    //getAllThe topics which assigned to a teacher
    @GetMapping("/allTopicsByTeacherId/{teacherId}")
    public ResponseEntity<List<TopicForTeacherResponseDto>> findAllTopicByTeacherId(@PathVariable ("teacherId")long teacherId){
        return ResponseEntity.ok(teacherService.getAllTheTopicRequestByTeacherId(teacherId));
    }
    // update teacher data
    @PutMapping("/UupdateTeacher/{teacherId}/{userId}")
    public ResponseEntity<UpdateTeacherResponeDto>updateTeacher(@PathVariable ("teacherId")long teacherId,
                                                                @PathVariable ("userId")long userId,
                                                                @RequestBody TeacherRequestDto dto){
        return ResponseEntity.ok(teacherService.updateTeacher(teacherId,userId,dto));
    }
    // get all the teachers
    @GetMapping("/getAllTeachers")
    public ResponseEntity<List<ListOfTechersResponseDto>> getAlTeACHERS(){
        return ResponseEntity.ok(teacherService.getListOfTeacher());
    }
    @GetMapping("getTeacherById/{teacherId}")
    public ResponseEntity<TeacherResponseDto>getTeacherByID(@PathVariable ("teacherId")long teacherId){
        return ResponseEntity.ok(teacherService.getTeacherById(teacherId));
    }
    @GetMapping("/getTeacherByUserEmail/{userEmail}")
    public ResponseEntity<Long>getTeacherByID(@PathVariable ("userEmail")String userEmail ){
        return ResponseEntity.ok(teacherService.getTeacherByUserEmail(userEmail));
    }
    @PostMapping("/setTeacherTopicStataus")
    public ResponseEntity<TeacherTopicResponseDto> saveTopicStatusToTeacher(@RequestBody TeacherTopicRequestDto dto){
        return ResponseEntity.ok(teacherService.saveTopicwhichIsApproved(dto));
    }
    @GetMapping("/getApproveal/{status}")
    public ResponseEntity<Long> listOfTopicStatusTo(@PathVariable ("status")String status){
        return ResponseEntity.ok(teacherService.getListOfTopicsApprovedByTeacher(status));
    }
    @DeleteMapping("/deleteTopicByTeacherId/{topicId}")
    public ResponseEntity<String> deteleTopicByTeacher(@PathVariable ("topicId")long topicId){
        return ResponseEntity.ok(teacherService.deleteTopicByTeacher(topicId));
    }
    @GetMapping("/getAllTopicByTeacherTopicId/{teacherId}")
    public ResponseEntity<List<TeacherTopicResponseDto>>getAllTopicByTeacherTopicID(@PathVariable ("teacherId")long teacherId ){
        return ResponseEntity.ok(teacherService.getAllTopicByTeacherId(teacherId));
    }




    // IT WILL DELETE ALL TOPICS SO NOT A GOOD ADVISE
//    @DeleteMapping("/deleteaLLTopics")
//    public ResponseEntity<String> deteleAllTopic(){
//        return ResponseEntity.ok(teacherService.deleteAllTeacherTopics());
//    }



}
