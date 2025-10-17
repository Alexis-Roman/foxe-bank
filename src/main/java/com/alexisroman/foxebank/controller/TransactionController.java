package com.alexisroman.foxebank.controller;

import com.alexisroman.foxebank.dto.RequestMoney;
import com.alexisroman.foxebank.dto.TransactionResponse;
import com.alexisroman.foxebank.entity.TransactionRequest;
import com.alexisroman.foxebank.service.BankingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

    @Autowired
    private BankingService bankingService;

    // --- CASH IN ---
    @PostMapping("/{receiverId}/cashin")
    public ResponseEntity<String> cashIn(
            @PathVariable Long receiverId,
            @RequestParam Long senderId,
            @RequestParam Double amount
    ) {
        bankingService.cashIn(receiverId, senderId, amount);
        return ResponseEntity.ok("Cash In successful! You received ₱" + amount + " from user " + senderId);
    }

    // --- CASH OUT ---
    @PostMapping("/{senderId}/cashout")
    public ResponseEntity<String> cashOut(
            @PathVariable Long senderId,
            @RequestParam String receiverNumber,
            @RequestParam Double amount
    ) {
        bankingService.cashOut(senderId, receiverNumber, amount);
        return ResponseEntity.ok("Cash Out successful! You sent ₱" + amount + " to user " + receiverNumber);
    }

    // --- TRANSACTION HISTORY ---
    @GetMapping("/history/{userId}")
    public ResponseEntity<List<TransactionResponse>> getTransactionHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(bankingService.getUserTransactions(userId));
    }

    // --- REQUEST MONEY ---
    @PostMapping("/request")
    public ResponseEntity<TransactionRequest> requestMoney(@RequestBody RequestMoney dto) {
        TransactionRequest request = bankingService.requestMoney(
                dto.getRequesterId(), dto.getReceiverNumber(), dto.getAmount()
        );
        return ResponseEntity.ok(request);
    }

    // --- RESPOND TO REQUEST ---
    @PostMapping("/request/{requestId}/respond")
    public ResponseEntity<Void> respondToRequest(
            @PathVariable Long requestId,
            @RequestParam boolean accept
    ) {
        bankingService.respondToRequest(requestId, accept);
        return ResponseEntity.ok().build();
    }

    // --- GET INBOX ---
    @GetMapping("/inbox/{userId}")
    public ResponseEntity<List<TransactionRequest>> getInbox(@PathVariable Long userId) {
        return ResponseEntity.ok(bankingService.getInbox(userId));
    }
}
