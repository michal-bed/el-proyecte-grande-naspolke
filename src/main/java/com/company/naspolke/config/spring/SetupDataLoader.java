package com.company.naspolke.config.spring;

import com.company.naspolke.model.User;
import com.company.naspolke.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Component
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent> {

    boolean alreadySetup = false;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public SetupDataLoader(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if (!alreadySetup) {
            createUserIfNotFound("test@test.com",
                    new HashSet<>(Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))));
            alreadySetup = true;
        }
    }

    @Transactional
    void createUserIfNotFound(String email, Set<SimpleGrantedAuthority> roles) {
        User foundUser = userRepository.findByUserEmail(email);
        if (foundUser == null) {
            User user = new User();
            user.setUserName("Test");
            user.setUserSurname("Test");
            user.setUserPassword(passwordEncoder.encode("test"));
            user.setUserEmail(email);
            user.setEnabled(true);
            user.getRoles().addAll(roles);
            userRepository.save(user);
        }
    }
}
