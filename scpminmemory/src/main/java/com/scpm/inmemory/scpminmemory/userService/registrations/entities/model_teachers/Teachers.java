package com.scpm.inmemory.scpminmemory.userService.registrations.entities.model_teachers;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.BaseModels;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.Users;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class Teachers extends BaseModels {
    private Users users;
    private String teacherName;
    private String subject;
    private String teacherYear;
    private String userEmail;
}
