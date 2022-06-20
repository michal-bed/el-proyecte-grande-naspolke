package com.company.naspolke.service;

import com.company.naspolke.model.RefreshToken;
import com.company.naspolke.model.User;
import com.company.naspolke.repository.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RefreshTokenServiceImplementation implements RefreshTokenService {

    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    public RefreshTokenServiceImplementation(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Override
    public RefreshToken findByJwt(String jwt) {
        return refreshTokenRepository.findByJwt(jwt);
    }

    @Override
    public Optional<RefreshToken> findByUser(User user) {
        return Optional.ofNullable(refreshTokenRepository.findByUser(user));
    }

    @Override
    public void saveToken(RefreshToken savedToken) {
        refreshTokenRepository.save(savedToken);
    }

    @Override
    public void updateJwtByUser(String jwt, User user) {
        refreshTokenRepository.updateJwtByUser(jwt, user);
    }
}
