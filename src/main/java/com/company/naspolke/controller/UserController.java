package com.company.naspolke.controller;

import com.company.naspolke.model.AppUser;
import com.company.naspolke.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/registration")
    public void registerNewUser(@RequestBody AppUser appUser) {
        Optional<AppUser> usernameEntry = userService.findUserByUserEmail(appUser.getUserEmail());
        if (usernameEntry.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already exists!");
        } else {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String encodedPassword = passwordEncoder.encode(appUser.getUserPassword());
            appUser.setUserPassword(encodedPassword);
            userService.registerUser(appUser);
        }
    }
}
