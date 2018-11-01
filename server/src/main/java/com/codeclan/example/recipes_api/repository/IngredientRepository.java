package com.codeclan.example.recipes_api.repository;

import com.codeclan.example.recipes_api.model.Ingredient;
import com.codeclan.example.recipes_api.projection.IngredientProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = IngredientProjection.class)
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
}
