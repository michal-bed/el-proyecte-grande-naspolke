package com.company.naspolke.controller;

import com.company.naspolke.config.security.MyUserDetailsService;
import com.company.naspolke.config.util.JwtUtil;
import com.company.naspolke.model.AppUser;
import com.company.naspolke.model.RefreshToken;
import com.company.naspolke.model.auth.AuthenticationResponse;
import com.company.naspolke.repository.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
public class RefreshTokenController {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/refresh")
    public ResponseEntity<?> createAuthenticationToken(HttpServletRequest request)
    {
        Cookie[] cookies = request.getCookies();

        Optional<Cookie> foundCookie = Optional.empty();
        if (cookies != null)
            foundCookie = Arrays.stream(cookies).parallel()
                    .filter(cookie -> Objects.equals(cookie.getName(), "jwt"))
                    .findFirst();

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
