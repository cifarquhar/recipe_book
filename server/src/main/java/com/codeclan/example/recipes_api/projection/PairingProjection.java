package com.codeclan.example.recipes_api.projection;

import com.codeclan.example.recipes_api.model.Ingredient;
import com.codeclan.example.recipes_api.model.Pairing;
import com.codeclan.example.recipes_api.model.Recipe;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(name = "pairingProjection", types = Pairing.class)
public interface PairingProjection {
    int getQuantity();
    List<Ingredient> getIngredient();
    List<Recipe> getRecipe();
}
