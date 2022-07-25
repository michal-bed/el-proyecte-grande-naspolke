package com.company.naspolke.config.filter;

import com.company.naspolke.service.MyUserDetailsServiceImplementation;
import com.company.naspolke.config.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

//@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    List<String> EXCLUDED_PATHS = Arrays.asList("/", "/login", "/auth", "/logout");

    private MyUserDetailsServiceImplementation userDetailsService;
    private JwtUtil jwtUtil;

    @Autowired
    public JwtRequestFilter(MyUserDetailsServiceImplementation userDetailsService, JwtUtil jwtUtil) {
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
    }

    public JwtRequestFilter() {
        replicateObject(new JwtRequestFilterCreator().createJwtRequestFilter());
    }

    private void replicateObject(JwtRequestFilter patternObject) {
        this.userDetailsService = patternObject.userDetailsService;
        this.jwtUtil = patternObject.jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {

        if (EXCLUDED_PATHS.contains(request.getServletPath())) {
            chain.doFilter(request, response);
            return;
        }
        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            username = jwtUtil.extractUsername(jwt); // uuid
        }

        if (username != null && (SecurityContextHolder.getContext().getAuthentication()
                instanceof AnonymousAuthenticationToken ||
                SecurityContextHolder.getContext().getAuthentication() == null)) {

            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            if (jwtUtil.validateToken(jwt, userDetails)) {

                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails.getUsername(), null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                System.out.println(SecurityContextHolder.getContext().getAuthentication());
            }
        } else {
            System.out.println("Not validated JWT");
        }
        chain.doFilter(request, response);
    }
}
