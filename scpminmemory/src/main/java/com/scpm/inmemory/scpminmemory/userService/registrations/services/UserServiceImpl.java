package com.scpm.inmemory.scpminmemory.userService.registrations.services;


import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.reponseDtos.LoginResponseDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.reponseDtos.OtpResponseDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.reponseDtos.UserResponseDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.teacherDto.TeacherUserRequestDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.teacherDto.TeacherUserResponseDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.user_dto.SignUpRequestDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.user_dto.UpdateUserDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.email.iEmailService;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.modals_student.Students;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.model_teachers.ApplicentTeacher;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.model_teachers.Teachers;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.Roles;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.StudentOtp;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.TeachrUser;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.Users;
import com.scpm.inmemory.scpminmemory.userService.registrations.exceptions.UserExceptions;
import com.scpm.inmemory.scpminmemory.userService.registrations.mappers.UserMapper;
import com.scpm.inmemory.scpminmemory.userService.registrations.repos.teacher.TeacherRepository;
import com.scpm.inmemory.scpminmemory.userService.registrations.repos.teacher.TeacherUserRepository;
import com.scpm.inmemory.scpminmemory.userService.registrations.repos.UserRepository;
import com.scpm.inmemory.scpminmemory.userService.registrations.repos.role_repo.RolesRepository;
import com.scpm.inmemory.scpminmemory.userService.registrations.repos.student_otp_repo.StudentOtpRepository;
import com.scpm.inmemory.scpminmemory.userService.registrations.repos.teacheruser_applicent.TeachrUserApplicentRepo;
import com.scpm.inmemory.scpminmemory.userService.registrations.telegram.TelegramOtpResponseDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.telegram.TelegramService;
import com.scpm.inmemory.scpminmemory.userService.teachers.teachermappers.TeacherMapper;
import com.scpm.inmemory.scpminmemory.userService.teachers.teachersDtos.TeacherResponseDto;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;

import org.springframework.stereotype.Service;


