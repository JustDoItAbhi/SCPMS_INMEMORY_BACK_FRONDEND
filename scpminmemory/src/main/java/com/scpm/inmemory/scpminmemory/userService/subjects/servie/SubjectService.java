package com.scpm.inmemory.scpminmemory.userService.subjects.servie;

import com.scpm.inmemory.scpminmemory.userService.subjects.dtos.SubjectRequestDto;
import com.scpm.inmemory.scpminmemory.userService.subjects.dtos.SubjectResponseDto;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;

public interface SubjectService {
    SubjectResponseDto addSubjectByYear(SubjectRequestDto dto);

    SubjectResponseDto getSubhectByYear(String Year);
    SubjectResponseDto updateSubject(long id, SubjectRequestDto dto);
    List<SubjectResponseDto> transferAllListOfStubjecsFromCsvFile(MultipartFile file) throws IOException;
    List<SubjectResponseDto> getAllSubjects() ;

}
