package com.scpm.inmemory.scpminmemory.userService.registrations.entities.model_teachers;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.BaseModels;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicentTeacher extends BaseModels {
    private String email;
    private String applicentRole;
}
