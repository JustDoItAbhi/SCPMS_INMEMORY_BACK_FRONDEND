package com.scpm.inmemory.scpminmemory.userService.registrations.services;



import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.reponseDtos.LoginResponseDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.reponseDtos.OtpResponseDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.reponseDtos.UserResponseDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.teacherDto.TeacherUserRequestDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.teacherDto.TeacherUserResponseDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.user_dto.SignUpRequestDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.user_dto.UpdateUserDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.model_teachers.ApplicentTeacher;
import com.scpm.inmemory.scpminmemory.userService.teachers.teachersDtos.TeacherResponseDto;

import java.util.List;

public interface UserService {
    UserResponseDto createUser(SignUpRequestDto dto);

    LoginResponseDto login(String email, String password);

    List<UserResponseDto> getAllUsers();

    UserResponseDto getUserById(long id);

    boolean deleteUserById(long id);

    UserResponseDto updateUser(long id, UpdateUserDto dto);

    OtpResponseDto sendOtp(String email);

    UserResponseDto resetPassword(String email, String Otp, String password);

    String studentSignup(String email, String role);

    String confirmStudentOtp(String email, String otp);

    TeacherUserResponseDto approveTeacherSignUp(TeacherUserRequestDto dto);
    List<TeacherResponseDto> getAllApplicaentTeachers(String applicant_teacher_role);
    List<ApplicentTeacher>getApplicents();
    String createAdmin(SignUpRequestDto dto);

}
