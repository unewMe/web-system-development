package com.example.productapp.mapper;

import com.example.productapp.dto.UserDTO;
import com.example.productapp.entity.User;

public class UserMapper {

    public static UserDTO toDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setUsername(user.getUsername());
        dto.setPassword(user.getPassword());
        dto.setRole(user.getRole().name()); // Mapowanie roli na String
        return dto;
    }

    public static User toEntity(UserDTO dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        user.setRole(User.Role.valueOf(dto.getRole())); // Mapowanie roli ze String na Enum
        return user;
    }
}
