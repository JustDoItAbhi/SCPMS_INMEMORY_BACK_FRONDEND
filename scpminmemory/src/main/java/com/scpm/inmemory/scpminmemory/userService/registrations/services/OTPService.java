package com.scpm.inmemory.scpminmemory.userService.registrations.services;

import java.security.SecureRandom;
import java.time.LocalDateTime;

public class OTPService {
    private static final int OTP_LENGTH = 6;
    private static final int OTP_VALIDITY_MINUTES = 5;

    public static class OTPDetails {
        private String otp;
        private LocalDateTime generatedTime;
        private LocalDateTime expiryTime;

        public OTPDetails(String otp, LocalDateTime generatedTime, LocalDateTime expiryTime) {
            this.otp = otp;
            this.generatedTime = generatedTime;
            this.expiryTime = expiryTime;
        }

        // Getters
        public String getOtp() { return otp; }
        public LocalDateTime getGeneratedTime() { return generatedTime; }
        public LocalDateTime getExpiryTime() { return expiryTime; }

        public boolean isValid() {
            return LocalDateTime.now().isBefore(expiryTime);
        }
    }

    public static OTPDetails generateOTP() {
        SecureRandom random = new SecureRandom();
        int otpNumber = random.nextInt((int) Math.pow(10, OTP_LENGTH));
        String otp = String.format("%0" + OTP_LENGTH + "d", otpNumber);

        LocalDateTime generatedTime = LocalDateTime.now();
        LocalDateTime expiryTime = generatedTime.plusMinutes(OTP_VALIDITY_MINUTES);

        return new OTPDetails(otp, generatedTime, expiryTime);
    }

    public static void main(String[] args) {
        OTPDetails otpDetails = generateOTP();

        System.out.println("OTP: " + otpDetails.getOtp());
        System.out.println("Generated: " + otpDetails.getGeneratedTime());
        System.out.println("Expires: " + otpDetails.getExpiryTime());
        System.out.println("Is valid: " + otpDetails.isValid());
    }
}
