package com.alexisroman.foxebank.controller;

import com.alexisroman.foxebank.service.BankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private BankingService bankingService;

    //CASH IN
    @PostMapping("/{receiverId}/cashin")
    public  String cashIn (@PathVariable Long receiverId, @RequestParam Long senderId, @RequestParam Double amount){
        bankingService.cashIn(receiverId, senderId, amount);
        return "Cash In successful! You received ₱" + amount
                + "from user " + senderId;
    }

    //CASH OUT
    @PostMapping("/{senderId} /cashout")
    public  String cashOut (@PathVariable Long senderId, @RequestParam Long receiverId, @RequestParam Double amount){
        bankingService.cashOut(senderId, receiverId, amount);
        return "Cash Out successful! You sent ₱" + amount
                + "to user " + senderId;
    }
}
