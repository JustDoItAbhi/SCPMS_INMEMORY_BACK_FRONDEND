package com.scpm.inmemory.scpminmemory.userService.registrations.dtos.reponseDtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class OtpResponseDto {
    private String email;
    private String otp;
    private LocalDateTime expiryTime;
}
