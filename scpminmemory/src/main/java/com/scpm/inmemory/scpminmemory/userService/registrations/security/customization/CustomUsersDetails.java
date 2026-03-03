package com.scpm.inmemory.scpminmemory.userService.registrations.security.customization;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.Users;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@JsonDeserialize// json deserializer requirment of springboot oauth2 implentation

public class CustomUsersDetails implements UserDetails {
    private String password;// user custome password for jwt token  implementation
    private  String username;// user custome user for jwt token  implementation
    private long userId;// user custome user id for jwt token implementation
    private boolean accountNonExpired;// user custome jwt token expiry for jwt implementation
    private  boolean accountNonLocked;// user custome jwt token credential lock for jwt implementation
    private  boolean credentialsNonExpired;// // user custome jwt token credential non expiry for jwt implementation
    private boolean enabled;// // user custome jwt token enable for jwt implementation
    private String userEmail;// optional // user custome jwt token usereamil for jwt not implementation
    private List<GrantedAuthority>authorities;

    public CustomUsersDetails() {
    }

    public CustomUsersDetails(long id, String email, String password, String name, Collection<? extends GrantedAuthority> authorities) {
    }

    //// user custome jwt token role based authority for jwt implementation

    public void setPassword(String password) {
        this.password = password;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public void setAccountNonExpired(boolean accountNonExpired) {
        this.accountNonExpired = accountNonExpired;
    }

    public void setAccountNonLocked(boolean accountNonLocked) {
        this.accountNonLocked = accountNonLocked;
    }

    public void setCredentialsNonExpired(boolean credentialsNonExpired) {
        this.credentialsNonExpired = credentialsNonExpired;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public void setAuthorities(List<GrantedAuthority> authorities) {
        this.authorities = authorities;
    }


    @Override
    public String getUsername() {
        return username;
    }

    public CustomUsersDetails(Users user) {// converting user to custom user
        this.username = user.getEmail();
        this.password = user.getPassword();
        this.userId=user.getId();
        this.userEmail = user.getEmail();
        this.accountNonExpired = true;
        this.accountNonLocked = true;
        this.credentialsNonExpired = true;
        this.enabled = true;
        this.authorities = user.getRolesList().stream()
                .map(role -> new CustomiseGrandAuthority( role.getRoleName())) //  role format as string
                .collect(Collectors.toList());
        System.out.println("ROLES FOUND ");
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }
    // getters
    public String getUserEmail() {
        return username;
    }

    public long getUserId() {
        System.out.println("USER ID INSIDE CUSTOM USER DETAILS ____________"+userId);
        return userId;
    }

    @Override
    public String getPassword() {
        return password;
    }


    @Override
    public boolean isAccountNonExpired() {
        return accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

}