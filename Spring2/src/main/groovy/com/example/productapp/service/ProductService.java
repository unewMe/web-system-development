package com.example.productapp.service;

import com.example.productapp.entity.Product;
import com.example.productapp.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product product) {
        Optional<Product> existingProductOpt = productRepository.findById(id);

        // Check if the product exists
        if (existingProductOpt.isPresent()) {
            Product existingProduct = existingProductOpt.get();

            // Update the product's fields with the new data
            existingProduct.setName(product.getName());
            existingProduct.setWeight(product.getWeight());
            existingProduct.setPrice(product.getPrice());
            existingProduct.setCategory(product.getCategory());

            // Save the updated product
            return productRepository.save(existingProduct);
        } else {
            // Handle the case when the product is not found, e.g. throw an exception
            throw new RuntimeException("Product with id " + id + " not found");
        }
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
