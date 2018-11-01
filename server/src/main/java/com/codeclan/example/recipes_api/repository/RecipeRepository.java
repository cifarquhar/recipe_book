package com.codeclan.example.recipes_api.repository;

import com.codeclan.example.recipes_api.model.Recipe;
import com.codeclan.example.recipes_api.projection.RecipeProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = RecipeProjection.class)
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}
