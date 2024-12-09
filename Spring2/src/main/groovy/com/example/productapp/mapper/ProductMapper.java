package com.example.productapp.mapper;

import com.example.productapp.dto.ProductDTO;
import com.example.productapp.entity.Category;
import com.example.productapp.entity.Product;

public class ProductMapper {
    public static ProductDTO toDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setWeight(product.getWeight());
        dto.setPrice(product.getPrice());
        dto.setIndex(product.getIndex());
        if (product.getCategory() != null) {
            dto.setCategoryId(product.getCategory().getId());
            dto.setCategoryName(product.getCategory().getName());
        }
        return dto;
    }

    public static Product toEntity(ProductDTO dto, Category category) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setWeight(dto.getWeight());
        product.setPrice(dto.getPrice());
        product.setIndex(dto.getIndex());
        if (category != null) {
            product.setCategory(category);
        }
        return product;
    }
}
