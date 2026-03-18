package com.scpm.inmemory.scpminmemory.userService.registrations.controllers;

import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.user_dto.RolesRequestDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.dtos.reponseDtos.RoleResponseDto;
import com.scpm.inmemory.scpminmemory.userService.registrations.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/roles")
public class RoleController {
    @Autowired
private RoleService roleService;
@PostMapping("/createRole")
    public ResponseEntity<RoleResponseDto> createRole(@RequestBody RolesRequestDto dto){
    return ResponseEntity.ok(roleService.createRoles(dto));
}
@GetMapping("/getAllRoles")
public ResponseEntity<List<RoleResponseDto>> allRole(){
    return ResponseEntity.ok(roleService.allRoles());
}
@PostMapping("/manuelCreatingRole")
    public ResponseEntity<String>manuelCreatingRole(){
    return ResponseEntity.ok(roleService.autoRoleCreateing());
}
}
