package com.alexisroman.foxebank.service;

import com.alexisroman.foxebank.dto.LoginRequest;
import com.alexisroman.foxebank.dto.LoginResponse;
import com.alexisroman.foxebank.dto.SignupRequest;
import com.alexisroman.foxebank.entity.User;
import com.alexisroman.foxebank.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRep;

    //Signing-up
    public String signUp(SignupRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())){
            return "Error: Passwords do not match";
        }

        if(Period.between(request.getBirthday(), LocalDate.now()).getYears() < 18){
            return "You must be at least 18 y/o to create an account";
        }

        Optional<User> existing = userRep.findByEmail(request.getEmail());
        if (existing.isPresent()){
            return "Email already exist";
        }

        //CREATING NEW USER
        User user   = new User(
                request.getName(), request.getEmail(),
                request.getBirthday(), request.getPassword(), 0.0
        );

        //save user info to db
        userRep.save(user);

        return "Account Created Successful!";
    }

    //Login
    public LoginResponse login(LoginRequest request) {
        Optional<User> findUser = userRep.findByEmail(request.getEmail());
        if (findUser.isEmpty()) {
            return new LoginResponse(false, "User does not exist!", null,null, 0.0);
        }

        User user = findUser.get();

        if (!user.getPassword().equals(request.getPassword())) {
            return new LoginResponse(false, "Wrong password", null, null, 0.0);
        }

        return new LoginResponse(true, "Login successful!",user.getUserId(), user.getName(), user.getBalance());

    }


}
