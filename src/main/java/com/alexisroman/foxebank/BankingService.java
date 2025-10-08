package com.alexisroman.foxebank;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BankingService {
    @Autowired
    private UserRepository userRep;

    @Autowired
    private TransactionRepository transactionRep;

    public void cashIn (Long userId, Double amount){
        User user = userRep.findById(userId).orElseThrow();
        user.setBalance(user.getBalance() + amount);
        userRep.save(user);
        transactionRep.save(new Transaction("Cash In: " ,amount,  user));

    }

    public void cashOut (Long userId, Double amount){
        User user = userRep.findById(userId).orElseThrow();
        user.setBalance(user.getBalance() - amount);
        userRep.save(user);
        transactionRep.save(new Transaction("Cash Out: ", amount, user));

    }

}
