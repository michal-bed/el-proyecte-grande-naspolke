package com.company.naspolke.controller;

import com.company.naspolke.service.MyUserDetailsServiceImplementation;
import com.company.naspolke.config.util.JwtUtil;
import com.company.naspolke.model.RefreshToken;
import com.company.naspolke.model.User;
import com.company.naspolke.model.auth.AuthenticationRequest;
import com.company.naspolke.model.auth.AuthenticationResponse;
import com.company.naspolke.service.RefreshTokenService;
import com.company.naspolke.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/auth")
public class HomeController {

    private JwtUtil jwtTokenUtil;
    private MyUserDetailsServiceImplementation userDetailsService;
    private UserService userService;
    private RefreshTokenService refreshTokenService;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public HomeController(JwtUtil jwtTokenUtil, MyUserDetailsServiceImplementation userDetailsService,
                          UserService userService, RefreshTokenService refreshTokenService,
                          PasswordEncoder passwordEncoder) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
        this.userService = userService;
        this.refreshTokenService = refreshTokenService;
        this.passwordEncoder = passwordEncoder;
    }

    @RequestMapping({ "/hello" })
    public String helloPage() {
        System.out.println(SecurityContextHolder.getContext().getAuthentication());
        return "Hello World";
    }

    @Transactional
    @PostMapping
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest,
                                                       HttpServletResponse response) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUserEmail());
        if (!userDetails.getUsername().equals(authenticationRequest.getUserEmail())
                && passwordEncoder.matches(authenticationRequest.getPassword(), userDetails.getPassword())) {
            throw new BadCredentialsException("Incorrect username or password");
        }
        Optional<User> user = userService.findUserByUserEmail(authenticationRequest.getUserEmail());
        final String accessToken = jwtTokenUtil.generateToken(userDetails, 1000 * 60 * 15);
        final String refreshToken = jwtTokenUtil.generateToken(userDetails, 1000 * 60 * 60 * 60);
        if (refreshTokenService.findByUser(user.get()).isEmpty()) {
            RefreshToken savedToken = new RefreshToken(refreshToken, user.get());
            refreshTokenService.saveToken(savedToken);
        } else {
            refreshTokenService.updateJwtByUser(refreshToken, user.get());
        }
        HttpHeaders headers = new HttpHeaders();
        headers.add("Set-Cookie",String.format("jwt=%s;", refreshToken)  +
                " Max-Age=86400; Secure; HttpOnly; SameSite=None");
        return ResponseEntity.ok().headers(headers)
                .body(new AuthenticationResponse(accessToken, List.of("ROLE_USER")));
    }
}
