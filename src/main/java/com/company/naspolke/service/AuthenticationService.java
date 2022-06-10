package com.company.naspolke.service;

import com.company.naspolke.config.security.MyUserDetailsService;
import com.company.naspolke.model.auth.AuthenticationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    PasswordEncoder passwordEncoder;

    public UserDetails authenticateAndGetUserDetails(AuthenticationRequest authenticationRequest) {
        var userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        if (userDetails.getUsername().equals(authenticationRequest.getUsername())
                && passwordEncoder.matches(authenticationRequest.getPassword(), userDetails.getPassword()))
        {
            System.out.println("Authenticate user");
        }
        else {
            System.out.println("Incorrect username or password");
            throw new BadCredentialsException("Incorrect username or password");
        }
        return userDetails;
    }
}
