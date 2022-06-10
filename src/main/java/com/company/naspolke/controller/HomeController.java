package com.company.naspolke.controller;

import com.company.naspolke.config.security.MyUserDetailsService;
import com.company.naspolke.config.util.JwtUtil;
import com.company.naspolke.model.AppUser;
import com.company.naspolke.model.RefreshToken;
import com.company.naspolke.model.auth.AuthenticationRequest;
import com.company.naspolke.model.auth.AuthenticationResponse;
import com.company.naspolke.repository.RefreshTokenRepository;
import com.company.naspolke.repository.UserRepository;
import com.company.naspolke.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
class HomeController {

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    AuthenticationService authenticationService;


    @RequestMapping({ "/hello" })
    public String helloPage() {
        System.out.println(SecurityContextHolder.getContext().getAuthentication());
        return "Hello World";
    }

    @Transactional
    @RequestMapping(value = "/auth", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
        UserDetails userDetails = authenticationService.authenticateAndGetUserDetails(authenticationRequest);
        AppUser user = userRepository.findByEmail(authenticationRequest.getUsername());
        if (user == null)
            user = userRepository.findByLogin(authenticationRequest.getUsername());
        final String accessToken = jwtTokenUtil.generateToken(userDetails, 1000 * 60 * 15);
        final String refreshToken = jwtTokenUtil.generateToken(userDetails, 1000 * 60 * 60 * 60);
        if (refreshTokenRepository.findByUser(user) == null) {
            RefreshToken savedToken = new RefreshToken(refreshToken, user);
            refreshTokenRepository.save(savedToken);
        }
        else {
            refreshTokenRepository.updateJwtByUser(refreshToken, user);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add("Set-Cookie",String.format("jwt=%s;", refreshToken)  + " Max-Age=86400; Secure; HttpOnly; SameSite=None");

        return ResponseEntity.ok().headers(headers)
                .body(new AuthenticationResponse(accessToken, List.of("ROLE_USER")));
    }

}
