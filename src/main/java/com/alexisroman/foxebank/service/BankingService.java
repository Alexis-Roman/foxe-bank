package com.alexisroman.foxebank.service;

import com.alexisroman.foxebank.dto.TransactionResponse;
import com.alexisroman.foxebank.entity.Transaction;
import com.alexisroman.foxebank.entity.TransactionRequest;
import com.alexisroman.foxebank.entity.User;
import com.alexisroman.foxebank.repository.TransactionRepository;
import com.alexisroman.foxebank.repository.TransactionRequestRepository;
import com.alexisroman.foxebank.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BankingService {

    @Autowired
    private UserRepository userRep;

    @Autowired
    private TransactionRepository transactionRep;

    @Autowired
    private TransactionRequestRepository requestRep;

    // --- CASH IN ---
    @Transactional
    public void cashIn(Long receiverId, Long senderId, Double amount) {
        User receiver = userRep.findById(receiverId).orElseThrow();
        User sender = userRep.findById(senderId).orElseThrow();

        receiver.setBalance(receiver.getBalance() + amount);
        sender.setBalance(sender.getBalance() - amount);

        userRep.save(receiver);
        userRep.save(sender);

        Transaction transaction = new Transaction("Cash In", amount, sender, receiver);
        transaction.setTimestamp(LocalDateTime.now());
        transactionRep.save(transaction);
    }

    // --- CASH OUT ---
    @Transactional
    public void cashOut(Long senderId, Long receiverId, Double amount) {
        User sender = userRep.findById(senderId).orElseThrow();
        User receiver = userRep.findById(receiverId).orElseThrow();

        if (sender.getBalance() < amount) {
            throw new IllegalArgumentException("Insufficient balance.");
        }

        sender.setBalance(sender.getBalance() - amount);
        receiver.setBalance(receiver.getBalance() + amount);

        userRep.save(sender);
        userRep.save(receiver);

        Transaction transaction = new Transaction("Cash Out", amount, sender, receiver);
        transaction.setTimestamp(LocalDateTime.now());
        transactionRep.save(transaction);
    }

    // --- REQUEST MONEY: create pending request only ---
    @Transactional
    public TransactionRequest requestMoney(Long requesterId, String receiverNumber, Double amount) {
        User requester = userRep.findById(requesterId)
                .orElseThrow(() -> new IllegalArgumentException("Requester not found"));

        User receiver = userRep.findByNumber(receiverNumber)
                .orElseThrow(() -> new IllegalArgumentException("Receiver not found"));

        TransactionRequest req = new TransactionRequest();
        req.setRequester(requester);
        req.setReceiver(receiver);
        req.setAmount(amount);
        req.setStatus(TransactionRequest.Status.PENDING);
        req.setTimestamp(LocalDateTime.now());

        return requestRep.save(req);
    }

    // --- RESPOND TO REQUEST: accept (transfer) or decline (no transfer) ---
    @Transactional
    public void respondToRequest(Long requestId, boolean accept) {
        TransactionRequest req = requestRep.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Request not found"));

        User requester = req.getRequester(); // person who asked for money
        User receiver = req.getReceiver();   // person who was asked (will pay)

        if (accept) {
            Double amount = req.getAmount();

            if (receiver.getBalance() < amount) {
                throw new IllegalArgumentException("Receiver has insufficient balance to accept request.");
            }

            // Transfer: receiver → requester
            receiver.setBalance(receiver.getBalance() - amount);
            requester.setBalance(requester.getBalance() + amount);

            userRep.save(receiver);
            userRep.save(requester);

            // Record transaction correctly (sender = receiver, receiver = requester)
            Transaction tx = new Transaction("Cash In", amount, receiver, requester);
            tx.setTimestamp(LocalDateTime.now());
            transactionRep.save(tx);

            req.setStatus(TransactionRequest.Status.ACCEPTED);
        } else {
            req.setStatus(TransactionRequest.Status.DECLINED);
        }

        requestRep.save(req);
    }



    // --- GET INBOX (requests where current user is receiver) ---
    public List<TransactionRequest> getInbox(Long userId) {
        User receiver = userRep.findById(userId).orElseThrow();
        return requestRep.findByReceiver(receiver)
                .stream()
                .filter(req -> req.getStatus() == TransactionRequest.Status.PENDING)
                .collect(Collectors.toList());
    }


    // --- GET USER TRANSACTIONS (existing mapping to DTO) ---
    public List<TransactionResponse> getUserTransactions(Long userId) {
        User user = userRep.findById(userId).orElseThrow();

        List<Transaction> sent = transactionRep.findBySender(user);
        List<Transaction> received = transactionRep.findByReceiver(user);

        List<TransactionResponse> transactions = sent.stream().map(tx -> new TransactionResponse(
                tx.getTransactionId(),
                tx.getTimestamp(),
                tx.getSender().getName(),
                tx.getReceiver().getName(),
                "Deposit",
                tx.getAmount(),
                null
        )).collect(Collectors.toList());

        transactions.addAll(received.stream().map(tx -> new TransactionResponse(
                tx.getTransactionId(),
                tx.getTimestamp(),
                tx.getSender().getName(),
                tx.getReceiver().getName(),
                "Received",
                tx.getAmount(),
                null
        )).collect(Collectors.toList()));

        transactions.sort((a, b) -> b.getDateTime().compareTo(a.getDateTime()));
        return transactions;
    }

    public User getUserById(Long userId) {
        return userRep.findById(userId).orElseThrow();
    }

    public User getUserByNumber(String number) {
        return userRep.findByNumber(number).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
