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

//        System.out.println("JWTRef = " + refreshToken);
//
//        if (Objects.equals(refreshToken, "")){
//            // 204 - NO CONTENT
//            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
//        }
//
//        RefreshToken userInfo = refreshTokenService.findByJwt(refreshToken);
//        if (userInfo != null)
//        {
//            userInfo.setJwt("");
//            refreshTokenService.saveToken(userInfo);
//        }
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Set-Cookie","jwt=cleared;"  +
//                " Max-Age=86400; Secure; HttpOnly; SameSite=None");
//        return ResponseEntity.status(HttpStatus.NO_CONTENT).headers(headers).build();
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

//        return "redirect:/";

//        return new RedirectView("/");
    }
}
