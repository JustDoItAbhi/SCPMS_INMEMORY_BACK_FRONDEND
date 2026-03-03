package com.scpm.inmemory.scpminmemory.userService.config;//package userService.registrations.config;
//
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@RestController
//public class EnvDebugController {
//
//    @GetMapping("/env")
//    public Map<String, String> getEnv() {
//        Map<String, String> env = new HashMap<>();
//        env.put("DATABASE_URL", System.getenv("DATABASE_URL"));
//        env.put("MYSQLHOST", System.getenv("MYSQLHOST"));
//        env.put("MYSQLPORT", System.getenv("MYSQLPORT"));
//        env.put("MYSQLDATABASE", System.getenv("MYSQLDATABASE"));
//        env.put("MYSQLUSER", System.getenv("MYSQLUSER"));
//        env.put("MYSQLPASSWORD", System.getenv("MYSQLPASSWORD") != null ? "***" : "null");
//        return env;
//    }
//}