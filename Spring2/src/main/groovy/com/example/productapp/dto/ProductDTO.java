package com.example.productapp.dto;

import lombok.Data;

@Data
public class ProductDTO {
    private Long id;
    private String name;
    private double weight;
    private double price;
    private int index;
    private Long categoryId;
    private String categoryName;
}
