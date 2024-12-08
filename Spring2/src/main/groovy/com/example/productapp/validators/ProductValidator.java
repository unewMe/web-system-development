package com.example.productapp.validators;

import com.example.productapp.entity.Product;
import com.example.productapp.service.CategoryService;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

@Component
public class ProductValidator implements Validator {

    private final CategoryService categoryService;

    public ProductValidator(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return Product.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Product product = (Product) target;


        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "name", "name.empty", "Product name is required.");


        if (product.getPrice() < 0) {
            errors.rejectValue("price", "price.negative", "Price cannot be negative.");
        }


        if (product.getWeight() <= 0) {
            errors.rejectValue("weight", "weight.invalid", "Weight must be a positive value.");
        }


        if (product.getIndex() <= 0) {
            errors.rejectValue("index", "index.invalid", "Index must be a positive integer.");
        }


        if (product.getCategory() != null &&
                categoryService.getAllCategories().stream()
                        .noneMatch(category -> category.getId().equals(product.getCategory().getId()))) {
            errors.rejectValue("category", "category.invalid", "Category must exist.");
        }

    }
}
