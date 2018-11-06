package com.codeclan.example.recipes_api.config;

import com.codeclan.example.recipes_api.model.Ingredient;
import com.codeclan.example.recipes_api.model.Pairing;
import com.codeclan.example.recipes_api.model.Recipe;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

@Configuration
public class SpringDataRestConfig extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config){
        config.exposeIdsFor(Ingredient.class, Recipe.class, Pairing.class);
    }

}
