package com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals;


import com.scpm.inmemory.scpminmemory.userService.registrations.entities.BaseModels;
import lombok.Getter;
import lombok.Setter;


import java.time.LocalDateTime;

@Getter
@Setter
public class StudentOtp extends BaseModels {
    private String email;
    private String otp;
    private LocalDateTime expiryTime;
}
