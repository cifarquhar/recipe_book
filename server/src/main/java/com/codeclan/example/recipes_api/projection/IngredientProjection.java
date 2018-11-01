package com.codeclan.example.recipes_api.projection;

import com.codeclan.example.recipes_api.model.Ingredient;
import com.codeclan.example.recipes_api.model.ServingType;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(name = "ingredientProjection", types = Ingredient.class)
public interface IngredientProjection {
    String getName();
    ServingType getServingType();
    List<PairingProjection> getPairings();
}
