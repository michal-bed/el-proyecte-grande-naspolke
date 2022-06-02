package com.company.naspolke.config.security;

import com.company.naspolke.model.AppUser;
import com.company.naspolke.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("userDetailsService")
@Transactional
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail)
            throws UsernameNotFoundException {

        AppUser user = userRepository.findByLogin(usernameOrEmail);
        String login = null;
        if (user == null) {
            user = userRepository.findByEmail(usernameOrEmail);
            if (user == null)
                throw new UsernameNotFoundException(usernameOrEmail);
        }
        else {
             login = user.getLogin();
        }

        return new org.springframework.security.core.userdetails.User(
                login != null ? login : user.getEmail(), user.getPassword(), user.isEnabled(), true, true,
                true, List.of(new SimpleGrantedAuthority("ROLE_USER")));
    }
}
