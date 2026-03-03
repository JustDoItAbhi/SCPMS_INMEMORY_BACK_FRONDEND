package com.scpm.inmemory.scpminmemory.userService.config;

import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.crypto.RSASSASigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.scpm.inmemory.scpminmemory.userService.registrations.security.customization.CustomUsersDetails;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;


import java.security.interfaces.RSAPrivateKey;
import java.util.Date;
import java.util.stream.Collectors;
@Service
public class JwtTokenService {

    private final RSAPrivateKey privateKey;

    // Only need private key for signing tokens
    public JwtTokenService(RSAPrivateKey privateKey) {
        this.privateKey = privateKey;
    }

    public String generateToken(CustomUsersDetails userDetails) {
        try {
            JWSSigner signer = new RSASSASigner(privateKey);

            String authorities = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.joining(","));

            JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                    .subject(userDetails.getUsername())
                    .claim("id", userDetails.getUserId())
                    .claim("email", userDetails.getUserEmail())
                    .claim("roles", userDetails.getAuthorities().stream()
                            .map(GrantedAuthority::getAuthority)
                            .collect(Collectors.toList()))
                    .issuer("user-service")
                    .issueTime(new Date())
                    .expirationTime(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                    .build();

            SignedJWT signedJWT = new SignedJWT(
                    new JWSHeader.Builder(JWSAlgorithm.RS256).build(),
                    claimsSet);

            signedJWT.sign(signer);
            return signedJWT.serialize();

        } catch (Exception e) {
            throw new RuntimeException("Error generating JWT token", e);
        }
    }
}