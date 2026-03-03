package com.scpm.inmemory.scpminmemory.userService.registrations.repos;


import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.Users;

import java.util.List;
import java.util.Optional;


public interface UserRepository {
    Optional<Users>findByEmail(String email);
    void save(Users users);
    List<Users> findAll();
    Users findById(long id);
    void delete(Users users);
    void deleteById(long id);
}
