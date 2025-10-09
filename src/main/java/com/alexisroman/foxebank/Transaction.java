package com.alexisroman.foxebank;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;
    private String action;
    private Double amount;
    private LocalDateTime timestamp;

    @ManyToOne
    private User sender;

    @ManyToOne
    private User receiver;

    private String note;

    public Transaction() {}

    public Transaction(String action, Double amount, User sender, User receiver) {
        this.action = action;
        this.amount = amount;
        this.timestamp = LocalDateTime.now();
        this.sender = sender;
        this.receiver = receiver;
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

    public User getSender() {
        return sender;
    }

    public User getReceiver() {
        return receiver;
    }

    public String getNote() {
        return note;
    }

    //SETTERS HERE

    public void setAction(String action) {
        this.action = action;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public void setSender(User user) {
        this.sender = sender;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
