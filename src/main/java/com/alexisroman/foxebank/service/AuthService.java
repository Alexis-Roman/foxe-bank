package com.alexisroman.foxebank.service;

import com.alexisroman.foxebank.dto.ChangePassRequest;
import com.alexisroman.foxebank.dto.LoginRequest;
import com.alexisroman.foxebank.dto.LoginResponse;
import com.alexisroman.foxebank.dto.SignupRequest;
import com.alexisroman.foxebank.entity.User;
import com.alexisroman.foxebank.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRep;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

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

        String hashedPass = encoder.encode(request.getPassword());

        //CREATING NEW USER
        User user   = new User(
                request.getName(),
                request.getEmail(),
                request.getPassword(),
                request.getBirthday(),
                hashedPass,
                0.0
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

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new LoginResponse(false, "Wrong password", null, null, 0.0);
        }

        return new LoginResponse(true, "Login successful!",user.getUserId(), user.getName(), user.getBalance());

    }

    //Change Pass
    public String changePass(Long userId, ChangePassRequest request){
        Optional<User> findUser = userRep.findById(userId);

        if(findUser.isEmpty()) return "User not found.";

        User user = findUser.get();

        if (!encoder.matches(request.getOldPass(), user.getPassword())){
            return "Please enter the correct old password";
        }

        user.setPassword(encoder.encode(request.getNewPass()));
        userRep.save(user);

        return "PIN changed successfully!";
    }

    public String logout() {
        return "User logged out successfully (session ended).";
    }
}
