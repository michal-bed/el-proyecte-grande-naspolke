package com.company.naspolke.service;

import com.company.naspolke.model.AppUser;
import com.company.naspolke.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service("userDetailsService")
@Transactional
public class MyUserDetailsServiceImplementation implements MyUserDetailService, UserDetailsService {

    private final AppUserRepository appUserRepository;

    @Autowired
    public MyUserDetailsServiceImplementation(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(// String userEmail
                                           String uuid
    ) throws UsernameNotFoundException {
        String login = "";
         Optional<AppUser> user = Optional.ofNullable(appUserRepository
         .findByUserId(UUID.fromString(uuid)));
//        Optional<AppUser> user = Optional.ofNullable(appUserRepository.findByUserEmail(userEmail));


        if (user.isEmpty()) {
            throw new UsernameNotFoundException("Could not find user");
        } else {
             login = user.get().getUserEmail();
        }

        return new org.springframework.security.core.userdetails.User(
               //  login != null ? login : user.get().getUserEmail(),
                user.get().getUserId().toString(),
                user.get().getUserPassword(),
                user.get().isEnabled(), true, true, true,
                List.of(new SimpleGrantedAuthority("ROLE_USER")));
    }
}
