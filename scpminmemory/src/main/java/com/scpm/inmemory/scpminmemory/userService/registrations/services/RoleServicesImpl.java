package com.scpm.inmemory.scpminmemory.userService.registrations.services;

import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.user_dto.RolesRequestDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.reponseDtos.RoleResponseDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.Roles;
import com.scpm.inmemory.scpminmemory.userService.registrations.exceptions.exceptionDto.RoleNotFoundException;
import com.scpm.inmemory.scpminmemory.userService.registrations.repos.role_repo.RolesRepository;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.io.File;
import java.sql.Driver;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class RoleServicesImpl implements RoleService{

    private final   RolesRepository rolesRepository;
@Autowired
    public RoleServicesImpl(RolesRepository rolesRepository) {
        this.rolesRepository = rolesRepository;
    }

    @Override
    public RoleResponseDto createRoles(RolesRequestDto dto) {
    Optional<Roles>roles=rolesRepository.findByRoleName(dto.getRoles());
    if(roles.isPresent()){
        throw new RoleNotFoundException("role already exists"+ dto.getRoles());
    }
        Roles admin=new Roles();
        admin.setRoleName(dto.getRoles());
        rolesRepository.save(admin);
    return roleMapper(admin);
    }


    @Override
    public List<RoleResponseDto> allRoles() {
    List<Roles>roles=rolesRepository.findAll();
    List<RoleResponseDto>responseDtos=new ArrayList<>();
    for(Roles roles1:roles){
        responseDtos.add(roleMapper(roles1));
    }
        return responseDtos;
    }

    @Override
    public String autoRoleCreateing() {
        Roles admin=new Roles();
        admin.setRoleName("ADMIN");
        rolesRepository.save(admin);
        Roles teacher=new Roles();
        teacher.setRoleName("TEACHER");
        rolesRepository.save(teacher);
        Roles student=new Roles();
        student.setRoleName("STUDENT");
        rolesRepository.save(student);
        Roles applicent=new Roles();
        applicent.setRoleName("APPLICANT_TEACHER");
        rolesRepository.save(applicent);
        return "ALL ROLE CREATED";
    }


    private RoleResponseDto roleMapper(Roles roles){
        RoleResponseDto dto=new RoleResponseDto();
        dto.setId(roles.getId());
        dto.setCreatedAt(roles.getCreatedAt());
        dto.setRoles(roles.getRoleName());
        return dto;
    }
}
