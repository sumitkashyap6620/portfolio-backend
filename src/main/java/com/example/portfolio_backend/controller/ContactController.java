package com.example.portfolio_backend.controller;

import com.example.portfolio_backend.entnty.ContactMessage;
import com.example.portfolio_backend.repository.ContactMessageRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = {
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://127.0.0.1:5501",
        "http://localhost:5501"
})
public class ContactController {

    private final ContactMessageRepository repository;

    public ContactController(ContactMessageRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<?> submitContact(
            @RequestBody ContactMessage contact) {

        if (contact.getName() == null ||
                contact.getName().isBlank() ||
                contact.getEmail() == null ||
                contact.getEmail().isBlank() ||
                contact.getMessage() == null ||
                contact.getMessage().isBlank()) {

            return ResponseEntity.badRequest()
                    .body("Please fill in all fields.");
        }

        ContactMessage saved = repository.save(contact);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Message saved successfully. ID: " + saved.getId());
    }
}
