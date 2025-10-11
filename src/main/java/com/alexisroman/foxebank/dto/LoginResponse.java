package com.alexisroman.foxebank.dto;

public class LoginResponse {
    private boolean success;
    private String message;
    private String name;
    private Double balance;

    public LoginResponse(boolean success, String message, String name, Double balance) {
        this.success = success;
        this.message = message;
        this.name = name;
        this.balance = balance;
    }

    // getters
    public boolean isSuccess() { return success; }
    public String getMessage() { return message; }
    public String getName() { return name; }
    public Double getBalance() { return balance; }
}
