package com.scpm.inmemory.scpminmemory.userService.registrations.controllers;

import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    @PostMapping("/oauth2/token")
    public ResponseEntity<?> exchangeCode(@RequestBody Map<String, String> body) {
        String code = body.get("code");
        String redirectUri = body.get("redirectUri");

        RestTemplate restTemplate = new RestTemplate();

        // Create headers with Basic Auth
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // Add Basic Authentication header
        String auth = "abhi" + ":" + "abhi123";
        byte[] encodedAuth = Base64.getEncoder().encode(auth.getBytes(StandardCharsets.UTF_8));
        String authHeader = "Basic " + new String(encodedAuth);
        headers.add("Authorization", authHeader);

        // Create form parameters
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("code", code);
        params.add("redirect_uri", redirectUri);

        // Don't include client_id and client_secret in body when using Basic Auth
        // They're already in the Authorization header

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(
                    "http://localhost:8080/oauth2/token",
                    request,
                    Map.class
            );

            return ResponseEntity.ok(response.getBody());
        } catch (HttpClientErrorException e) {
            // Log the error details
            System.err.println("Token exchange failed: " + e.getResponseBodyAsString());
            throw e;
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            // Return user details
            return ResponseEntity.ok(authentication.getPrincipal());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/session-info")
    public ResponseEntity<?> getSessionInfo(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            return ResponseEntity.ok(authentication.getPrincipal());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"authenticated\": false}");
    }

    @PostMapping("/check-session")
    public ResponseEntity<?> checkSession(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            return ResponseEntity.ok().body("{\"authenticated\": true}");
        }
        return ResponseEntity.ok().body("{\"authenticated\": false}");
    }

    // Add this endpoint to manually check session
    @GetMapping("/check-auth")
    public ResponseEntity<?> checkAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() &&
                !(authentication.getPrincipal() instanceof String)) {
            return ResponseEntity.ok().body("{\"authenticated\": true}");
        }
        return ResponseEntity.ok().body("{\"authenticated\": false}");
    }
}