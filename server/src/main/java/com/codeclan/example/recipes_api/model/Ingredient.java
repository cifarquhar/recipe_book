package com.codeclan.example.recipes_api.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ingredients")
public class Ingredient {

    @Id
    @GeneratedValue(generator = "ingredient_generator")
    @SequenceGenerator(
            name = "ingredient_generator",
            sequenceName = "ingredient_sequence",
            initialValue = 1
    )
    private Long id;

    @NotNull
    @Column
    private String name;

    @NotNull
    @Column
    private ServingType servingType;

    @ManyToMany
    @JoinTable(name = "ingredients_in_recipe",
            joinColumns = {
                    @JoinColumn(name = "ingredient_id", nullable = false, updatable = false)
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "recipe_id", nullable = false, updatable = false)
            })
    private List<Recipe> recipes;


    public Ingredient(){

    }

    public Ingredient(@NotNull String name, @NotNull ServingType servingType) {
        this.name = name;
        this.servingType = servingType;
        this.recipes = new ArrayList<>();
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

    public ServingType getServingType() {
        return servingType;
    }

    public void setServingType(ServingType servingType) {
        this.servingType = servingType;
    }

    public List<Recipe> getRecipes() {
        return recipes;
    }

    public void setRecipes(List<Recipe> recipes) {
        this.recipes = recipes;
    }
}
