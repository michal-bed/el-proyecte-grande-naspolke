package com.company.naspolke.service;

import com.company.naspolke.model.auth.AuthenticationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImplementation implements AuthenticationService {

    private final MyUserDetailService myUserDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final AppUserService appUserService;

    @Autowired
    public AuthenticationServiceImplementation(MyUserDetailService myUserDetailsService, PasswordEncoder passwordEncoder,
                                               AppUserService appUserService) {
        this.myUserDetailsService = myUserDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.appUserService = appUserService;
    }

    public UserDetails authenticateAndGetUserDetails(AuthenticationRequest authenticationRequest) {

        var appUser = appUserService.findUserByUserEmail(authenticationRequest.getUsername());
        String appUserId = "";
        String appUserEmail = "";
        if(appUser.isPresent())
        {
            appUserId = appUser.get().getUserId().toString();
            appUserEmail = appUser.get().getUserEmail();
        }


        UserDetails userDetails = myUserDetailsService.loadUserByUsername(appUserId);
        if (appUserEmail.equals(authenticationRequest.getUsername())
                && passwordEncoder.matches(authenticationRequest.getPassword(), userDetails.getPassword())) {
            System.out.println("Authenticate user");
        } else {
            System.out.println("Incorrect username or password");
            throw new BadCredentialsException("Incorrect username or password");
        }
        return userDetails;
    }
}
