package com.example.portfolio_backend.controller;

import com.example.portfolio_backend.entnty.ContactMessage;
import com.example.portfolio_backend.repository.ContactMessageRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactMessageRepository repository;

    public ContactController(ContactMessageRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<String> submitContact(
            @RequestBody ContactMessage contact) {

        if (contact.getName() == null
                || contact.getName().isBlank()
                || contact.getEmail() == null
                || contact.getEmail().isBlank()
                || contact.getMessage() == null
                || contact.getMessage().isBlank()) {

            return ResponseEntity.badRequest()
                    .body("Please fill in all fields.");
        }

        try {
            ContactMessage saved = repository.save(contact);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Message saved successfully. ID: " + saved.getId());

        } catch (Exception e) {
            // Actual error ko Render logs mein dekho.
            System.err.println("Failed to save contact message:");
            e.printStackTrace();

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save message. Check backend logs.");
        }
    }
}