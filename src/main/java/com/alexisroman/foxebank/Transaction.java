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

    public Transaction(String action, Double amount, User user) {
        this.action = action;
        this.amount = amount;
        this.timestamp = LocalDateTime.now();
        this.user = user;
    }

    //GETTERS HERE

    public Long getTransactionId() {
        return transactionId;
    }

    public String getAction() {
        return action;
    }

    public Double getAmount() {
        return amount;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public User getUser() {
        return user;
    }


    //SETTERS HERE

    public void setAction(String action) {
        this.action = action;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
