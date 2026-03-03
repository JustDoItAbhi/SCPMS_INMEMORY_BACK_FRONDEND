package com.scpm.inmemory.scpminmemory.userService.registrations.security.customization;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.Users;
import com.scpm.inmemory.scpminmemory.userService.registrations.exceptions.UserExceptions;
import com.scpm.inmemory.scpminmemory.userService.registrations.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
public class UserDetailsServices implements UserDetailsService {// custome user details service to fetch user from entity
    @Autowired
    private UserRepository userRepository;// autowire constructor for user repository
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> savedUser=userRepository.findByEmail(username);
        if(!savedUser.isPresent()){// validation of user
            throw new UserExceptions("USER NOT FOUND "+ username);// throw error if user not exists
        }
        Users users=savedUser.get();
        System.out.println("USERS "+users.getName());
        return new CustomUsersDetails(users);
    }
}