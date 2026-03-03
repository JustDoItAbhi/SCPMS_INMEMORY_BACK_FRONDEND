package com.scpm.inmemory.scpminmemory.userService.registrations.repos.studentRepo;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.modals_student.Students;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.Users;
import com.scpm.inmemory.scpminmemory.userService.registrations.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class StudentsRepositoryImpl implements StudentsRepository {

    private final Map<Long, Students> studentsMap = new ConcurrentHashMap<>();
    @Autowired
    private UserRepository userRepository;

    @Override
    public void save(Students students) {
        if (students == null) {
            throw new IllegalArgumentException("Students object cannot be null");
        }
        studentsMap.put(students.getId(), students);
    }

    @Override
    public Optional<Students> findById(long id) {
        Students students= studentsMap.get(id);
        return Optional.ofNullable(students);
    }

    @Override
    public List<Students> findAll() {
        return new ArrayList<>(studentsMap.values());
    }

    @Override
    public void deleteById(long id) {
        studentsMap.remove(id);
    }

    @Override
    public Optional<Students> findByUserId(Long userId) {
        Users users=userRepository.findById(userId);
for(Students students:studentsMap.values()){
    if(students.getUser().getId()==users.getId()){
        return Optional.of(students);
    }
}
        return Optional.empty();
    }

    @Override
    public void deleteByUserId(Long userId) {
        if (userId == null) {
            return;
        }

        studentsMap.entrySet().removeIf(entry -> {
            Students student = entry.getValue();
            Users user = student.getUser();
            return user != null && userId.equals(user.getId());
        });
    }
}