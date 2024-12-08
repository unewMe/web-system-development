package com.example.productapp.service;

import com.example.productapp.dto.ProductDTO;
import com.example.productapp.entity.Product;
import com.example.productapp.mapper.ProductMapper;
import com.example.productapp.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(ProductMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product product) {
        Optional<Product> existingProductOpt = productRepository.findById(id);

        if (existingProductOpt.isPresent()) {
            Product existingProduct = existingProductOpt.get();

            existingProduct.setName(product.getName());
            existingProduct.setWeight(product.getWeight());
            existingProduct.setPrice(product.getPrice());
            existingProduct.setCategory(product.getCategory());

            return productRepository.save(existingProduct);
        } else {
            throw new RuntimeException("Product with id " + id + " not found");
        }
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

}
