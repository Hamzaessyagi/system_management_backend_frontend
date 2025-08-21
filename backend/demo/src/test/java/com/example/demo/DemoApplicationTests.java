package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(locations = "classpath:application.properties")
class DemoApplicationTests {

    @Test
    void contextLoads() {
        // Ce test vérifie que le contexte Spring se charge correctement
        System.out.println("✅ Test de chargement du contexte réussi!");
    }

    @Test
    void applicationStarts() {
        // Test simple pour vérifier que l'application démarre
        assert true;
        System.out.println("✅ Test de démarrage de l'application réussi!");
    }
}