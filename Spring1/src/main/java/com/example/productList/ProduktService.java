package com.example.productList;

import com.example.productList.Produkt;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProduktService {

    private final List<Produkt> productList = new ArrayList<>();

    public ProduktService() {
        seed();
    }

    public void seed() {
        productList.add(new Produkt(1L, "Chleb", 1.0, 5.20, "Pieczywo"));
        productList.add(new Produkt(2L, "Masło", 0.25, 7.00, "Nabiał"));
        productList.add(new Produkt(3L, "Mleko", 1.0, 3.50, "Nabiał"));
    }

    public List<Produkt> getAllProducts() {
        return new ArrayList<>(productList);
    }

    public boolean addProduct(Produkt produkt) {
        if (getProductById(produkt.getId()) != null) {
            return false;
        }
        productList.add(produkt);
        return true;
    }

    public Produkt getProductById(Long id) {
        for (Produkt produkt : productList) {
            if (produkt.getId().equals(id)) {
                return produkt;
            }
        }
        return null;
    }

    public boolean updateProduct(Produkt produkt) {
        Produkt existingProduct = getProductById(produkt.getId());
        if (existingProduct != null) {
            productList.remove(existingProduct);
            productList.add(produkt);
            return true;
        }
        return false;
    }

    public boolean deleteProduct(Produkt produkt) {
        return productList.removeIf(existingProduct -> existingProduct.getId().equals(produkt.getId()));
    }

    public boolean deleteProductById(Long id) {
        return productList.removeIf(product -> product.getId().equals(id));
    }
}
