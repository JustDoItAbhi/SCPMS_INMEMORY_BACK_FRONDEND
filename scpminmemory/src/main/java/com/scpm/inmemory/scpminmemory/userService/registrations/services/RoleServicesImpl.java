package com.scpm.inmemory.scpminmemory.userService.registrations.services;

import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.user_dto.RolesRequestDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.reponseDtos.RoleResponseDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.Roles;
import com.scpm.inmemory.scpminmemory.userService.registrations.exceptions.exceptionDto.RoleNotFoundException;
import com.scpm.inmemory.scpminmemory.userService.registrations.repos.role_repo.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


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
//        Optional<Roles> exsitingRole=rolesRepository.findByRoleName(dto.getRoles());
//        if(exsitingRole.isPresent()){
//            throw new RoleNotFoundException("ROLE ALREADY EXISTS  " + dto.getRoles());
//        }
//        exsitingRole.get().setRoleName(dto.getRoles());
//        exsitingRole.setRoleName(dto.getRoles());
        Roles roles=new Roles();
        roles.setRoleName(dto.getRoles());
        rolesRepository.save(roles);
        return roleMapper(roles);
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


    private RoleResponseDto roleMapper(Roles roles){
        RoleResponseDto dto=new RoleResponseDto();
        dto.setId(roles.getId());
        dto.setCreatedAt(roles.getCreatedAt());
        dto.setRoles(roles.getRoleName());
        return dto;
    }
}