import javax.crypto.SecretKey;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;
//    @Autowired
//    private AuthenticationManager authenticationManager;
    @Autowired
    private RolesRepository rolesRepository;

    @Autowired
    private JwtEncoder jwtEncoder;
    @Autowired
    private StudentOtpRepository studentOtpRepository;
    @Autowired
    private TeacherUserRepository teacherUserRepository;
    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private TeachrUserApplicentRepo teacherApplicentRepo;

    @Autowired
   private final BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private  iEmailService emailService;
    @Autowired
    private TelegramService telegramService;

    public UserServiceImpl(StudentOtpRepository studentOtpRepository, UserRepository userRepository, AuthenticationManager authenticationManager, RolesRepository rolesRepository, JwtEncoder jwtEncoder,
                           TeacherUserRepository teacherUserRepository,
                           TeacherRepository teacherRepository, BCryptPasswordEncoder passwordEncoder, iEmailService emailService) {
        this.studentOtpRepository = studentOtpRepository;
        this.userRepository = userRepository;
//        this.authenticationManager = authenticationManager;
        this.rolesRepository = rolesRepository;
        this.jwtEncoder = jwtEncoder;
        this.teacherUserRepository = teacherUserRepository;
        this.teacherRepository = teacherRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    private final Map<String, UserResponseDto> userResponseCache = new ConcurrentHashMap<>();
    private final Map<String, Users> userCache = new ConcurrentHashMap<>();
    private final Map<String, Roles> roleCache = new ConcurrentHashMap<>();
    private final Map<String, StudentOtp> otpCache = new ConcurrentHashMap<>();
    private final Map<String, Students> studentCache = new ConcurrentHashMap<>();
    private final Map<String, TeachrUser> teacherMap = new ConcurrentHashMap<>();

    private static final String JWT_SECRET =
            "THIS_IS_A_MINIMUM_32_CHAR_LONG_SECRET_KEY_123";

    @Autowired
    public UserServiceImpl(iEmailService emailService, TeacherUserRepository teacherUserRepository,
                           StudentOtpRepository studentOtpRepository, BCryptPasswordEncoder passwordEncoder,
                           RolesRepository rolesRepository, UserRepository userRepository) {
        this.emailService = emailService;
        this.teacherUserRepository = teacherUserRepository;
        this.studentOtpRepository = studentOtpRepository;
        this.passwordEncoder = passwordEncoder;
        this.rolesRepository = rolesRepository;
        this.userRepository = userRepository;

    }



    @Override
    public UserResponseDto createUser(SignUpRequestDto dto) {
      Users exsitingUser=null;
      try {
          exsitingUser = userRepository.findByEmail(dto.getEmail()).orElseThrow(
                  ()->new UserExceptions("USER ALREADY EXISTS " + dto.getEmail()));

      }catch (Exception e){
         exsitingUser=userCache.get(dto.getEmail());
      }
        Users users=new Users();
        users.setName(dto.getName());
        users.setEmail(dto.getEmail());
        String password= passwordEncoder.encode(dto.getPassword());
        users.setPassword(password);
        users.setAddress(dto.getAddress());

        List<Roles>rolesList=new ArrayList<>();

        for(String roles:dto.getRolesList()){
          Roles role = null;
          try {
             role=rolesRepository.findByRoleName(roles).orElseThrow(
                     ()->new UserExceptions("NO SUCH ROLE EXSISTS "+roles));
          }catch (Exception e){
              role=roleCache.get(roles);
              if (role==null){
                  throw new UserExceptions("Role not found in memory cache: " + roles);
              }
          }
            rolesList.add(role);
        }
        users.setRolesList(rolesList);
        // if ROLE IS STUDENT THEN SEND OTP TO CONFIM EMAIL AND ADD OTP PAGE IN REACT AND FINISH SIGN UP
        if(dto.getRolesList().equals("STUDENT")) {
          StudentOtp studentOtp;
           try{
               studentOtp=studentOtpRepository.findByEmail(dto.getEmail()).orElseThrow(
                       ()->new UserExceptions("YOU ARE NOT ALLOWED TO SIGNUP PLEASE CONTACT ADMIN :: arvinderpalsingh2321@gmail.com"));
           }catch (Exception e){
           studentOtp=otpCache.get(dto.getEmail());
               if (studentOtp == null) {
                   throw new UserExceptions("OTP NOT FOUND (DB + MEMORY)");
               }
           }

        }
        // IF ROLE IS TEACHER THEN SEND EMAIL AND WAIT FOR ADMIN TO CONFIM EMAIL , AND SEND EMAIL TO TEACHER WITH A LINK TO FINISH SIGNUP
        users.setRolesList(rolesList);
        try {
            userRepository.save(users);
        }catch (Exception e){
            System.out.println("DB DOWN → Saving user in memory");
            userCache.put(users.getEmail(),users );
        }
        UserResponseDto responseDto= UserMapper.fromUserEntity(users);
        if (dto.getRolesList().contains("STUDENT")) {
            System.out.println("email ready to send");
//            emailService.sendOtp(users.getEmail(),
//                    "WELCOME TO S.C.P.M.S MANAGEMENT SYSTEM 😎",
//                    "WORK HARD AND ACHIEVE YOUR GOALS, ALL THE BEST 👍");
        }

        if (dto.getRolesList().contains("TEACHER")) {
            System.out.println("email ready to send");
//            emailService.sendOtp(users.getEmail(),
//                    "WELCOME TO S.C.P.M.S MANAGEMENT SYSTEM 😎",
//                    "THANK YOU FOR JOINING US, ALL THE BEST 👍");
        }
        userResponseCache.put(users.getEmail(), responseDto);
        System.out.println("USER CREATED SUCCSSFULLY "+users.getName());
        return responseDto;
    }

    @Override
    public String studentSignup(String email, String role) {
        System.out.println("YOU ARE IN SIGNUP AS  STUDNET METHOD NOW ");
        Roles   roleEntity = rolesRepository.findByRoleName(role)
                    .orElseThrow(() -> new UserExceptions("NO SUCH ROLE EXISTS " + role));
        if (roleEntity.getRoleName().equals("STUDENT")) {

            String  isOtpSent = sendOtpToUserSignUp(email);
            if (isOtpSent==null) {
                throw new UserExceptions("OTP NOT SENT");
            }
            return isOtpSent;

        } else if (roleEntity.getRoleName().equals("APPLICANT_TEACHER")) {
            // send admin to this url so that admin can enrol applicant teacher
            // to teacher http://localhost:8080/api/user/confirmTeacherRole
            Optional<TeachrUser> teacher;
            try {
                teacher = teacherUserRepository.findByTeacherEmail(email);
                if(teacher.isEmpty()){
                    ApplicentTeacher applicentTeacher=new ApplicentTeacher();
                    applicentTeacher.setEmail(email);
                    applicentTeacher.setApplicentRole(role);
                    teacherApplicentRepo.save(applicentTeacher);
                }
                if (teacher.isPresent()) {
                    return "CREATE PROFILE";
                }else {

                    System.out.println("TEACHER APPLICENT DETAILS "+teacher.get().getRole());
                    return "CREATE PROFILE";
                }

//                "redirect:http://localhost:5173/callback";
            } catch (Exception e) {
                if (teacherMap.containsKey(email))
                    return "CREATE PROFILE";
            }

//                    return "redirect:http://localhost:5173/TEACHER-WAIT";

//            emailService.sendOtp("arvinderpalsingh2321@gmail.com",
//                    "REQUEST FOR SIGN UP FROM TEACHER",
//                    "ALLOW TEACHER TO SIGN UP \n " + email);// NAVIGATE TO SOME URL

            return "PLEASE WAIT";
        }

        throw new UserExceptions("YOU ARE NOT ALLOWED TO ACCESS");

    }
    private String sendOtpToUserSignUp(String email){

        OtpResponseDto responseDto=new OtpResponseDto();
        SecureRandom random = new SecureRandom();
        int randomOtp = random.nextInt(1000000);
        String otp =  String.format("%06d", randomOtp);
        LocalDateTime generatedTime = LocalDateTime.now();
        LocalDateTime expiryTime = generatedTime.plusMinutes(5);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("hh:mm:ss a");
        String generatedTimeReadable = generatedTime.format(formatter);
        String expiryTimeReadable = expiryTime.format(formatter);
//        users.setOtp(passwordEncoder.encode( otp));
//        users.setOtpExpiry(expiryTime);
        responseDto.setEmail(email);
        responseDto.setOtp(otp);
        System.out.println("HERE IS OTP "+otp);
        responseDto.setExpiryTime(expiryTime);

        Optional<StudentOtp>oldstudentOtp=studentOtpRepository.findByEmail(email);
        if(oldstudentOtp.isPresent()){
            StudentOtp studentOtp= oldstudentOtp.get();
            studentOtp.setEmail(email);
            studentOtp.setOtp(passwordEncoder.encode(otp));
            studentOtp.setExpiryTime(expiryTime);
            studentOtpRepository.save(studentOtp);
        }else {
            StudentOtp studentOtp= new StudentOtp();
            studentOtp.setEmail(email);
            studentOtp.setOtp(passwordEncoder.encode(otp));
            studentOtp.setExpiryTime(expiryTime);
            studentOtpRepository.save(studentOtp);
        }

        if(generatedTime.isAfter(expiryTime)){
            throw new UserExceptions("OTP expired");
        }
        //REDIS IMPLEMETATION
        String key=otp+email;
        String optValue=otp;

//        emailService.sendOtp(email,"YOUR OTP IS "+ otp,"THANK YOU");
//        System.out.println("EMAIL SENT FOR SIGNUP ");
//        userRepository.save(users);
        return optValue;
    }
    @Override
    public String confirmStudentOtp(String email, String otp) {
        StudentOtp student;

        try {
            student = studentOtpRepository.findByEmail(email)
                    .orElseThrow(() -> new UserExceptions("EMAIL NOT EXISTS " + email));
        } catch (Exception e) {
            student = otpCache.get(email);
            if (student == null) {
                throw new UserExceptions("EMAIL NOT EXISTS (DB + MEMORY) " + email);
            }
        }

        if (!passwordEncoder.matches(otp, student.getOtp())) {
            throw new UserExceptions("INVALID OTP");
        }

        if (LocalDateTime.now().isAfter(student.getExpiryTime())) {
            throw new UserExceptions("OTP EXPIRED");
        }

        return "PLEASE SIGN UP NOW";
    }

    @Override
    public TeacherUserResponseDto approveTeacherSignUp(TeacherUserRequestDto dto) {
            Optional<Users>exsitingUser=userRepository.findByEmail(dto.getTeacherEmail());
        if(exsitingUser.isPresent()){
            System.out.println("WE CANNOT SEND EMAIL BECAUSE SERVER IS DOWN ");
//            return    "redirect:http://localhost:5173/callback";
//            emailService.sendOtp(dto.getTeacherEmail(),"you already regitered teacher please signup or reset password "+ dto.getRole(), "THANK YOUR FOR REACHING US ");
//            System.out.println("EMAIL SENT FOR SIGNUP ");
        }
            Optional<Roles>rolesOptional=rolesRepository.findByRoleName(dto.getRole());
            if(rolesOptional.isEmpty()){
                throw new UserExceptions("NO SUCH ROLE EXSISTS "+dto.getRole());
            }if(!dto.getRole().equals("TEACHER")){
                throw new UserExceptions("YOU ARE NOT A TEACHER "+dto.getRole());
        }
            Optional<TeachrUser>tUser=teacherUserRepository.findByTeacherEmail(dto.getTeacherEmail());
            if(tUser.isPresent()){
                throw new UserExceptions("this teacher already exsists "+ dto.getTeacherEmail());
            }
        TeachrUser teachrUser=new TeachrUser();
            teachrUser.setTeacherEmail(dto.getTeacherEmail());
            teachrUser.setRole("TEACHER");

            teacherUserRepository.save(teachrUser);
            teacherMap.put(dto.getTeacherEmail(), teachrUser);

            TeacherUserResponseDto teacherUserResponseDto=new TeacherUserResponseDto();
            teacherUserResponseDto.setTeacherEmail(teachrUser.getTeacherEmail());
            teacherUserResponseDto.setRole(teachrUser.getRole());

        return teacherUserResponseDto;
    }

    @Override
    public List<TeacherResponseDto> getAllApplicaentTeachers(String applicant_teacher_role) {
List<Teachers>teachersList=teacherRepository.findByApplicentRole(applicant_teacher_role);
List<TeacherResponseDto>responseDtos=new ArrayList<>();
for(Teachers teachers:teachersList){
    if(teachers==null){

    }
    responseDtos.add(TeacherMapper.fromTeacherEntity(teachers));
    System.out.println("all applicent teachers "+teachers);

}
return responseDtos;
    }

    @Override
    public List<ApplicentTeacher> getApplicents() {
        List<ApplicentTeacher>applicentTeacherList=teacherApplicentRepo.findAll();

        return applicentTeacherList;
    }

    @Override
    public String createAdmin(SignUpRequestDto dto) {
        Users exsitingUser=null;
        try {
            exsitingUser = userRepository.findByEmail(dto.getEmail()).orElseThrow(
                    ()->new UserExceptions("USER ALREADY EXISTS " + dto.getEmail()));

        }catch (Exception e){
            exsitingUser=userCache.get(dto.getEmail());
        }
        Users users=new Users();
        users.setName(dto.getName());
        users.setEmail(dto.getEmail());
        String password= passwordEncoder.encode(dto.getPassword());
        users.setPassword(password);
        users.setAddress(dto.getAddress());

        List<Roles>rolesList=new ArrayList<>();

        for(String roles:dto.getRolesList()){
            Roles role = null;
            try {
                role=rolesRepository.findByRoleName(roles).orElseThrow(
                        ()->new UserExceptions("NO SUCH ROLE EXSISTS "+roles));
            }catch (Exception e){
                role=roleCache.get(roles);
                if (role==null){
                    throw new UserExceptions("Role not found in memory cache: " + roles);
                }
            }
            rolesList.add(role);
        }
        users.setRolesList(rolesList);
        // if ROLE IS STUDENT THEN SEND OTP TO CONFIM EMAIL AND ADD OTP PAGE IN REACT AND FINISH SIGN UP

        // IF ROLE IS TEACHER THEN SEND EMAIL AND WAIT FOR ADMIN TO CONFIM EMAIL , AND SEND EMAIL TO TEACHER WITH A LINK TO FINISH SIGNUP
        users.setRolesList(rolesList);
        try {
            userRepository.save(users);
        }catch (Exception e){
            System.out.println("DB DOWN → Saving user in memory");
            userCache.put(users.getEmail(),users );
        }
        UserResponseDto responseDto= UserMapper.fromUserEntity(users);

        userResponseCache.put(users.getEmail(), responseDto);
        System.out.println("ADMIN CREATED SUCCSSFULLY "+users.getName());

        return "this method not working ";
    }


    private boolean confimOtp(String email, String Otp) {
       Users exsistingUsers=null;
        try{
         exsistingUsers=userRepository.findByEmail(email).orElseThrow(
                 ()->new UserExceptions("NO USER FOUND "+ email));
        }catch (Exception e){
            userResponseCache.get(exsistingUsers.getEmail());
        }

        Users users=exsistingUsers;

        if(!passwordEncoder.matches(Otp,users.getOtp())){
            throw new UserExceptions("INVALID OTP "+ Otp+" Request "+users.getOtp());
        }else if(LocalDateTime.now().isAfter( users.getOtpExpiry())){
            throw new UserExceptions("OTP EXPIRED " + Otp);
        }
        UserResponseDto dto=UserMapper.fromUserEntity(users);
        try{
            userRepository.save(users);
            dto=UserMapper.fromUserEntity(users);
            System.out.println("PASSWORD RESET SUCCESSFULLY_________________________________");
        }catch (Exception e){
            dto=UserMapper.fromUserEntity(users);
            userResponseCache.put(users.getEmail(),dto);
        }

        return true;
    }

    @Override
    public LoginResponseDto login(String email, String password) {

        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserExceptions(
                        "User not exists please SignUP " + email
                ));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new UserExceptions("Invalid password");
        }

        SecretKey key = Keys.hmacShaKeyFor(JWT_SECRET.getBytes());

        Map<String, Object> claims = new HashMap<>();
        claims.put("email", user.getEmail());
        claims.put("name", user.getName());
        claims.put("roles", user.getRolesList()
                .stream()
                .map(r -> "ROLE_" + r.getRoleName())
                .toList());

        String token = Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 30 * 60 * 1000))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        LoginResponseDto dto = new LoginResponseDto();
        dto.setToken(token);

        return dto;
    }

    @Override
    public List<UserResponseDto> getAllUsers() {
        try {
            return userRepository.findAll()
                    .stream()
                    .map(UserMapper::fromUserEntity)
                    .toList();
        } catch (Exception e) {
            return userCache.values()
                    .stream()
                    .map(UserMapper::fromUserEntity)
                    .toList();
        }
    }

    @Override
    public UserResponseDto getUserById(long id) {
        System.out.println("INSIDE GET USER BY ID METHOS ");
        Users user = userRepository.findById(id);
        if (user == null) {
            throw new UserExceptions("NO USER FOUND");
        }
        return UserMapper.fromUserEntity(user);
    }

    @Override

    public boolean deleteUserById(long id) {
    Users users=userRepository.findById(id);
    if(users!=null){
        users.getRolesList().clear();
        userRepository.save(users);
        userRepository.delete(users);
        return true;
    }else{
        return  false;
    }
    }

    @Override
    public UserResponseDto updateUser(long id, UpdateUserDto dto) {
        Users exsistingUsers=userRepository.findById(id);
        if(exsistingUsers==null) {
            throw new UserExceptions("NO USER FOUND"+ id);
        }
        Users users= exsistingUsers;
        List<Roles>rolesList=new ArrayList<>();
        for(String roles:dto.getRolesList()){
            Optional<Roles>rolesOptional=rolesRepository.findByRoleName(roles);
            if(rolesOptional.isEmpty()){
                throw new UserExceptions("NO SUCH ROLE EXSIST "+roles);
            }
            rolesList.add(rolesOptional.get());
        }
        users.setRolesList(rolesList);
        users.setName(dto.getName());
        users.setEmail(dto.getEmail());
        users.setAddress(dto.getAddress());
        users.setPassword(passwordEncoder.encode(dto.getPassword()));
        userRepository.save(users);
        return UserMapper.fromUserEntity(users);
    }

    @Override
    public OtpResponseDto sendOtp(String email) {
        Users users;
        // 1️⃣ Try DB first
        try {
            users = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UserExceptions("NO USER FOUND " + email));
        } catch (Exception e) {
            users = userCache.get(email);
            if (users == null) {
                throw new UserExceptions("NO USER FOUND (DB + CACHE) " + email);
            }
        }
        // 2️⃣ Generate OTP
        SecureRandom random = new SecureRandom();
        String otp = String.format("%06d", random.nextInt(1000000));

        LocalDateTime generatedTime = LocalDateTime.now();
        LocalDateTime expiryTime = generatedTime.plusMinutes(5);

        users.setOtp(passwordEncoder.encode(otp));
        users.setOtpExpiry(expiryTime);

        try {
            userRepository.save(users);
        } catch (Exception e) {
            userCache.put(users.getEmail(), users);
        }

