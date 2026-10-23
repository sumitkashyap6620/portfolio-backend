package com.example.portfolio_backend.repository;

import com.example.portfolio_backend.entnty.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository
        extends JpaRepository<ContactMessage, Long> {
}