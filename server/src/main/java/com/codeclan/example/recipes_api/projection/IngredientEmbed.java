package com.codeclan.example.recipes_api.projection;

import com.codeclan.example.recipes_api.model.Ingredient;
import com.codeclan.example.recipes_api.model.ServingType;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "ingredientEmbed", types = Ingredient.class)
public interface IngredientEmbed {
    String getName();
    ServingType getServingType();

}
