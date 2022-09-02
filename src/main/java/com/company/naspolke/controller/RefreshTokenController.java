package com.company.naspolke.controller;

import com.company.naspolke.config.util.JwtUtil;
import com.company.naspolke.model.AppUser;
import com.company.naspolke.model.RefreshToken;
import com.company.naspolke.model.auth.AuthenticationResponse;
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
import java.util.*;

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
            System.out.println(jwt);
            RefreshToken foundToken = refreshTokenService.findByJwt(jwt);

            if (foundToken != null) {
                AppUser foundAppUser = foundToken.getAppUser();
                UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                        jwtUtil.extractUsername(jwt), foundAppUser.getUserPassword(), foundAppUser.isEnabled(),
                        true, true, true,
                        foundAppUser.getApplicationRoles());
                Boolean isTokenValid = jwtUtil.validateToken(jwt, userDetails);

                if (isTokenValid && Objects.equals(foundAppUser.getUserId().toString(), jwtUtil.extractUsername(jwt))) {
                    final String accessToken = jwtUtil.generateToken(userDetails, 1000 * 60 * 15);
                    return ResponseEntity.ok().body(new AuthenticationResponse(accessToken, List.of("ROLE_USER"),
                            foundAppUser.getUserEmail()));
                } else {
                    System.out.println("Error 1");
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
                }
            } else {
                System.out.println("Error 2");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
