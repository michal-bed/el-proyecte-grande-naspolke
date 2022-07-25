package com.company.naspolke.service;

import com.company.naspolke.model.AppUser;

import java.util.Optional;
import java.util.UUID;

public interface AppUserService {
    void registerUser(AppUser appUser);
    Optional<AppUser> findUserByUserEmail(String userEmail);
    Optional<AppUser> findUserByUserId(UUID id);
}
