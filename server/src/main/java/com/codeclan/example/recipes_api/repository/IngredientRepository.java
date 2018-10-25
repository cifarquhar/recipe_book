package com.codeclan.example.recipes_api.repository;

import com.codeclan.example.recipes_api.model.Ingredient;
import com.codeclan.example.recipes_api.projection.IngredientEmbed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = IngredientEmbed.class)
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
}
