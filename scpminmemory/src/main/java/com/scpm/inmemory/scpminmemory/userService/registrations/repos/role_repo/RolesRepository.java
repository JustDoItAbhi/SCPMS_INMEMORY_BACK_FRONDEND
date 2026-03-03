package com.scpm.inmemory.scpminmemory.userService.registrations.repos.role_repo;



import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.Roles;

import java.util.List;
import java.util.Optional;


public interface RolesRepository{
    Optional<Roles>findByRoleName(String role);
    void save(Roles roles);
    List<Roles> findAll();
}
