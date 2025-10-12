package com.alexisroman.foxebank.service;

import com.alexisroman.foxebank.repository.TransactionRepository;
import com.alexisroman.foxebank.repository.UserRepository;
import com.alexisroman.foxebank.entity.Transaction;
import com.alexisroman.foxebank.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.alexisroman.foxebank.dto.TransactionResponse;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BankingService {
    @Autowired
    private UserRepository userRep;

    @Autowired
    private TransactionRepository transactionRep;

    @Transactional
    public void cashIn(Long receiverId, Long senderId, Double amount) {
        User receiver = userRep.findById(receiverId).orElseThrow();
        User sender = userRep.findById(senderId).orElseThrow();

        // user RECEIVES money
        receiver.setBalance(receiver.getBalance() + amount);
        userRep.save(receiver);

        sender.setBalance(sender.getBalance() - amount);
        userRep.save(sender);

        // transaction record
        Transaction transaction = new Transaction("Cash In", amount, sender, receiver);
        transaction.setTimestamp(LocalDateTime.now()); // set timestamp
        transactionRep.save(transaction);
    }

    @Transactional
    public void cashOut(Long senderId, Long receiverId, Double amount) {
        User sender = userRep.findById(senderId).orElseThrow();
        User receiver = userRep.findById(receiverId).orElseThrow();

        if (sender.getBalance() >= amount) {
            // user SENDS money
            sender.setBalance(sender.getBalance() - amount);
            userRep.save(sender);

            receiver.setBalance(receiver.getBalance() + amount);
            userRep.save(receiver);

            // transaction record
            Transaction transaction = new Transaction("Cash Out", amount, sender, receiver);
            transaction.setTimestamp(LocalDateTime.now()); // set timestamp
            transactionRep.save(transaction);

        } else {
            throw new IllegalArgumentException("Insufficient balance.");
        }
    }

    // GET USER TRANSACTIONS
    //GET USER TRANSACTIONS
    public List<TransactionResponse> getUserTransactions(Long userId) {
        User user = userRep.findById(userId).orElseThrow();

        List<Transaction> sent = transactionRep.findBySender(user);
        List<Transaction> received = transactionRep.findByReceiver(user);

        // Combine and map to DTO
        List<TransactionResponse> transactions =
                sent.stream()
                        .map(tx -> new TransactionResponse(
                                tx.getTransactionId(),
                                tx.getTimestamp(),
                                tx.getSender().getName(),
                                tx.getReceiver().getName(),
                                "Deposit", // renamed from "Cash Out"
                                tx.getAmount(),
                                null // balance removed
                        ))
                        .collect(Collectors.toList());

        transactions.addAll(
                received.stream()
                        .map(tx -> new TransactionResponse(
                                tx.getTransactionId(),
                                tx.getTimestamp(),
                                tx.getSender().getName(),
                                tx.getReceiver().getName(),
                                "Received", // renamed from "Cash In"
                                tx.getAmount(),
                                null // balance removed
                        ))
                        .collect(Collectors.toList())
        );

        // Sort by datetime descending
        transactions.sort((a, b) -> b.getDateTime().compareTo(a.getDateTime()));

        return transactions;
    }


    public User getUserById(Long userId) {
        return userRep.findById(userId).orElseThrow();
    }

}
