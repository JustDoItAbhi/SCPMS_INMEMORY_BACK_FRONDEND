package com.scpm.inmemory.scpminmemory.userService.students.stDto;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.Users;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class StudentsResponseDto {
    private Users users;
    private long studentId;
    private String currentYear;
    private String groupNumber;
    private String subGroupNumber;
    private String monitorName;
    private String studentIdCardNumber;
    private String passportNumber;
}
