package com.company.naspolke.controller;

import com.company.naspolke.model.AppUser;
import com.company.naspolke.service.AuthenticationService;
import com.company.naspolke.config.util.JwtUtil;
import com.company.naspolke.model.RefreshToken;
import com.company.naspolke.model.auth.AuthenticationRequest;
import com.company.naspolke.model.auth.AuthenticationResponse;
import com.company.naspolke.service.RefreshTokenService;
import com.company.naspolke.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/")
public class HomeController {

    private JwtUtil jwtTokenUtil;
    private UserService userService;
    private RefreshTokenService refreshTokenService;
    private AuthenticationService authenticationService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public HomeController(JwtUtil jwtTokenUtil, UserService userService, RefreshTokenService refreshTokenService,
                          AuthenticationService authenticationService, PasswordEncoder passwordEncoder) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.userService = userService;
        this.refreshTokenService = refreshTokenService;
        this.authenticationService = authenticationService;
        this.passwordEncoder = passwordEncoder;
    }

    @RequestMapping({ "/hello" })
    public String helloPage() {
        System.out.println(SecurityContextHolder.getContext().getAuthentication());
        return "Hello World";
    }

    @Transactional
    @PostMapping(value = "/auth")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {

        UserDetails userDetails = authenticationService.authenticateAndGetUserDetails(authenticationRequest);
        Optional<AppUser> user = userService.findUserByUserEmail(authenticationRequest.getUsername());
        System.out.println("!!!!!!!!!!email!!!!!!");
        System.out.println(user.get().getUserEmail());

        final String accessToken = jwtTokenUtil.generateToken(userDetails, 1000 * 60 * 15);
        final String refreshToken = jwtTokenUtil.generateToken(userDetails, 1000 * 60 * 60 * 60);

        System.out.println(accessToken);
        System.out.println(refreshToken);
        var foundUser = user.get();
        if (refreshTokenService.findByUser(foundUser).isEmpty()) {
            RefreshToken savedToken = new RefreshToken(refreshToken, user.get());
            refreshTokenService.saveToken(savedToken);
        } else {
            refreshTokenService.updateJwtByUser(refreshToken, foundUser);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("Set-Cookie",String.format("jwt=%s;", refreshToken)  +
                " Max-Age=86400; Secure; HttpOnly; SameSite=None");
        return ResponseEntity.ok().headers(headers)
                .body(new AuthenticationResponse(accessToken, List.of("ROLE_USER"), foundUser.getUserEmail()));
    }
}
