package com.company.naspolke.service;

import com.company.naspolke.model.User;
import com.company.naspolke.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service("userDetailsService")
@Transactional
public class MyUserDetailsServiceImplementation implements MyUserDetailService, UserDetailsService {

    private UserRepository userRepository;

    @Autowired
    public MyUserDetailsServiceImplementation(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        String login = "";
        Optional<User> user = Optional.ofNullable(userRepository.findByUserEmail(userEmail));

        if (user.isEmpty()) {
            throw new UsernameNotFoundException("Could not find user");
        } else {
             login = user.get().getUserEmail();
        }

        return new org.springframework.security.core.userdetails.User(
                login != null ? login : user.get().getUserEmail(), user.get().getUserPassword(),
                user.get().isEnabled(), true, true, true,
                List.of(new SimpleGrantedAuthority("ROLE_USER")));
    }
}