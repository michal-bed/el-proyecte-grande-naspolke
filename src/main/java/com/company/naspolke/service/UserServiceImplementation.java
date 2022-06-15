package com.company.naspolke.service;

//import com.company.naspolke.model.Role;
import com.company.naspolke.model.AppUser;
//import com.company.naspolke.model.types.RoleType;
import com.company.naspolke.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImplementation implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImplementation(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void registerUser(AppUser appUser) {
        userRepository.save(appUser
//                new User(
//                randomUUID(), user.getUserName(), user.getUserSurname(), user.getUserEmail(), user.getUserPassword(),
//                true, false, Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
//                Set.of())
        );
    }

    @Override
    public Optional<AppUser> findUserByUserEmail(String userEmail) {
        return Optional.ofNullable(userRepository.findByUserEmail(userEmail));
    }
}
