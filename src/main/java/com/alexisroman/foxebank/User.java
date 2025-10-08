package com.alexisroman.foxebank;

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
}
