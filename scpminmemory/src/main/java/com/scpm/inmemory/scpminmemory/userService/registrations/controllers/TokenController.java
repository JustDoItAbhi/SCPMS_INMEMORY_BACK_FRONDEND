package com.scpm.inmemory.scpminmemory.userService.registrations.controllers;

import com.scpm.inmemory.scpminmemory.userService.config.JwtTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.authorization.OAuth2AuthorizationService;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.HashMap;

@RestController
public class TokenController {

    @GetMapping("/profile")
    public HashMap<String,Object> profile() {
        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        HashMap<String,Object>map=new HashMap<>();
       map.put("authorities ", auth.getAuthorities());
        map.put("name ",auth.getName());
        map.put("principle ",auth.getPrincipal());
        map.put("docs ",auth.getCredentials());
        auth.getDetails();

        return  map;
    }
}