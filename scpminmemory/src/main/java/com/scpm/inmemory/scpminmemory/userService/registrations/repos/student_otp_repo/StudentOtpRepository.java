package com.scpm.inmemory.scpminmemory.userService.registrations.repos.student_otp_repo;



import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.StudentOtp;

import java.util.Optional;


public interface StudentOtpRepository {

    Optional<StudentOtp> findByOtp(String otp);
    Optional<StudentOtp>findByEmail(String email);
    void save(StudentOtp studentOtp);
}
