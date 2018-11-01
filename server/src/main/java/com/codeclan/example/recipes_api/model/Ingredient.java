package com.codeclan.example.recipes_api.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ingredients")
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column
    private String name;

    @NotNull
    @Column
    private ServingType servingType;

    @OneToMany(mappedBy = "ingredient", fetch = FetchType.LAZY)
    private List<Pairing> pairings;


    public Ingredient(){

    }

    public Ingredient(@NotNull String name, @NotNull ServingType servingType) {
        this.name = name;
        this.servingType = servingType;
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

    public ServingType getServingType() {
        return servingType;
    }

    public void setServingType(ServingType servingType) {
        this.servingType = servingType;
    }

    public List<Pairing> getPairings() {
        return pairings;
    }

    public void setPairings(List<Pairing> pairings) {
        this.pairings = pairings;
    }
}
