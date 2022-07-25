package com.company.naspolke.service;

import com.company.naspolke.model.AppUser;
import com.company.naspolke.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
public class AppUserServiceImplementation implements AppUserService {

    private AppUserRepository appUserRepository;

    @Autowired
    public AppUserServiceImplementation(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @Override
    public void registerUser(AppUser appUser) {
        appUser.setEnabled(true);
        appUser.setTokenExpired(false);
        appUser.setApplicationRoles(Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")));
        appUser.setCompanyUserRole(Set.of());

        appUserRepository.save(appUser);
    }

    @Override
    public Optional<AppUser> findUserByUserEmail(String userEmail) {
        return Optional.ofNullable(appUserRepository.findByUserEmail(userEmail));
    }

    @Override
    public Optional<AppUser> findUserByUserId(UUID id) {
        return Optional.ofNullable(appUserRepository.findByUserId(id));
    }
}
