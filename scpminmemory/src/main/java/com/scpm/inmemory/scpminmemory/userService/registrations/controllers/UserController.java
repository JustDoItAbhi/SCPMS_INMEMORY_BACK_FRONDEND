package com.scpm.inmemory.scpminmemory.userService.registrations.controllers;

import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.user_dto.LoginRequestDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.user_dto.ResetPasswordReqDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.user_dto.SignUpRequestDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.user_dto.UpdateUserDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.reponseDtos.LoginResponseDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.reponseDtos.OtpResponseDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.reponseDtos.UserResponseDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.student.StudentOtpRequest;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.student.StudentSingupReqDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.teacherDto.TeacherUserRequestDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.teacherDto.TeacherUserResponseDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.security.customization.CustomUsersDetails;
import com.scpm.inmemory.scpminmemory.userService.registrations.services.UserService;
import com.scpm.inmemory.scpminmemory.userService.teachers.teachersDtos.TeacherResponseDto;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {
    @Autowired
    private UserService userService;


    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUserDetails(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated() &&
                authentication.getPrincipal() instanceof CustomUsersDetails userDetails) {

            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("id", userDetails.getUserId());
            userInfo.put("username", userDetails.getUsername());
            userInfo.put("email", userDetails.getUserEmail());
            userInfo.put("authorities", userDetails.getAuthorities());
            userInfo.put("authenticated", true);

            return ResponseEntity.ok(userInfo);
        }
        return ResponseEntity.status(401).body("{\"authenticated\": false}");
    }

    @GetMapping("/")
    public String home() {
        return "OAuth2 Server is running!";
    }
    @GetMapping("/error")
    public String error() {
        return "Error page";
    }

    @PostMapping("/StudentSignUp")
    public ResponseEntity<String> sendOtpToStudentEmail(@RequestBody StudentOtpRequest request){
        return ResponseEntity.ok(userService.studentSignup(request.getEmail(), request.getRoles()));
    }
    @PostMapping("/ConfirmStudentSignUp/otp")
    public ResponseEntity<String> confirmstudentOtp(@RequestBody StudentSingupReqDto dto){
        System.out.println(dto.getEmail()+" AND "+dto.getOtp());
        return ResponseEntity.ok(userService.confirmStudentOtp(dto.getEmail(), dto.getOtp()));
    }

    @PostMapping("/createUser")
    public ResponseEntity<UserResponseDto> createUser(@RequestBody SignUpRequestDto dto){
        return ResponseEntity.ok(userService.createUser(dto));
    }
    @GetMapping("/allUsers")
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponseDto>> AllUser(){
        return ResponseEntity.ok(userService.getAllUsers());
    }
    @PostMapping("/Login")
    public ResponseEntity<LoginResponseDto> createUser(@RequestBody LoginRequestDto dto){
        return ResponseEntity.ok(userService.login(dto.getUserEmail(), dto.getPassword()));
    }
    @GetMapping("/getUserById/{id}")
    public ResponseEntity<UserResponseDto> getUser(@PathVariable ("id") long id){
        return ResponseEntity.ok(userService.getUserById(id));
    }
    @DeleteMapping("/DeleteUserById/{id}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable ("id") Long Id){
        return ResponseEntity.ok(userService.deleteUserById(Id));
    }
    @PutMapping("/updateUser/{id}")
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable ("id")long id, @RequestBody UpdateUserDto dto){
        return ResponseEntity.ok(userService.updateUser(id,dto));
    }

    @GetMapping("/sendOtp/{email}")
    public ResponseEntity<OtpResponseDto> sentOtp(@PathVariable ("email") String email){
           OtpResponseDto dto= userService.sendOtp(email);
           return ResponseEntity.ok(dto);
    }
    @PostMapping("/resetPassword")
    public ResponseEntity<UserResponseDto> resetPassword(@RequestBody ResetPasswordReqDto dto){
        return ResponseEntity.ok(userService.resetPassword(dto.getEmail(),dto.getOtp(),dto.getPassword()));
    }
    @GetMapping("/debug")
    public ResponseEntity<String> debugAdminRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() ||
                authentication instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User is not authenticated or is anonymous");
        }

        // Retrieve roles from authentication
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String roles = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(", "));

        String username = authentication.getName();
        String authType = authentication.getClass().getSimpleName();

        return ResponseEntity.ok(
                "User: " + username + "\n" +
                        "Authentication Type: " + authType + "\n" +
                        "User roles: " + roles
        );
    }
    @GetMapping("/session-info")
    public ResponseEntity<Map<String, Object>> getSessionInfo(HttpSession session) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Map<String, Object> sessionInfo = new HashMap<>();
        sessionInfo.put("sessionId", session.getId());
        sessionInfo.put("sessionCreationTime", new Date(session.getCreationTime()));
        sessionInfo.put("lastAccessedTime", new Date(session.getLastAccessedTime()));
        sessionInfo.put("maxInactiveInterval", session.getMaxInactiveInterval());

        if (authentication != null) {
            sessionInfo.put("authenticated", authentication.isAuthenticated());
            sessionInfo.put("username", authentication.getName());
            sessionInfo.put("authorities", authentication.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList()));
            sessionInfo.put("authenticationClass", authentication.getClass().getSimpleName());
        } else {
            sessionInfo.put("authenticated", false);
        }

        return ResponseEntity.ok(sessionInfo);
    }
    @PostMapping("/confirmTeacherRole")
    public ResponseEntity<TeacherUserResponseDto> setTeacherRole(@RequestBody TeacherUserRequestDto dto){
        return ResponseEntity.ok(userService.approveTeacherSignUp(dto));
    }
@GetMapping("/getApplicetRole/{applicentrole}")
public ResponseEntity<List<TeacherResponseDto>> getTeacherApplicentRole(@PathVariable("applicentrole")String role){
    return ResponseEntity.ok(userService.getAllApplicaentTeachers(role));
}
}
