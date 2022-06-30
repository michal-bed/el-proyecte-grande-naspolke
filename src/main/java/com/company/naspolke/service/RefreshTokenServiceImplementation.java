package com.company.naspolke.service;

import com.company.naspolke.model.AppUser;
import com.company.naspolke.model.RefreshToken;
import com.company.naspolke.repository.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RefreshTokenServiceImplementation implements RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    @Autowired
    public RefreshTokenServiceImplementation(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Override
    public RefreshToken findByJwt(String jwt) {
        return refreshTokenRepository.findByJwt(jwt);
    }

    @Override
    public Optional<RefreshToken> findByUser(AppUser appUser) {
        return Optional.ofNullable(refreshTokenRepository.findByAppUser(appUser));
    }

    @Override
    public void saveToken(RefreshToken savedToken) {
        refreshTokenRepository.save(savedToken);
    }

    @Override
    public void updateJwtByUser(String jwt, AppUser appUser) {
        refreshTokenRepository.updateJwtByAppUser(jwt, appUser);
    }
}
