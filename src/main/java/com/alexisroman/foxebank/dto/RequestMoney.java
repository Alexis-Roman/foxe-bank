package com.alexisroman.foxebank.dto;

public class RequestMoney {

    private Long requesterId;
    private String receiverNumber;
    private Double amount;

    public RequestMoney() {
    }

    public RequestMoney(Long requesterId, String receiverNumber, Double amount) {
        this.requesterId = requesterId;
        this.receiverNumber = receiverNumber;
        this.amount = amount;
    }

    // Getters and setters
    public Long getRequesterId() {
        return requesterId;
    }

    public void setRequesterId(Long requesterId) {
        this.requesterId = requesterId;
    }

    public String getReceiverNumber() {
        return receiverNumber;
    }

    public void setReceiverNumber(String receiverNumber) {
        this.receiverNumber = receiverNumber;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
