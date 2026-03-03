package com.scpm.inmemory.scpminmemory.userService.registrations.repos.student_otp_repo;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.StudentOtp;
import org.springframework.stereotype.Service;


import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class StudentOtpRepositoryImpl implements StudentOtpRepository{
    Map<Long, StudentOtp>otoMap=new ConcurrentHashMap<>();


    @Override
    public void save(StudentOtp studentOtp) {
        otoMap.put(studentOtp.getId(),studentOtp);
    }


    @Override
    public Optional<StudentOtp> findByOtp(String otp) {
        for (StudentOtp studentOtp:otoMap.values()){
            if(studentOtp.getOtp()==otp){
                return Optional.of(studentOtp);
            }
        }
        return Optional.empty();
    }

    @Override
    public Optional<StudentOtp> findByEmail(String email) {
        for (StudentOtp studentOtp:otoMap.values()){
            if(studentOtp.getEmail().equals(email)){
                return Optional.of(studentOtp);
            }
        }
        return Optional.empty();
    }
}
