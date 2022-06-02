package com.company.naspolke.config.spring;

import com.company.naspolke.model.AppUser;
import com.company.naspolke.repository.UserRepository;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Component
public class SetupDataLoader implements
        ApplicationListener<ContextRefreshedEvent> {

//    @PersistenceContext // or even @Autowired
//    private EntityManager em;

//    @PersistenceUnit
//    private EntityManagerFactory entityManagerFactory;

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
        createUserIfNotFound("test@test.com", new HashSet<>(Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))));

        alreadySetup = true;
    }

    @Transactional
    void createUserIfNotFound(String email, Set<SimpleGrantedAuthority> roles) {
        AppUser foundUser = userRepository.findByEmail(email);
        if(foundUser == null)
        {
            AppUser user = new AppUser();
            user.setLogin("test");
            user.setFirstName("Test");
            user.setLastName("Test");
            user.setPassword(passwordEncoder.encode("test"));
            user.setEmail(email);
            user.setEnabled(true);
            userRepository.save(user);
//            EntityManager em = entityManagerFactory.createEntityManager();
//            em.getTransaction().begin();
//
//            AppUser a = em.find(AppUser.class, user.getId());
            user.getRoles().addAll(roles);

//            em.getTransaction().commit();
//            em.close();
            // userRepository.updateRolesByUserId(roles, user.getId());
        }

    }
}
