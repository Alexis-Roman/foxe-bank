package com.alexisroman.foxebank.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String name;
    private String email;
    private String number;
    private LocalDate birthday;
    private String password;
    private Double balance;

    public User(){}

    public User(String name, String email, String number, LocalDate birthday, String password, Double balance) {
        this.name = name;
        this.email = email;
        this.number = number;
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
    public String getNumber() {
        return number;
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

    public void setPassword(String password) {
        this.password = password;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }
}


