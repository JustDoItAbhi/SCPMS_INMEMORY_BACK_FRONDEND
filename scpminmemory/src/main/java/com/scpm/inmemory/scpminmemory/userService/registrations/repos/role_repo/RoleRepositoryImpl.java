package com.scpm.inmemory.scpminmemory.userService.registrations.repos.role_repo;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.Roles;
import com.scpm.inmemory.scpminmemory.userService.registrations.exceptions.exceptionDto.RoleNotFoundException;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RoleRepositoryImpl implements RolesRepository{
        Map<String,Roles> rolesMap=new ConcurrentHashMap<>();



    @Override
    public void save(Roles roles) {
    rolesMap.put(roles.getRoleName(),roles);
        System.out.println("ROLE SAVED "+roles.getRoleName());
    }

    @Override
    public List<Roles> findAll() {
        List<Roles>rolesList=new ArrayList<>();
        for(Roles roles: rolesMap.values()){
            rolesList.add(roles);
        }
        return rolesList;
    }

    @Override
    public Optional<Roles> findByRoleName(String role) {
        Roles roles=rolesMap.get(role);
        if(roles==null){
            throw new RoleNotFoundException("REPO CANNOT FIND ROLE "+role);
        }
        return Optional.ofNullable(roles);
    }
}
