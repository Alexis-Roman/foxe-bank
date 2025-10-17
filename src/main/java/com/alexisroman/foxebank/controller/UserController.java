package com.alexisroman.foxebank.controller;

import com.alexisroman.foxebank.entity.User;
import com.alexisroman.foxebank.service.BankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private BankingService bankingService;

    // Get user info by ID
    @GetMapping("/{userId}")
    public User getUserById(@PathVariable Long userId) {
        return bankingService.getUserById(userId);
    }
    @GetMapping("/findByNumber/{number}")
    public ResponseEntity<User> getUserByNumber(@PathVariable String number) {
        User user = bankingService.getUserByNumber(number);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
