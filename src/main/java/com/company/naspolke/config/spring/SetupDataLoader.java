package com.company.naspolke.config.spring;

import com.company.naspolke.model.AppUser;
import com.company.naspolke.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

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
        AppUser foundAppUser = userRepository.findByUserEmail(email);
        if (foundAppUser == null) {
            AppUser appUser = new AppUser();
            appUser.setUserName("Test");
            appUser.setUserSurname("Test");
            appUser.setUserPassword(passwordEncoder.encode("test"));
            appUser.setUserEmail(email);
            appUser.setEnabled(true);
            appUser.getApplicationRoles().addAll(roles);
//            user.setCompanyRoles(Set.of());
            userRepository.save(appUser);
        }
    }
}
