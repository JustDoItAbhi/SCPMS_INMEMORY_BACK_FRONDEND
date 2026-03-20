package com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.BaseModels;
import lombok.Getter;
import lombok.Setter;


import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class Users extends BaseModels {
    private String name;
    private String email;
    private String password;
    private String address;

    private List<Roles>rolesList;
    private String otp;
    private LocalDateTime otpExpiry;



//    private Students studentProfile;
}
