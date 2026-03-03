package com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals;


import com.scpm.inmemory.scpminmemory.userService.registrations.entities.BaseModels;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class TeachrUser extends BaseModels {
private String teacherEmail;
private String role;
}
