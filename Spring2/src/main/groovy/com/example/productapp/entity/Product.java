package com.example.productapp.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double weight;

    private double price;

    private int index;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
