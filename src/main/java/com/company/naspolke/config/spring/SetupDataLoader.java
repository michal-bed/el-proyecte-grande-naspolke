package com.company.naspolke.config.spring;

import com.company.naspolke.model.AppUser;
import com.company.naspolke.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@Component
public class SetupDataLoader implements
        ApplicationListener<ContextRefreshedEvent> {

    boolean alreadySetup = false;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent event) {

        if (alreadySetup)
            return;
        createUserIfNotFound("test@test.com", List.of(new SimpleGrantedAuthority("ROLE_USER")));

        alreadySetup = true;
    }

    @Transactional
    void createUserIfNotFound(String email, Collection<? extends GrantedAuthority> roles) {
        AppUser foundUser = userRepository.findByEmail(email);
        if(foundUser == null)
        {
            AppUser user = new AppUser();
            user.setLogin("test");
            user.setFirstName("Test");
            user.setLastName("Test");
            user.setPassword(passwordEncoder.encode("test"));
            user.setRoles(roles);
            user.setEmail(email);
            user.setEnabled(true);
            userRepository.save(user);
        }

    }
}
