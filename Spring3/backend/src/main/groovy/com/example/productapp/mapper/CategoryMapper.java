package com.example.productapp.mapper;

import com.example.productapp.dto.CategoryDTO;
import com.example.productapp.entity.Category;

public class CategoryMapper {

    public static CategoryDTO toDTO(Category category) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setCode(category.getCode());
        return dto;
    }

    public static Category toEntity(CategoryDTO dto) {
        Category category = new Category();
        category.setId(dto.getId());
        category.setName(dto.getName());
        category.setCode(dto.getCode());
        return category;
    }
}
