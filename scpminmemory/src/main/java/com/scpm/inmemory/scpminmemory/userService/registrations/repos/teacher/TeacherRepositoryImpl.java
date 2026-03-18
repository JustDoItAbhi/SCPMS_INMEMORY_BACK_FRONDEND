package com.scpm.inmemory.scpminmemory.userService.registrations.repos.teacher;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.model_teachers.Teachers;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.Roles;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.Users;
import com.scpm.inmemory.scpminmemory.userService.registrations.exceptions.exceptionDto.RoleNotFoundException;
import com.scpm.inmemory.scpminmemory.userService.registrations.repos.UserRepository;
import com.scpm.inmemory.scpminmemory.userService.registrations.repos.role_repo.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TeacherRepositoryImpl implements TeacherRepository{
    Map<Long, Teachers> teachersHashMap=new ConcurrentHashMap<>();

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RolesRepository rolesRepository;

    @Override
    public void save(Teachers teachers) {
        teachersHashMap.put(teachers.getId(),teachers);
    }


    @Override
    public Optional<Teachers> findById(long id) {
        Teachers teachers=teachersHashMap.get(id);
        return Optional.ofNullable(teachers);
    }

    @Override
    public List<Teachers> findAll() {
        return new ArrayList<>(teachersHashMap.values());
    }

    @Override
    public void deleteById(long id) {
        Teachers teachers=teachersHashMap.get(id);
        if(teachers!=null){
            teachersHashMap.remove(teachers);
        }
    }

    @Override
    public List<Teachers> findBySubject(String subject) {
        List<Teachers>teachersList=new ArrayList<>();
        for(Teachers teachers:teachersHashMap.values()){
            if(teachers.getSubject().equals(subject) && teachers.getSubject()!=null){
                teachersList.add(teachers);
            }
        }
        return teachersList;
    }

    @Override
    public List<Teachers> findBySubjectIgnoreCaseAndTrim(String subject) {
        List<Teachers> teachersList = new ArrayList<>();

        String cleanedInput = subject.trim().toLowerCase();

        for (Teachers teacher : teachersHashMap.values()) {
            if (teacher.getSubject() != null &&
                    teacher.getSubject().trim().toLowerCase().equals(cleanedInput)) {
                teachersList.add(teacher);
            }
        }

        return teachersList;
    }

    @Override
    public List<Teachers> findBySubjectContainingIgnoreCaseAndTrim(String subject) {
        List<Teachers> teachersList = new ArrayList<>();

        String cleanedInput = subject.trim().toLowerCase();

        for (Teachers teacher : teachersHashMap.values()) {
            if (teacher.getSubject() != null &&
                    teacher.getSubject().trim().toLowerCase().contains(cleanedInput)) {
                teachersList.add(teacher);
            }
        }

        return teachersList;
    }

    @Override
    public Optional<Teachers> findByUserEmail(String userEmail) {
        for (Teachers teacher : teachersHashMap.values()) {
            if (teacher.getUserEmail() != null &&
                    teacher.getUserEmail().equalsIgnoreCase(userEmail)) {
                return Optional.of(teacher);
            }
        }
        return Optional.empty();
    }

    @Override
    public List<Teachers> findByApplicentRole(String role) {

        Optional<Roles> roles=rolesRepository.findByRoleName(role);
        if(roles.isEmpty()){
            throw new RoleNotFoundException("NO SUCH ROLE EXSISTS "+role);
        }

        List<Users>users=userRepository.findAll();
        List<Teachers>teachersList=new ArrayList<>();
        for(Teachers teachers:teachersHashMap.values()){
        for(Users oldUser:users){
            for(Roles roles1:oldUser.getRolesList()){
                if(role.equals(roles1.getRoleName())){
                    teachersList.add(teachers);
                }
            }
        }

        }
        return teachersList;
    }
}
