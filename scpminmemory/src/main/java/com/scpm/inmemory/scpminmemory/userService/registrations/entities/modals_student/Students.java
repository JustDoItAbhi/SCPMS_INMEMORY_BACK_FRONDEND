package com.scpm.inmemory.scpminmemory.userService.registrations.entities.modals_student;


import com.scpm.inmemory.scpminmemory.userService.registrations.entities.BaseModels;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.Users;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Students extends BaseModels {
    private Users user;
    private String currentYear;
    private String groupNumber;
    private String subGroupNumber;
    private String monitorName;
    private String studentIdCardNumber;
    private String passportNumber;

}
