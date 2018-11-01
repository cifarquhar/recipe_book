package com.codeclan.example.recipes_api.controller;

import com.codeclan.example.recipes_api.repository.PairingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/pairings")
public class PairingController {

    @Autowired
    PairingRepository pairingRepository;
}
