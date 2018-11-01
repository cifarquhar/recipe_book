package com.codeclan.example.recipes_api.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Entity
@Table(name = "recipes")
public class Recipe implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY)
    private List<Pairing> pairings;

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
        this.pairings = new ArrayList<>();
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

    public List<Pairing> getPairings() {
        return pairings;
    }

    public void setPairings(ArrayList<Pairing> pairings) {
        this.pairings = pairings;
    }

    public HashMap<Integer, String> getMethod() {
        return method;
    }

    public void setMethod(HashMap<Integer, String> method) {
        this.method = method;
    }
}
