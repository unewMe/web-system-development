package com.example.productList;

import org.springframework.stereotype.Controller;

import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;

import java.util.Date;

import java.util.List;

import java.util.Locale;

@Controller

public class ProduktController {

    private final ProduktService produktService;

    public ProduktController(ProduktService produktService) {

        this.produktService = produktService;

    }

    @GetMapping("/")
    public String home() {
        return "redirect:/produkt/";
    }

    @GetMapping("/produkt/")
    public String home(Locale locale, Model model) {

        Date date = new Date();

        DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG,

                DateFormat.LONG, locale);

        String serverTime = dateFormat.format(date);

        model.addAttribute("serverTime", serverTime.toString() );

        List<Produkt> produktList = produktService.getAllProducts();

        model.addAttribute("produktList", produktList );

        return "produkt/index";
    }

    @GetMapping("/produkt/add")
    public String addForm(Model model) {
        model.addAttribute("produkt", new Produkt());
        return "produkt/add";
    }

    @PostMapping("/produkt/add")
    public String addProduct(@ModelAttribute Produkt produkt) {
        produktService.addProduct(produkt);
        return "redirect:/produkt/";
    }

    @GetMapping("/produkt/delete/{id}")
    public String removeProduct(@PathVariable long id) {
        Produkt produkt = produktService.getProductById(id);
        if (produkt != null) {
            produktService.deleteProduct(produkt);
        }
        return "redirect:/produkt/";
    }

    @GetMapping("/produkt/edit/{id}")
    public String editForm(Model model, @PathVariable long id) {
        Produkt produkt = produktService.getProductById(id);
        if (produkt != null) {
            model.addAttribute("produkt", produkt);
            return "produkt/edit";
        }
        return "redirect:/produkt/";
    }

    @PostMapping("/produkt/edit/{id}")
    public String editProduct(@PathVariable long id, @ModelAttribute Produkt produkt) {
        produkt.setId(id);
        produktService.updateProduct(produkt);
        return "redirect:/produkt/";
    }


    @GetMapping("/produkt/{id}")
    public String details(Model model, @PathVariable long id) {
        Produkt produkt = produktService.getProductById(id);
        if (produkt != null) {
            model.addAttribute("produkt", produkt);
            return "produkt/details";
        }
        return "redirect:/produkt/";
    }








}