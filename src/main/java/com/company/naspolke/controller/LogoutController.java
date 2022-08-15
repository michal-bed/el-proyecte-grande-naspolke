package com.company.naspolke.controller;

import com.company.naspolke.model.AppUser;
import com.company.naspolke.model.RefreshToken;
import com.company.naspolke.service.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;

@RestController
@RequestMapping(value = "/")
public class LogoutController {

    @Autowired
    RefreshTokenService refreshTokenService;

    @RequestMapping({ "logout" })
    public ResponseEntity<?> handleLogout(@CookieValue(value = "jwt", defaultValue = "") String refreshToken) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

    }
}
