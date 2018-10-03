package com.codeclan.example.recipes_api.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
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
    private String servingType;

    @ManyToMany(mappedBy = "ingredients")
    private List<Recipe> recipes;


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

    public String getServingType() {
        return servingType;
    }

    public void setServingType(String servingType) {
        this.servingType = servingType;
    }

    public List<Recipe> getRecipes() {
        return recipes;
    }

    public void setRecipes(List<Recipe> recipes) {
        this.recipes = recipes;
    }
}
