package com.scpm.inmemory.scpminmemory.userService.registrations.repos.teacher;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.TeachrUser;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TeacherUserRepositoryImpl implements TeacherUserRepository{
    Map<Long,TeachrUser>teachrUserMap=new ConcurrentHashMap<>();

    @Override
    public void save(TeachrUser teachrUser) {
        teachrUserMap.put(teachrUser.getId(), teachrUser);
    }

    @Override
    public Optional<TeachrUser> findById(long id) {
        return Optional.ofNullable(teachrUserMap.get(id));
    }

    @Override
    public List<TeachrUser> findAll() {
        return new ArrayList<>(teachrUserMap.values());
    }

    @Override
    public void deleteById(long id) {
        teachrUserMap.remove(id);
    }

    @Override
    public Optional<TeachrUser> findByTeacherEmail(String teacherEmail) {

        for (TeachrUser user : teachrUserMap.values()) {

            if (user.getTeacherEmail() != null &&
                    user.getTeacherEmail().equalsIgnoreCase(teacherEmail)) {

                return Optional.of(user);
            }
        }

        return Optional.empty();
    }

    @Override
    public Optional<TeachrUser> findByRole(String teacherRole) {

        for (TeachrUser user : teachrUserMap.values()) {

            if (user.getRole() != null &&
                    user.getRole().equalsIgnoreCase(teacherRole)) {

                return Optional.of(user);
            }
        }

        return Optional.empty();
    }
}
