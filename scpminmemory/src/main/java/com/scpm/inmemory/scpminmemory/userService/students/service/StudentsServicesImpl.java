package com.scpm.inmemory.scpminmemory.userService.students.service;

import com.scpm.inmemory.scpminmemory.userService.registrations.email.iEmailService;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.modals_student.StudentAndSubject;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.modals_student.StudentTopic;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.modals_student.Students;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.modals_student.enums.TOPIC_STATUS;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.model_teachers.Teachers;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.Users;
import com.scpm.inmemory.scpminmemory.userService.registrations.exceptions.UserExceptions;
import com.scpm.inmemory.scpminmemory.userService.registrations.repos.teacher.TeacherRepository;
import com.scpm.inmemory.scpminmemory.userService.registrations.repos.UserRepository;
import com.scpm.inmemory.scpminmemory.userService.registrations.repos.role_repo.RolesRepository;
import com.scpm.inmemory.scpminmemory.userService.registrations.repos.studentRepo.StudentsRepository;
import com.scpm.inmemory.scpminmemory.userService.registrations.repos.student_subject_repo.StudentSubjectRepo;
import com.scpm.inmemory.scpminmemory.userService.registrations.repos.student_topic_repo.StudentTopicRepo;
import com.scpm.inmemory.scpminmemory.userService.registrations.repos.subject_repo.SubjectRepository;
import com.scpm.inmemory.scpminmemory.userService.students.StudentsMapper;
import com.scpm.inmemory.scpminmemory.userService.students.mapper.SubjectAndStudentMapper;
import com.scpm.inmemory.scpminmemory.userService.students.stDto.*;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.Subjects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
@Service
public class StudentsServicesImpl implements StudentsService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StudentsRepository studentsRepository;
    @Autowired
    private RolesRepository rolesRepository;
    @Autowired
    private StudentSubjectRepo studentSubjectRepo;
    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private StudentTopicRepo studentTopicRepo;
    @Autowired
    private TeacherRepository teacherRepository;
    private final iEmailService emailService;

    public StudentsServicesImpl(iEmailService emailService) {
        this.emailService = emailService;
    }

    @Override
    public StudentsResponseDto finishSignUp(long stId, StudentRequestDto dto) {
        Users existingUsers=userRepository.findById(stId);
        if(existingUsers==null){
            throw new UserExceptions("USER NOT EXISTS "+stId);
        }
        Users users= existingUsers;
        boolean isStudent=users.getRolesList().stream()
                .anyMatch(roles -> roles.getRoleName().equalsIgnoreCase("STUDENT"));
        boolean isAdmin=users.getRolesList().stream()
                .anyMatch(roles -> roles.getRoleName().equalsIgnoreCase("ADMIN"));
        if(!isStudent && !isAdmin){
            throw new UserExceptions("YOU ARE NOT A STUDENT NIGTHER A TEACHER SO NOT ALLOW FOR THIS REQUEST ");
        }

        Students students=new Students();
        students.setUser(users);
        students.setCurrentYear(dto.getCurrentYear());
        students.setGroupNumber(dto.getGroupNumber());
        students.setMonitorName(dto.getMonitorName());
        students.setSubGroupNumber(dto.getSubGroupNumber());
        students.setStudentIdCardNumber(dto.getStudentIdCardNumber());
        students.setPassportNumber(dto.getPassportNumber());
        studentsRepository.save(students);
//        users.setStudentProfile(students);
//        userRepository.save(users);
        return StudentsMapper.fromStudents(students);
    }

    @Override
    public boolean deleteStd(long id) {
        studentsRepository.deleteById(id);
        return true;
    }

    @Override
    public SelectSubjectAndStudentDetailsResponseDto selectYourSubject(long id, SelectSubjectAndStudentDetailsReqDto dto) {
        Optional<Students>exsitingStudent=studentsRepository.findById(id);
        if(exsitingStudent.isEmpty()){
            throw new UserExceptions("NO SUCH STUDENT EXISTS PLEASE COMPLETE SIGNUP "+id);
        }
        StudentAndSubject studentAndSubject=new StudentAndSubject();
        studentAndSubject.setStudents(exsitingStudent.get());
        Optional<Subjects>exsitingSubject=subjectRepository.findBySubject(dto.getSubject());
        if(exsitingSubject.isEmpty()){
            throw new UserExceptions("NO SUCH SUBJECT EXSITS "+dto.getSubject());
        }
        studentAndSubject.setSubject(dto.getSubject());
        studentAndSubject.setSubjectYear(dto.getSubjectYear());
        studentSubjectRepo.save(studentAndSubject);
        return SubjectAndStudentMapper.selectingFromEntityselectYourSubject(studentAndSubject);
    }

    @Override
    public boolean deleteSelectedSubject(long subjectId) {

        studentSubjectRepo.deleteById(subjectId);
        return true;
    }

    @Override
    public TopicResponeDto submitTopic(TopicRequestDto dto) {
        Optional<Teachers> exsitingTeacher = teacherRepository.findById(dto.getTeacherId());
        if(exsitingTeacher.isEmpty()){
            throw new UserExceptions("PLEASE CHOOSE A VALID TEACHER FOR SUBJECT TOPIC "+ dto.getTeacherId());
        }

        Optional<StudentAndSubject> studentAndSubject = studentSubjectRepo.findById(dto.getStudentandSubjectId());
        if(studentAndSubject.isEmpty()){
            throw new UserExceptions("THIS SUBJECT NOT EXISTS  "+dto.getStudentandSubjectId());
        }

        // Debug: Check if studentAndSubject is properly retrieved
        System.out.println("Found StudentAndSubject: " + studentAndSubject.get().getId());

        List<Teachers> teachersList = teacherRepository.findBySubject(studentAndSubject.get().getSubject());
        if(teachersList.isEmpty()){
            throw new UserExceptions("TEACHER NOT ASSIGNED TO THIS SUBJECT YET:: PLEASE REQUEST TEACHER "+dto.getTeacherId());
        }

        StudentTopic topic = new StudentTopic();
        topic.setTeacherId(dto.getTeacherId());

        topic.setStudentAndSubject(studentAndSubject.get());
        topic.setTopic(dto.getTopic());

        System.out.println("Topic studentAndSubject: " + topic.getStudentAndSubject());
        System.out.println("Topic studentAndSubject ID: " + (topic.getStudentAndSubject() != null ? topic.getStudentAndSubject().getId() : "NULL"));
        topic.setTeacherAprovels(TOPIC_STATUS.WAITING);
        studentTopicRepo.save(topic);
//        emailService.sendOtp(exsitingTeacher.get().getUserEmail(),
//                "YOU HAVE A TOPIC REQUEST FROM "+studentAndSubject.get().getStudents().getUser().getName().toUpperCase(),
//                "PLEASE CHECK YOUR DASHBOARD  THANK YOUR");
        System.out.println("EMAIL SENT TO TEACHER");
        return SubjectAndStudentMapper.fromTopicEntity(topic);
    }
    @Override
    public StudentsResponseDto getStudentById(long id) {
        Users existingUser=userRepository.findById(id);
        if(existingUser==null){
            throw new UserExceptions("NO SUCH USER "+id);
        }
        Users users=existingUser;
        Optional<Students>students=studentsRepository.findByUserId(id);
        if(students.isEmpty()){
            throw new UserExceptions("NO SUCH STUDENT "+id);
        }
        return StudentsMapper.fromStudents(students.get());
    }



    @Override
    public SelectSubjectAndStudentDetailsResponseDto getSubjectandStudentByUserId(long userId) {
        Users users= userRepository.findById(userId);
        if(users==null){
            throw new UserExceptions("USER NOT FOUND "+userId);
        }
        Optional<Students>students=studentsRepository.findByUserId(userId);
        if(students.isEmpty()){
            throw new UserExceptions("STUDENT NOT FOUND "+userId);
        }

        Optional<StudentAndSubject>subjectsandSubject=studentSubjectRepo.findByUserId(userId);
        if(subjectsandSubject.isEmpty()){
//            return new SelectSubjectAndStudentDetailsResponseDto();
            throw new UserExceptions("NO SUCH SUBJECT EXSISTS "+userId);
        }

        return SubjectAndStudentMapper.selectingFromEntityselectYourSubject(subjectsandSubject.get());
    }

    @Override
    public Boolean deleteFullUserById(long userId) {
        // Delete all StudentAndSubject records first
        studentSubjectRepo.deleteByUserId(userId);

        // Then delete other related entities...
        studentsRepository.deleteByUserId(userId);

        // Finally delete user
        userRepository.deleteById(userId);
        return true;
    }

    @Override
    public StudentAndSubject getStudentAndSubjectByiD(long studentAndSubjectId) {
        Optional<StudentAndSubject>subject=studentSubjectRepo.findById(studentAndSubjectId);
        if(subject.isEmpty()){
            throw new UserExceptions("STUDENT AND SUBJECT ENTITY CANNOT FIND BY THIS ID "+studentAndSubjectId);
        }
        return subject.get();
    }


}
