package com.alexisroman.foxebank.controller;

import com.alexisroman.foxebank.dto.LoginRequest;
import com.alexisroman.foxebank.dto.SignupRequest;
import com.alexisroman.foxebank.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
