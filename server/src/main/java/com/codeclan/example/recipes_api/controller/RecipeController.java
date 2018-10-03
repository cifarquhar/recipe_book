package com.codeclan.example.recipes_api.controller;

import com.codeclan.example.recipes_api.model.Recipe;
import com.codeclan.example.recipes_api.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @GetMapping("/recipes")
    @CrossOrigin(origins = "http://localhost:3000")
    public Page<Recipe> getRecipes(Pageable pageable){
        return recipeRepository.findAll(pageable);
    }

}
