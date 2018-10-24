package com.codeclan.example.recipes_api.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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
    private Category category;

    @Column
    private String description;

    @Column
    private int servings;

    @Column
    private int prepTime;

    @Column
    private int cookTime;

    @ManyToMany
    @JoinTable(name = "ingredients_in_recipe",
                joinColumns = {
                    @JoinColumn(name = "recipe_id", nullable = false, updatable = false)
                },
                inverseJoinColumns = {
                    @JoinColumn(name = "ingredient_id", nullable = false, updatable = false)
                })
    private List<Ingredient> ingredients;

    @Column
    private HashMap<Integer, String> method;


    public Recipe() {
    }

    public Recipe(@NotNull String name, Category category, String description, int servings, int prepTime, int cookTime, HashMap<Integer, String> method) {
        this.name = name;
        this.category = category;
        this.description = description;
        this.servings = servings;
        this.prepTime = prepTime;
        this.cookTime = cookTime;
        this.method = method;
        this.ingredients = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public HashMap<Integer, String> getMethod() {
        return method;
    }

    public void setMethod(HashMap<Integer, String> method) {
        this.method = method;
    }
}
