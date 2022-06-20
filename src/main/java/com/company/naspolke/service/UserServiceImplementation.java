package com.company.naspolke.service;

import com.company.naspolke.model.User;
import com.company.naspolke.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

import static java.util.UUID.randomUUID;

@Service
public class UserServiceImplementation implements UserService {

    private UserRepository userRepository;

    @Autowired
    public UserServiceImplementation(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void registerUser(User user) {
        userRepository.save(new User(
                randomUUID(), user.getUserName(), user.getUserSurname(), user.getUserEmail(), user.getUserPassword(),
                true, false, Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))));
    }

    @Override
    public Optional<User> findUserByUserEmail(String userEmail) {
        return Optional.ofNullable(userRepository.findByUserEmail(userEmail));
    }
}
