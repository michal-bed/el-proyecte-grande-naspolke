package com.company.naspolke.controller;

import com.company.naspolke.config.util.JwtUtil;
import com.company.naspolke.model.User;
import com.company.naspolke.model.RefreshToken;
import com.company.naspolke.model.auth.AuthenticationResponse;
import com.company.naspolke.repository.RefreshTokenRepository;
import com.company.naspolke.service.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping
public class RefreshTokenController {

    private RefreshTokenService refreshTokenService;
    private JwtUtil jwtUtil;

    @Autowired
    public RefreshTokenController(RefreshTokenService refreshTokenService, JwtUtil jwtUtil) {
        this.refreshTokenService = refreshTokenService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping(value = "/refresh")
    public ResponseEntity<?> createAuthenticationToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        Optional<Cookie> foundCookie = Optional.empty();

        if (cookies != null)
            foundCookie = Arrays.stream(cookies)
                    .parallel()
                    .filter(cookie -> Objects.equals(cookie.getName(), "jwt"))
                    .findFirst();

        if (foundCookie.isPresent()) {
            Cookie cookie = foundCookie.get();
            String jwt = cookie.getValue();
            RefreshToken foundToken = refreshTokenService.findByJwt(jwt);

            if (foundToken != null) {
                User foundUser = foundToken.getUser();
                UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                        jwtUtil.extractUsername(jwt), foundUser.getUserPassword(), foundUser.isEnabled(),
                        true, true, true,
                        List.of(new SimpleGrantedAuthority("ROLE_USER")));
                Boolean isTokenValid = jwtUtil.validateToken(jwt, userDetails);

                if (isTokenValid && (Objects.equals(foundUser.getUserEmail(), jwtUtil.extractUsername(jwt)) ||
                        Objects.equals(foundUser.getUserEmail(), jwtUtil.extractUsername(jwt)))) {
                    final String accessToken = jwtUtil.generateToken(userDetails, 1000 * 60 * 15);
                    return ResponseEntity.ok().body(new AuthenticationResponse(accessToken, List.of("ROLE_USER")));
                } else {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
                }
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
