package com.alexisroman.foxebank.controller;

import com.alexisroman.foxebank.dto.ChangePassRequest;
import com.alexisroman.foxebank.dto.LoginRequest;
import com.alexisroman.foxebank.dto.LoginResponse;
import com.alexisroman.foxebank.dto.SignupRequest;
import com.alexisroman.foxebank.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequest request) {
        String message = authService.signUp(request);
        return ResponseEntity.ok(message);
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/changePin/{userId}")
    public ResponseEntity<String> changePin(@PathVariable Long userId, @RequestBody ChangePassRequest request) {
        String message = authService.changePass(userId, request);
        return ResponseEntity.ok(message);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        String message = authService.logout();
        return ResponseEntity.ok(message);
    }

}
