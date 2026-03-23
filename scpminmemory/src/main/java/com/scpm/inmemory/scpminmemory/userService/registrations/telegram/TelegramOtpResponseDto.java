package com.scpm.inmemory.scpminmemory.userService.registrations.telegram;


import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class TelegramOtpResponseDto {
    private String email;
    private String telegramUsername;
    private String otp;
    private LocalDateTime expiryTime;
    private boolean telegramSent;
    private boolean emailSent;
}
