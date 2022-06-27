package com.company.naspolke.service;

import com.company.naspolke.model.RefreshToken;
import com.company.naspolke.model.AppUser;

import java.util.Optional;

public interface RefreshTokenService {
    RefreshToken findByJwt(String jwt);
    Optional<RefreshToken> findByUser(AppUser appUser);
    void saveToken(RefreshToken savedToken);
    void updateJwtByUser(String jwt, AppUser appUser);
}
