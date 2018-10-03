package com.codeclan.example.recipes_api.controller;

import com.codeclan.example.recipes_api.model.Ingredient;
import com.codeclan.example.recipes_api.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IngredientController {

    @Autowired
    private IngredientRepository ingredientRepository;

    @GetMapping("/ingredients")
    @CrossOrigin(origins = "http://localhost:3000")
    public Page<Ingredient> getIngredients(Pageable pageable){
        return ingredientRepository.findAll(pageable);
    }

}
