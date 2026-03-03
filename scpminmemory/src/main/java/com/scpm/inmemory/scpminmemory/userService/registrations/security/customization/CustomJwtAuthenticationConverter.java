package com.scpm.inmemory.scpminmemory.userService.registrations.security.customization;

import com.scpm.inmemory.scpminmemory.userService.registrations.entities.user_model.modals.Roles;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;


import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class CustomJwtAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken>
{// customised jwt role base authentication to check and read roles
    private static Collection<? extends GrantedAuthority> extractResourceRoles(final Jwt jwt)
    {
        List<String> roles = jwt.getClaim("role");// fetch role from jwt
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();

        for (String role: roles) {
            grantedAuthorities.add(new CustomiseGrandAuthority(new Roles().getRoleName()));
        } // collected role from token for implemention in security configration

        return grantedAuthorities;
    }

    private final JwtGrantedAuthoritiesConverter defaultGrantedAuthoritiesConverter =
            new JwtGrantedAuthoritiesConverter();


    @Override
    public AbstractAuthenticationToken convert(final Jwt source)
    {
        Collection<GrantedAuthority> authorities = Stream.concat(defaultGrantedAuthoritiesConverter.convert(source)
                                .stream(),
                        extractResourceRoles(source).stream())
                .collect(Collectors.toSet());
        return new JwtAuthenticationToken(source, authorities);
    }
}