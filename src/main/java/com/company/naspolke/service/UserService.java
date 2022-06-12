package com.company.naspolke.service;

import com.company.naspolke.service.model.User;

import java.util.Optional;

public interface UserService {
    void registerUser(User user);
    Optional<User> findUserByUserEmail(User user);
}
