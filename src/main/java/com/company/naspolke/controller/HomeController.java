package com.company.naspolke.controller;

import com.company.naspolke.model.AppUser;
import com.company.naspolke.service.AuthenticationService;
import com.company.naspolke.config.util.JwtUtil;
import com.company.naspolke.model.RefreshToken;
import com.company.naspolke.model.auth.AuthenticationRequest;
import com.company.naspolke.model.auth.AuthenticationResponse;
import com.company.naspolke.service.AppUserService;
import com.company.naspolke.service.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/")
public class HomeController {

    private final JwtUtil jwtTokenUtil;
    private final AppUserService appUserService;
    private final RefreshTokenService refreshTokenService;
    private final AuthenticationService authenticationService;

    @Autowired
    public HomeController(JwtUtil jwtTokenUtil, AppUserService appUserService,
                          RefreshTokenService refreshTokenService, AuthenticationService authenticationService) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.appUserService = appUserService;
        this.refreshTokenService = refreshTokenService;
        this.authenticationService = authenticationService;
    }

    @Transactional
    @PostMapping(value = "/auth")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {

        UserDetails userDetails = authenticationService.authenticateAndGetUserDetails(authenticationRequest);
        Optional<AppUser> user = appUserService.findUserByUserEmail(authenticationRequest.getUsername());

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
                .body(new AuthenticationResponse(accessToken,
                        foundUser.getApplicationRoles()
                                .stream().map(SimpleGrantedAuthority::getAuthority)
                                .collect(Collectors.toList()),
                        foundUser.getUserEmail()));
    }
}
