package com.example.productapp.validators;

import com.example.productapp.dto.UserDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {

    private static final Logger logger = LoggerFactory.getLogger(UserValidator.class);

    @Override
    public boolean supports(Class<?> clazz) {
        return UserDTO.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        UserDTO user = (UserDTO) target;

        logger.info("Starting validation for user: {}", user);

        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "username", "username.empty", "Username is required.");

        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "password", "password.empty", "Password is required.");

        if (user.getUsername() != null && user.getUsername().length() < 3) {
            errors.rejectValue("username", "username.tooShort", "Username must be at least 3 characters long.");
        }

        if (user.getPassword() != null && user.getPassword().length() < 6) {
            errors.rejectValue("password", "password.tooShort", "Password must be at least 6 characters long.");
        }

        if (user.getPassword() != null && !user.getPassword().matches(".*[A-Z].*") && !user.getPassword().matches(".*\\d.*")) {
            errors.rejectValue("password", "password.weak", "Password must contain at least one uppercase letter and one number.");
        }
    }
}