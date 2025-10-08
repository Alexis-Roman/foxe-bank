package com.alexisroman.foxebank;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;
    private String action;
    private Double amount;
    private LocalDateTime timestamp;

    @ManyToOne
    private User user;

    public Transaction() {}

    public Transaction(String action, Double amount, LocalDateTime timestamp) {
        this.action = action;
        this.amount = amount;
        this.timestamp = timestamp;
    }
}
