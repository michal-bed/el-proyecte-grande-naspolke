package com.company.naspolke.service;

import com.company.naspolke.model.AppUser;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AppUserService {
    void registerUser(AppUser appUser) throws UnsupportedEncodingException, MessagingException;
    Optional<AppUser> findAppUserByVerificationCode(String verificationCode);
    void verifyRegisterUser(AppUser appUser);
    Optional<AppUser> findUserByUserEmail(String userEmail);
    Optional<AppUser> findUserByUserId(UUID id);
    void updateAppUser(AppUser appUser);
    List<AppUser> getCompanyOwners(Long krsNumber);
}
