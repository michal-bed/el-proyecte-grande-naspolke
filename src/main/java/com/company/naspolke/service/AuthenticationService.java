package com.company.naspolke.service;

import com.company.naspolke.model.auth.AuthenticationRequest;
import org.springframework.security.core.userdetails.UserDetails;

public interface AuthenticationService {
    UserDetails authenticateAndGetUserDetails(AuthenticationRequest authenticationRequest);
}
