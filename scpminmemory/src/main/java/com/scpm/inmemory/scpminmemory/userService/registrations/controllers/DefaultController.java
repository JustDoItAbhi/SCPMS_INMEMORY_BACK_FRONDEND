package com.scpm.inmemory.scpminmemory.userService.registrations.controllers;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Controller
public class DefaultController implements ErrorController {


        private static final Logger logger = LoggerFactory.getLogger(DefaultController.class);

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        // Invalidate session
        request.getSession().invalidate();

        // Clear the authentication cookie
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        // If using remember-me cookie
        Cookie rememberMeCookie = new Cookie("remember-me", null);
        rememberMeCookie.setPath("/");
        rememberMeCookie.setHttpOnly(true);
        rememberMeCookie.setMaxAge(0);
        response.addCookie(rememberMeCookie);

        return ResponseEntity.ok().body(Map.of("message", "Logged out successfully"));
    }
        @GetMapping("/.well-known/appspecific/com.chrome.devtools.json")
        public ResponseEntity<Map<String, String>> chromeCheck() {
            logger.info("Chrome devtools well-known endpoint called");
            Map<String, String> response = Map.of(
                    "status", "ok",
                    "message", "Chrome DevTools configuration"
            );
            return ResponseEntity.ok(response);
        }

//    private static final Logger logger = LoggerFactory.getLogger(DefaultController.class);
    @GetMapping("/error")
    public String error() {
        return "Error page";
    }
    // Only handle error dispatches, not direct requests
//    @RequestMapping("/error")
//    public ResponseEntity<Map<String, Object>> handleError(HttpServletRequest request) {
//        // Check if this is a real error dispatch or a direct request
//        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
//        String errorPath = (String) request.getAttribute("javax.servlet.error.request_uri");
//
//        // If it's not an error dispatch (no status code), treat as 404
//        if (statusCode == null) {
//            statusCode = 404;
//            errorPath = request.getRequestURI();
//        }
//
//        Map<String, Object> errorDetails = new HashMap<>();
//        errorDetails.put("timestamp", Instant.now());
//        errorDetails.put("status", statusCode);
//        errorDetails.put("error", statusCode == 404 ? "Not Found" : "Error");
//        errorDetails.put("message", "The requested resource was not found");
//        errorDetails.put("path", errorPath);
//
//        logger.warn("Error handled for path: {} with status: {}", errorPath, statusCode);
//        return new ResponseEntity<>(errorDetails, HttpStatus.valueOf(statusCode));
//    }

        private HttpStatus getHttpStatus(HttpServletRequest request) {
            Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
            if (statusCode != null) {
                return HttpStatus.valueOf(statusCode);
            }
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }

        private int getErrorStatus(HttpServletRequest request) {
            Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
            return statusCode != null ? statusCode : 500;
        }

        private String getOriginalUrl(HttpServletRequest request) {
            return (String) request.getAttribute("javax.servlet.error.request_uri");
        }
    }
