package com.company.naspolke.service;

import com.company.naspolke.model.AppUser;

import java.util.Optional;

public interface UserService {
    void registerUser(AppUser appUser);
    Optional<AppUser> findUserByUserEmail(String userEmail);
}
