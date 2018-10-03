package com.codeclan.example.recipes_api.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashMap;

@Entity
@Table(name = "recipes")
public class Recipe {

    @Id
    @GeneratedValue(generator = "recipe_generator")
    @SequenceGenerator(
            name = "recipe_generator",
            sequenceName = "recipe_sequence",
            initialValue = 1
    )
    private Long id;

    @NotNull
    @Column
    private String name;

    @Column
    private String category;

    @Column
    private String description;

    @Column
    private int servings;

    @Column
    private int prepTime;

    @Column
    private int cookTime;

    @Column
    private HashMap<Ingredient, Integer> ingredients;

    @Column
    private HashMap<Integer, String> method;


    public Long getId() {
        return id;
    }

    ;

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getServings() {
        return servings;
    }

    public void setServings(int servings) {
        this.servings = servings;
    }

    public int getPrepTime() {
        return prepTime;
    }

    public void setPrepTime(int prepTime) {
        this.prepTime = prepTime;
    }

    public int getCookTime() {
        return cookTime;
    }

    public void setCookTime(int cookTime) {
        this.cookTime = cookTime;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public HashMap<Ingredient, Integer> getIngredients() {
        return ingredients;
    }

    public void setIngredients(HashMap<Ingredient, Integer> ingredients) {
        this.ingredients = ingredients;
    }

    public HashMap<Integer, String> getMethod() {
        return method;
    }

    public void setMethod(HashMap<Integer, String> method) {
        this.method = method;
    }
}
