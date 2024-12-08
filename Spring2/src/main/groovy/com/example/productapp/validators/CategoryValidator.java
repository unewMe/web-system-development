package com.example.productapp.validators;

import com.example.productapp.dto.CategoryDTO;
import com.example.productapp.entity.Category;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

@Component
public class CategoryValidator implements Validator {

    private static final Logger logger = LoggerFactory.getLogger(CategoryValidator.class);


    @Override
    public boolean supports(Class<?> clazz) {
        return CategoryDTO.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        CategoryDTO category = (CategoryDTO) target;

        logger.info("Starting validation for category: {}", category);

        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "name", "name.empty", "Category name is required.");

        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "code", "code.empty", "Category code is required.");

        if (category.getCode() != null && !category.getCode().matches("^[A-Z]\\d+$")) {
            errors.rejectValue("code", "code.invalid", "Category code must start with an uppercase letter followed by digits (e.g., K1, N2).");
        }
    }
}
