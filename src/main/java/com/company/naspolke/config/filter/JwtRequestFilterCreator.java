package com.company.naspolke.config.filter;

import com.company.naspolke.config.security.MyUserDetailsService;
import com.company.naspolke.config.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtRequestFilterCreator {

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Bean
    public JwtRequestFilter createJwtRequestFilter() {
        return new JwtRequestFilter(userDetailsService, jwtUtil);
    }

    @Bean
    public FilterRegistrationBean<JwtRequestFilter> registration(JwtRequestFilter filter) {
        FilterRegistrationBean<JwtRequestFilter> registration = new FilterRegistrationBean<JwtRequestFilter>(filter);
        registration.setEnabled(false);
        return registration;
    }
}
