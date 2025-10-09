package com.alexisroman.foxebank.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String name;
    private String email;
    private LocalDate birthday;
    private String password;
    private Double balance;

    public User(){}

    public User(String name, String email, LocalDate birthday, String password, Double balance) {
        this.name = name;
        this.email = email;
        this.birthday = birthday;
        this.password = password;
        this.balance = balance;
    }

    //GETTERS HERE
    public Long getUserId() {
        return userId;
    }

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

    public Double getBalance() {
        return balance;
    }

    //SETTERS HERE
    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }
}


