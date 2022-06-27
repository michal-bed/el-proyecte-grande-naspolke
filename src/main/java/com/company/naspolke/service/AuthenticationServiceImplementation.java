package com.company.naspolke.service;

import com.company.naspolke.model.auth.AuthenticationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImplementation implements AuthenticationService {

    private MyUserDetailService myUserDetailsService;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public AuthenticationServiceImplementation(MyUserDetailService myUserDetailsService, PasswordEncoder passwordEncoder) {
        this.myUserDetailsService = myUserDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDetails authenticateAndGetUserDetails(AuthenticationRequest authenticationRequest) {
        UserDetails userDetails = myUserDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        if (userDetails.getUsername().equals(authenticationRequest.getUsername())
                && passwordEncoder.matches(authenticationRequest.getPassword(), userDetails.getPassword())) {
            System.out.println("Authenticate user");
        } else {
            System.out.println("Incorrect username or password");
            throw new BadCredentialsException("Incorrect username or password");
        }
        return userDetails;
    }
}
