package com.alexisroman.foxebank.controller;

import com.alexisroman.foxebank.dto.TransactionResponse;
import com.alexisroman.foxebank.entity.User;
import com.alexisroman.foxebank.service.BankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.alexisroman.foxebank.dto.TransactionResponse;

import java.util.List;

@RestController
@RequestMapping("/api/transaction")
public class UserController {
    @Autowired
    private BankingService bankingService;

    //CASH IN
    @PostMapping("/{receiverId}/cashin")
    public  String cashIn (@PathVariable Long receiverId, @RequestParam Long senderId, @RequestParam Double amount){
        bankingService.cashIn(receiverId, senderId, amount);
        return "Cash In successful! You received ₱" + amount
                + " from user " + senderId;
    }

    //CASH OUT
    @PostMapping("/{senderId}/cashout")
    public  String cashOut (@PathVariable Long senderId, @RequestParam Long receiverId, @RequestParam Double amount){
        bankingService.cashOut(senderId, receiverId, amount);
        return "Cash Out successful! You sent ₱" + amount
                + " to user " + receiverId;
    }

    @GetMapping("/history/{userId}")
    public List<TransactionResponse> getTransactionHistory(@PathVariable Long userId) {
        return bankingService.getUserTransactions(userId);
    }

    @GetMapping("/users/{userId}")
    public User getUser(@PathVariable Long userId) {
        return bankingService.getUserById(userId);
    }

    // Get user info by ID
    @GetMapping("/api/users/{userId}")
    public User getUserById(@PathVariable Long userId) {
        return bankingService.getUserById(userId);
    }

}
