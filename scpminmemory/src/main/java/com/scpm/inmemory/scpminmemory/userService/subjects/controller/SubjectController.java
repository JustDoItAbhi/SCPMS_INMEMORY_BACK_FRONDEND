package com.scpm.inmemory.scpminmemory.userService.subjects.controller;

import com.scpm.inmemory.scpminmemory.userService.subjects.dtos.SubjectRequestDto;
import com.scpm.inmemory.scpminmemory.userService.subjects.dtos.SubjectResponseDto;
import com.scpm.inmemory.scpminmemory.userService.subjects.servie.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/subject")
public class SubjectController {
@Autowired
    private SubjectService subjectService;
    @PostMapping("/addSubjects")
    public ResponseEntity<SubjectResponseDto> addsubjectToSubject(@RequestBody SubjectRequestDto dto){
        return ResponseEntity.ok(subjectService.addSubjectByYear(dto));
    }
    @GetMapping("/getByYear/{year}")
    public ResponseEntity<SubjectResponseDto>findBYyEAR(@PathVariable ("year")String year){
        return ResponseEntity.ok(subjectService.getSubhectByYear(year));
    }
    @PutMapping("/updateSubject/{subjectId}")
    public ResponseEntity<SubjectResponseDto>findBYyEAR(@PathVariable ("subjectId")long subjectId,@RequestBody SubjectRequestDto dto){
        return ResponseEntity.ok(subjectService.updateSubject(subjectId,dto));
    }
    @PostMapping("/upload")
    public ResponseEntity<List<SubjectResponseDto>> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        if(file!=null){
            System.out.println("FILE ENTER IN SYSTEM ");
        }
            return ResponseEntity.ok(subjectService.transferAllListOfStubjecsFromCsvFile(file));
    }


    @GetMapping("/")
    public ResponseEntity<List<SubjectResponseDto>> getAllSubjects()  {
        return ResponseEntity.ok(subjectService.getAllSubjects());
    }
    @PostMapping("/addSubjectsInMem")
    public ResponseEntity<SubjectResponseDto>addsubjectsinmemeory(@RequestBody SubjectRequestDto dto){
        return ResponseEntity.ok(subjectService.addSubjectByYear(dto));
    }
}
