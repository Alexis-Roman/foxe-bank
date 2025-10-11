package com.alexisroman.foxebank.dto;

import java.time.LocalDateTime;

public class TransactionRequest {
    private Long transactionId;
    private LocalDateTime dateTime;
    private String sender;
    private String receiver;
    private String action;
    private Double amount;
    private Double balance;

    public TransactionRequest(Long transactionId, LocalDateTime dateTime,
                              String sender, String receiver, String action,
                              Double amount, Double balance) {
        this.transactionId = transactionId;
        this.dateTime = dateTime;
        this.sender = sender;
        this.receiver = receiver;
        this.action = action;
        this.amount = amount;
        this.balance = balance;
    }

    //GETTERS
    public Long getTransactionId() {
        return transactionId;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public String getSender() {
        return sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public String getAction() {
        return action;
    }

    public Double getAmount() {
        return amount;
    }

    public Double getBalance() {
        return balance;
    }
}
