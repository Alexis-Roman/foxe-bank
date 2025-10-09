package com.alexisroman.foxebank;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BankingService {
    @Autowired
    private UserRepository userRep;

    @Autowired
    private TransactionRepository transactionRep;

    @Transactional
    public void cashIn(Long receiverId, Long senderId, Double amount){
        User receiver = userRep.findById(receiverId).orElseThrow();
        User sender = userRep.findById(senderId).orElseThrow();

        //user RECEIVES money
        receiver.setBalance(receiver.getBalance() + amount);
        userRep.save(receiver);

        sender.setBalance(sender.getBalance() - amount);
        userRep.save(sender);

        //transaction record
        transactionRep.save(new Transaction("Cash In: ", amount, sender, receiver));
    }

    @Transactional
    public void cashOut(Long senderId, Long receiverId, Double amount){
        User sender = userRep.findById(senderId).orElseThrow();
        User receiver = userRep.findById(receiverId).orElseThrow();

        //user SENDS money
        sender.setBalance(sender.getBalance() - amount);
        userRep.save(sender);

        receiver.setBalance(receiver.getBalance() + amount);
        userRep.save(receiver);

        //transaction record
        transactionRep.save(new Transaction("Cash Out: ", amount, sender, receiver));
    }

}
