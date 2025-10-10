package com.alexisroman.foxebank.controller;

import com.alexisroman.foxebank.dto.LoginRequest;
import com.alexisroman.foxebank.dto.SignupRequest;
import com.alexisroman.foxebank.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public String signup(@RequestBody SignupRequest request){
        return authService.signUp(request);
    }

    @PostMapping("/login")
    public String login (@RequestBody LoginRequest request){
        return authService.login(request);
    }
}
