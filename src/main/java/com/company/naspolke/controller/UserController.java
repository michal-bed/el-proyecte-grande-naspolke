package com.company.naspolke.controller;

import com.company.naspolke.model.AppUser;
import com.company.naspolke.service.AppUserService;
import com.company.naspolke.service.EmailService;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    private final AppUserService appUserService;
    private final EmailService emailService;

    @Autowired
    public UserController(AppUserService appUserService, EmailService emailService) {
        this.appUserService = appUserService;
        this.emailService = emailService;
    }

    @PostMapping(value = "/registration")
    public void registerNewUser(@RequestBody AppUser appUser) throws IOException, MessagingException {
        Optional<AppUser> usernameEntry = appUserService.findUserByUserEmail(appUser.getUserEmail());
        if (usernameEntry.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already exists!");
        } else {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String encodedPassword = passwordEncoder.encode(appUser.getUserPassword());
            appUser.setUserPassword(encodedPassword);
            appUserService.registerUser(appUser);
            emailService.sendVerificationEmail(appUser);
        }
    }

    @GetMapping("/verify-registration-code/{registrationCode}")
    public void verifyUser(@PathVariable String registrationCode) throws IOException, MessagingException {
        Optional<AppUser> appUser = appUserService.findAppUserByVerificationCode(registrationCode);
        if (appUser.isEmpty() || appUser.get().isEnabled()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong register code!");
        } else {
            appUserService.verifyRegisterUser(appUser.get());
            emailService.sendEmail(appUser.get().getUserEmail(),
                    "./src/main/resources/email/registration-email.txt",
                    "Witaj w naszym gronie " + appUser.get().getUserName());
        }
    }
}
