package com.company.naspolke.controller;
import com.company.naspolke.service.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Objects;
import java.util.Optional;

@RestController
public class RefreshTokenController {

    @Autowired
    private RefreshTokenService refreshTokenService;

    @GetMapping("/refresh")
    public ResponseEntity<?> createAuthenticationToken(HttpServletRequest request)
    {
        Cookie[] cookies = request.getCookies();

        Optional<Cookie> foundCookie = Optional.empty();
        if (cookies != null)
            foundCookie = Arrays.stream(cookies).parallel()
                    .filter(cookie -> Objects.equals(cookie.getName(), "jwt"))
                    .findFirst();

        return refreshTokenService.validateTokenAndGetResponseEntity(foundCookie);
    }

}
