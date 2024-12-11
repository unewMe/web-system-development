package com.example.productapp.controller;

import com.example.productapp.dto.UserDTO;
import com.example.productapp.entity.User;
import com.example.productapp.security.JwtUtils;
import com.example.productapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtils jwtUtils;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserService userService, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userDTO.getUsername(), userDTO.getPassword())
            );
            
            User user = userService.findByUsername(userDTO.getUsername());
            if (user == null) {
                return ResponseEntity.status(401).body("Invalid username or password");
            }

            Map<String, Object> claims = new HashMap<>();
            claims.put("role", user.getRole());

            String token = jwtUtils.generateToken(user.getUsername(), claims);
            return ResponseEntity.ok(Map.of("token", token));

        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO) {
        if (userService.findByUsername(userDTO.getUsername()) != null) {
            return ResponseEntity.status(409).body("Username already exists");
        }

        User newUser = new User();
        newUser.setUsername(userDTO.getUsername());
        newUser.setPassword(userDTO.getPassword());
        newUser.setRole(User.Role.valueOf(userDTO.getRole()));

        userService.saveUser(newUser);
        return ResponseEntity.ok("User registered successfully");
    }
}
