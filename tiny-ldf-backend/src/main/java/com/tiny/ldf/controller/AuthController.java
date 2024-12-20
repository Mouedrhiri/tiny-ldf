package com.tiny.ldf.controller;
import com.tiny.ldf.dto.UserLoginRequest;
import com.tiny.ldf.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequest request) {
        if ("admin".equals(request.getUsername()) && "password".equals(request.getPassword())) {
            String token = jwtUtil.generateToken(request.getUsername());
            return ResponseEntity.ok("{\"token\": \"" + token + "\"}");
        }
        return ResponseEntity.status(401).body("Unauthorized: Invalid credentials");
    }
}

