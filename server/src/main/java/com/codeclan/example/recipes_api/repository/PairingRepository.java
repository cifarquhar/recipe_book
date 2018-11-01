package com.codeclan.example.recipes_api.repository;

import com.codeclan.example.recipes_api.model.Pairing;
import com.codeclan.example.recipes_api.projection.PairingProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = PairingProjection.class)
public interface PairingRepository extends JpaRepository<Pairing, Long> {
}
