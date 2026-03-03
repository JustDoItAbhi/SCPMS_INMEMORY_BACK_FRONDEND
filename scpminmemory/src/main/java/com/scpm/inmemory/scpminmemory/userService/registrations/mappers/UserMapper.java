package com.scpm.inmemory.scpminmemory.userService.registrations.mappers;



import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.reponseDtos.RoleResponseDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.reponseDtos.UserResponseDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.Roles;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.Users;

import java.util.ArrayList;
import java.util.List;

public class UserMapper {
    public static UserResponseDto fromUserEntity(Users users){
        UserResponseDto responseDto=new UserResponseDto();
        responseDto.setId(users.getId());
        responseDto.setName(users.getName());
        responseDto.setEmail(users.getEmail());
        responseDto.setPassword(users.getPassword());
        responseDto.setAddress(users.getAddress());
        List<RoleResponseDto>rolesList=new ArrayList<>();
        for(Roles roles: users.getRolesList()){
           RoleResponseDto dto=new RoleResponseDto();
           dto.setRoles(roles.getRoleName());
            rolesList.add(dto);
        }

        responseDto.setRolesList(rolesList);
        return responseDto;
    }
}
