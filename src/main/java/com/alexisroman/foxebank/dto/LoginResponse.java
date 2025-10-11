package com.alexisroman.foxebank.dto;

public class LoginResponse {
    private boolean success;
    private String message;
    private Long userId;
    private String name;
    private Double balance;

    public LoginResponse(boolean success, String message, Long userId, String name, Double balance) {
        this.success = success;
        this.message = message;
        this.name = name;
        this.balance = balance;
        this.userId = userId;
    }

    // getters
    public boolean isSuccess() { return success; }
    public String getMessage() { return message; }
    public String getName() { return name; }
    public Double getBalance() { return balance; }

    public Long getUserId() { return userId; }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }
}
