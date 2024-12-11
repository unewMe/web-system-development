package com.example.productapp.controller;

import com.example.productapp.dto.CategoryDTO;
import com.example.productapp.entity.Category;
import com.example.productapp.mapper.CategoryMapper;
import com.example.productapp.service.CategoryService;
import com.example.productapp.validators.CategoryValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    private final Logger log = LoggerFactory.getLogger(this.getClass());

    private final CategoryService categoryService;
    @Autowired
    private final CategoryValidator categoryValidator;

    public CategoryController(CategoryService categoryService, CategoryValidator categoryValidator) {
        this.categoryService = categoryService;
        this.categoryValidator = categoryValidator;
    }

    @InitBinder
    protected void initBinder(WebDataBinder binder) {
        binder.addValidators(categoryValidator);
    }

    @GetMapping
    public List<CategoryDTO> getAllCategories() {
        return categoryService.getAllCategories();
    }


    @PostMapping
    public ResponseEntity<?> createCategory(@RequestBody @Validated CategoryDTO categoryDTO, BindingResult result) {
        log.info("Creating category: {}", categoryDTO);
        log.info("Binding result: {}", result);

        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }

        Category category = CategoryMapper.toEntity(categoryDTO);
        Category savedCategory = categoryService.saveCategory(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(CategoryMapper.toDTO(savedCategory));
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable("id") Long id, @RequestBody @Validated CategoryDTO categoryDTO, BindingResult result) {
        if(categoryService.getAllCategories().stream().noneMatch(c -> c.getId().equals(id))){
            return ResponseEntity.badRequest().body("Category with id " + id + " not found");
        }
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }
        Category category = CategoryMapper.toEntity(categoryDTO);
        Category updatedCategory = categoryService.saveCategory(category);
        return ResponseEntity.ok(CategoryMapper.toDTO(updatedCategory));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable("id") Long id) {
        if(categoryService.getAllCategories().stream().noneMatch(c -> c.getId().equals(id))){
            return ResponseEntity.badRequest().body("Category with id " + id + " not found");
        }
        categoryService.deleteCategory(id);
        return ResponseEntity.ok().body("Category with id " + id + " deleted");
    }
}
