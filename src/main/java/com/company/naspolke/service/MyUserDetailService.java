package com.company.naspolke.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface MyUserDetailService {
    UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException;
}
