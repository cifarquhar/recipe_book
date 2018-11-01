package com.codeclan.example.recipes_api.projection;

import com.codeclan.example.recipes_api.model.Category;
import com.codeclan.example.recipes_api.model.Recipe;
import org.springframework.data.rest.core.config.Projection;

import java.util.HashMap;
import java.util.List;

@Projection(name = "recipeProjection", types = Recipe.class)
public interface RecipeProjection {
    String getName();
    String getDescription();
    Category getCategory();
    int getServings();
    int getPrepTime();
    int getCookTime();
    HashMap<Integer, String> getMethod();
    List<PairingProjection> getPairings();
}
