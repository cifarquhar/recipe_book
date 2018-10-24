package com.codeclan.example.recipes_api.controller;

import com.codeclan.example.recipes_api.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/ingredients")
public class IngredientController {

    @Autowired
    private IngredientRepository ingredientRepository;

}
