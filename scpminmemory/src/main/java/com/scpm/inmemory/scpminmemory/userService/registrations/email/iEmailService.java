package com.scpm.inmemory.scpminmemory.userService.registrations.email;

public interface iEmailService {
    String sendOtp(String toEmail, String otp, String subject);
}
