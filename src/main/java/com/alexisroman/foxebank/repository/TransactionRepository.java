package com.alexisroman.foxebank.repository;

import com.alexisroman.foxebank.entity.Transaction;
import com.alexisroman.foxebank.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findBySender(User sender);
    List<Transaction> findByReceiver(User receiver);
}
