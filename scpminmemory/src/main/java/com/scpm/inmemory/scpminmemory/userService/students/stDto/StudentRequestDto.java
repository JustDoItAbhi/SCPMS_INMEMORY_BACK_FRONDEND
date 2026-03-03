package com.scpm.inmemory.scpminmemory.userService.students.stDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentRequestDto {
    private String currentYear;
    private String groupNumber;
    private String subGroupNumber;
    private String monitorName;
    private String studentIdCardNumber;
    private String passportNumber;
}
