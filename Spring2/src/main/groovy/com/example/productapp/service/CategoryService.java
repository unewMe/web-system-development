package com.example.productapp.service;

import com.example.productapp.entity.Category;
import com.example.productapp.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
//TODO: categories should be returned without products
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category updateCategory(Long id, Category category) {
        Optional<Category> existingCategoryOpt = categoryRepository.findById(id);

        // Check if the category exists
        if (existingCategoryOpt.isPresent()) {
            Category existingCategory = existingCategoryOpt.get();

            // Update the category's fields with the new data
            existingCategory.setName(category.getName());
            existingCategory.setCode(category.getCode());

            // Save the updated category
            return categoryRepository.save(existingCategory);
        } else {
            // Handle the case when the category is not found, e.g. throw an exception
            throw new RuntimeException("Category with id " + id + " not found");
        }
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
