package com.scpm.inmemory.scpminmemory.userService.registrations.services;


import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.user_dto.RolesRequestDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.reponseDtos.RoleResponseDto;

import java.util.List;

public interface RoleService {
    RoleResponseDto createRoles(RolesRequestDto dto);
    List<RoleResponseDto>allRoles();
    String autoRoleCreateing();
}
