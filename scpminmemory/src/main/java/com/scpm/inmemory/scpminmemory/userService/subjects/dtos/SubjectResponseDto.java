package com.scpm.inmemory.scpminmemory.userService.subjects.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SubjectResponseDto {

    private String courseYear;
    private List<String>  subjectsList;
}
