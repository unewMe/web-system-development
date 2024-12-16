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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserService userService, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO) {
        try {
            // Authenticate the user

           authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userDTO.getUsername(),
                            userDTO.getPassword()
                    )
            );


            // Retrieve user details



            User user = userService.findByUsername(userDTO.getUsername());

            String password = passwordEncoder.encode(userDTO.getPassword());

            System.out.println("aaa" + password);
            System.out.println(user);

            if (!passwordEncoder.matches(userDTO.getPassword(), user.getPassword())) {
                throw new Error("");
            }

            // Prepare claims (you can add more claims if needed)
            Map<String, Object> claims = new HashMap<>();
            claims.put("role", user.getRole().name());

            // Generate JWT token
            String token = jwtUtils.generateToken(user.getUsername(), claims);

            // Return the token in the response
            return ResponseEntity.ok(Map.of("token", token));
        } catch (Exception e) {
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
        newUser.setPassword(userDTO.getPassword()); // Encode the password
        newUser.setRole(User.Role.valueOf(userDTO.getRole().toUpperCase()));

        userService.saveUser(newUser);
        return ResponseEntity.ok("User registered successfully");
    }

    // Optional: Since JWT is stateless, logout can be handled on the client side by discarding the token
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // Optionally implement token blacklisting if needed
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logout successful");
    }
}
