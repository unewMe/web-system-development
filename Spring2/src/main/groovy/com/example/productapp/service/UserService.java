package com.example.productapp.service;

import com.example.productapp.dto.UserDTO;
import com.example.productapp.entity.User;
import com.example.productapp.mapper.UserMapper;
import com.example.productapp.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserMapper::toDTO)
                .collect(Collectors.toList());
    }

    public User saveUser(User user) {
        // Hashowanie hasła przed zapisem
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User updateUser(Long id, User user) {
        Optional<User> existingUserOpt = userRepository.findById(id);

        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();

            existingUser.setUsername(user.getUsername());
            // Hashowanie hasła tylko jeśli jest zmienione
            if (!existingUser.getPassword().equals(user.getPassword())) {
                existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
            }
            existingUser.setRole(user.getRole());

            return userRepository.save(existingUser);
        } else {
            throw new RuntimeException("User with id " + id + " not found");
        }
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

}
