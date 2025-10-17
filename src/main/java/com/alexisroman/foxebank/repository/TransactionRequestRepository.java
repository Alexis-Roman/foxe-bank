package com.alexisroman.foxebank.repository;

import com.alexisroman.foxebank.entity.TransactionRequest;
import com.alexisroman.foxebank.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRequestRepository extends JpaRepository<TransactionRequest, Long> {
    List<TransactionRequest> findByReceiver(User receiver);
}
