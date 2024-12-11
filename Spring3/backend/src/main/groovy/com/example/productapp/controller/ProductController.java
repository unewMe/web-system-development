package com.example.productapp.controller;

import com.example.productapp.dto.ProductDTO;
import com.example.productapp.entity.Category;
import com.example.productapp.entity.Product;
import com.example.productapp.mapper.ProductMapper;
import com.example.productapp.service.CategoryService;
import com.example.productapp.service.ProductService;
import com.example.productapp.validators.CategoryValidator;
import com.example.productapp.validators.ProductValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;
    private final CategoryService categoryService;
    @Autowired
    private final ProductValidator productValidator;

    public ProductController(ProductService productService, CategoryService categoryService ,ProductValidator productValidator) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.productValidator = productValidator;
    }

    @InitBinder
    protected void initBinder(WebDataBinder binder) {
        binder.addValidators(productValidator);
    }

    @GetMapping
    public List<ProductDTO> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody @Validated ProductDTO productDTO, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }

        Category category = null;
        if (productDTO.getCategoryId() != null) {
            category = categoryService.getCategoryById(productDTO.getCategoryId());
        }
        Product product = ProductMapper.toEntity(productDTO, category);
        Product savedProduct = productService.saveProduct(product);

        return ResponseEntity.status(HttpStatus.CREATED).body(ProductMapper.toDTO(savedProduct));
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable("id") Long id, @RequestBody @Validated ProductDTO productDTO, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors());
        }

        if (productService.getAllProducts().stream().noneMatch(p -> p.getId().equals(id))) {
            return ResponseEntity.badRequest().body("Product with id " + id + " not found");
        }

        Category category = null;
        if (productDTO.getCategoryId() != null) {
            category = categoryService.getCategoryById(productDTO.getCategoryId());
        }
        Product product = ProductMapper.toEntity(productDTO, category);
        product.setId(id);
        Product updatedProduct = productService.updateProduct(id, product);

        return ResponseEntity.ok(ProductMapper.toDTO(updatedProduct));
    }




    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable("id") Long id) {
        if(productService.getAllProducts().stream().noneMatch(p -> p.getId().equals(id))){
            return ResponseEntity.badRequest().body("Product with id " + id + " not found");
        }
        productService.deleteProduct(id);
        return ResponseEntity.ok().body("Product with id " + id + " deleted");
    }
}
