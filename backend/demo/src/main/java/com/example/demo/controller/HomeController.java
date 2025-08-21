package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("message", "Bienvenue dans votre première application Spring Boot!");
        model.addAttribute("titre", "Page d'accueil");
        return "index";
    }

    @GetMapping("/about")
    public String about(Model model) {
        model.addAttribute("message", "À propos de notre application");
        model.addAttribute("titre", "À propos");
        model.addAttribute("description", "Cette application démontre les bases de Spring Boot avec Thymeleaf.");
        return "index";
    }

    @PostMapping("/contact")
    public String contact(@RequestParam String nom, @RequestParam String email, Model model) {
        model.addAttribute("message", "Merci " + nom + "! Votre message a été reçu.");
        model.addAttribute("titre", "Contact envoyé");
        model.addAttribute("email", email);
        return "index";
    }
}