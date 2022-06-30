package com.company.naspolke.config.security;

import com.company.naspolke.model.RefreshToken;
import com.company.naspolke.service.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;

@Component
public class CustomLogoutSuccessHandler extends SimpleUrlLogoutSuccessHandler {

    @Autowired
    RefreshTokenService refreshTokenService;

    @Override
    public void onLogoutSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) throws ServletException, IOException {

        Cookie[] cookies = request.getCookies();
        String refreshToken = null;

        for (Cookie aCookie : cookies) {
            String name = aCookie.getName();

            if (name.equals("jwt")) {
                refreshToken = aCookie.getValue();

                break;
            }

        }
        System.out.println("JWTRef = " + refreshToken);

        if (Objects.equals(refreshToken, ""))
        {
            super.onLogoutSuccess(request, response, authentication);
            return;
        }

        RefreshToken userInfo = refreshTokenService.findByJwt(refreshToken);
        if (userInfo != null)
        {
            userInfo.setJwt("");
            refreshTokenService.saveToken(userInfo);
        }

        response.setHeader("Set-Cookie", "jwt=;"  +
                " Max-Age=86400; Secure; HttpOnly; SameSite=None");
        super.onLogoutSuccess(request, response, authentication);
    }

}