//        emailService.sendOtp(users.getEmail(), "YOUR OTP IS " + otp, "THANK YOU");

        TelegramOtpResponseDto telegramOtpResponseDto=new TelegramOtpResponseDto();
        if (users.getTelegramUsername() != null && !users.getTelegramUsername().isEmpty()) {
            boolean telegramSent = telegramService.sendOtpByUsername(users.getTelegramUsername(), otp);
          telegramOtpResponseDto.setTelegramSent(telegramSent);
            telegramOtpResponseDto.setTelegramUsername(users.getTelegramUsername());

            System.out.println("TELEGRAM OTP "+ telegramOtpResponseDto.getOtp()+" TELGRAM USERNAME"+ telegramOtpResponseDto.getTelegramUsername());
        } else {
            telegramOtpResponseDto.setTelegramSent(false);
            log.warn("No Telegram username found for user: {}", email);
        }

        OtpResponseDto dto = new OtpResponseDto();
        dto.setEmail(telegramOtpResponseDto.getEmail());
        dto.setOtp(telegramOtpResponseDto.getOtp());
        dto.setExpiryTime(telegramOtpResponseDto.getExpiryTime());

        return dto;

    }

    @Override
    public UserResponseDto resetPassword(String email, String Otp, String password) {
        Users users;

        try {
            users = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UserExceptions("NO USER FOUND " + email));
        } catch (Exception e) {
            users = userCache.get(email);
            if (users == null) {
                throw new UserExceptions("NO USER FOUND (DB + CACHE) " + email);
            }
        }

        if (!passwordEncoder.matches(Otp, users.getOtp())) {
            throw new UserExceptions("INVALID OTP");
        }

        if (LocalDateTime.now().isAfter(users.getOtpExpiry())) {
            throw new UserExceptions("OTP EXPIRED");
        }

        if (passwordEncoder.matches(password, users.getPassword())) {
            throw new UserExceptions("New password cannot be same as old password");
        }

        users.setPassword(passwordEncoder.encode(password));
        users.setOtp(null);
        users.setOtpExpiry(null);

        try {
            userRepository.save(users);
        } catch (Exception e) {
            userCache.put(users.getEmail(), users);
        }

        return UserMapper.fromUserEntity(users);

//        Optional<Users>exsistingUsers=userRepository.findByEmail(email);
//        if(exsistingUsers.isEmpty()) {
//            throw new UserExceptions("NO USER FOUND "+ email);
//        }
//
//        Users users=exsistingUsers.get();
//        if(!passwordEncoder.matches(Otp,users.getOtp())){
//            throw new UserExceptions("INVALID OTP "+ Otp+" equest "+users.getOtp());
//        }else if(LocalDateTime.now().isAfter( users.getOtpExpiry())){
//            throw new UserExceptions("OTP EXPIRED " + Otp);
//        }else if(passwordEncoder.matches(password,users.getPassword())){
//            throw new UserExceptions("New password cannot be same as old password");
//
//        }
//        users.setPassword(passwordEncoder.encode(password));
//        userRepository.save(users);
//        System.out.println("PASSWORD RESET SUCCESSFULLY_________________________________");
//        return UserMapper.fromUserEntity(users);
    }
}
