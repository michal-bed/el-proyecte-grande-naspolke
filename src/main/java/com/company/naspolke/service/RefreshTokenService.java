package com.company.naspolke.service;

import com.company.naspolke.config.util.JwtUtil;
import com.company.naspolke.model.AppUser;
import com.company.naspolke.model.RefreshToken;
import com.company.naspolke.model.auth.AuthenticationResponse;
import com.company.naspolke.repository.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class RefreshTokenService {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public ResponseEntity<?> validateTokenAndGetResponseEntity(Optional<Cookie> foundCookie) {
        if(foundCookie.isPresent()) {
            var cookie = foundCookie.get();
            String jwt = cookie.getValue();
            RefreshToken foundToken = refreshTokenRepository.findByJwt(jwt);
            if (foundToken != null) {
                AppUser foundUser = foundToken.getUser();
                var userDetails = new org.springframework.security.core.userdetails.User(
                        jwtUtil.extractUsername(jwt), foundUser.getPassword(), foundUser.isEnabled(), true, true,
                        true,
                        List.of(new SimpleGrantedAuthority("ROLE_USER")));
                var isTokenValid = jwtUtil.validateToken(jwt, userDetails);
                if (isTokenValid &&
                        (Objects.equals(foundUser.getEmail(), jwtUtil.extractUsername(jwt)) || Objects.equals(foundUser.getLogin(), jwtUtil.extractUsername(jwt))))
                {
                    final String accessToken = jwtUtil.generateToken(userDetails, 1000 * 60 * 15);
                    return ResponseEntity.ok().body(new AuthenticationResponse(accessToken, List.of("ROLE_USER")));
                }
                else
                {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
                }
            }
            else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }


        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
