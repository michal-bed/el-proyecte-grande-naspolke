package com.company.naspolke.service;

import com.company.naspolke.model.RefreshToken;
import com.company.naspolke.model.User;

import java.util.Optional;

public interface RefreshTokenService {
    RefreshToken findByJwt(String jwt);
    Optional<RefreshToken> findByUser(User user);
    void saveToken(RefreshToken savedToken);
    void updateJwtByUser(String jwt, User user);
}
