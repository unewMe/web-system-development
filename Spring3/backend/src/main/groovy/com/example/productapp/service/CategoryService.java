package com.example.productapp.service;

import com.example.productapp.dto.CategoryDTO;
import com.example.productapp.entity.Category;
import com.example.productapp.mapper.CategoryMapper;
import com.example.productapp.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(CategoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category updateCategory(Long id, Category category) {
        Optional<Category> existingCategoryOpt = categoryRepository.findById(id);

        if (existingCategoryOpt.isPresent()) {
            Category existingCategory = existingCategoryOpt.get();

            existingCategory.setName(category.getName());
            existingCategory.setCode(category.getCode());

            return categoryRepository.save(existingCategory);
        } else {
            throw new RuntimeException("Category with id " + id + " not found");
        }
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category with id " + id + " not found"));
    }
}
