//package com.alexisroman.foxebank.controller;
//
//import com.alexisroman.foxebank.entity.User;
//import com.alexisroman.foxebank.service.BankingService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/users")
//public class UserDataController {
//
//    @Autowired
//    private BankingService bankingService;
//
//    @GetMapping("/{userId}")
//    public User getUserById(@PathVariable Long userId) {
//        return bankingService.getUserById(userId);
//    }
//}
