package com.alexisroman.foxebank.dto;

import java.time.LocalDate;

public class SignupRequest {
    private String name;
    private String email;
    private LocalDate birthday;

    private String password;
    private String confirmPassword;

    //CONSTRUCTORS
    public SignupRequest() {
    }

    public SignupRequest(String name, String email, LocalDate birthday, String password, String confirmPassword) {
        this.name = name;
        this.email = email;
        this.birthday = birthday;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

    //GETTERS
    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public String getPassword() {
        return password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    //SETTERS

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
