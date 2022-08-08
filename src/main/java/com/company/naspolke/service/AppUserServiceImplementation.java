package com.company.naspolke.service;

import com.company.naspolke.model.AppUser;
import com.company.naspolke.model.Role;
import com.company.naspolke.model.aggregate.CompanyUserRole;
import com.company.naspolke.model.company.Company;
import com.company.naspolke.model.types.RoleType;
import com.company.naspolke.repository.AppUserRepository;
import com.company.naspolke.repository.CompanyRepository;
import com.company.naspolke.repository.CompanyUserRoleRepository;
import com.company.naspolke.repository.RoleRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.*;
import java.util.Collections;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
public class AppUserServiceImplementation implements AppUserService {

    private final AppUserRepository appUserRepository;
    private final RoleRepository roleRepository;
    private final CompanyRepository companyRepository;
    private final CompanyUserRoleRepository companyUserRoleRepository;

    @Autowired
    public AppUserServiceImplementation(AppUserRepository appUserRepository, RoleRepository roleRepository,
                                        CompanyRepository companyRepository, CompanyUserRoleRepository companyUserRoleRepository) {
        this.appUserRepository = appUserRepository;
        this.roleRepository = roleRepository;
        this.companyRepository = companyRepository;
        this.companyUserRoleRepository = companyUserRoleRepository;
    }

    @Override
    public void registerUser(AppUser appUser) throws UnsupportedEncodingException, MessagingException {
        String randomCode = RandomString.make(64);
        appUser.setVerificationCode(randomCode);
        appUser.setEnabled(false);
        appUser.setTokenExpired(false);
        appUser.setApplicationRoles(Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")));
        appUser.setCompanyUserRole(Set.of());

        appUserRepository.save(appUser);
    }

    @Override
    public Optional<AppUser> findAppUserByVerificationCode(String verificationCode) {
        return appUserRepository.findByVerificationCode(verificationCode);
    }

    @Override
    public void verifyRegisterUser(AppUser appUser) {
        appUser.setVerificationCode(null);
        appUser.setEnabled(true);
        appUserRepository.save(appUser);

    }

    @Override
    public Optional<AppUser> findUserByUserEmail(String userEmail) {
        return Optional.ofNullable(appUserRepository.findByUserEmail(userEmail));
    }

    @Override
    @Transactional
    public void updateAppUser(AppUser appUser) {
        appUserRepository.saveAndFlush(appUser);
    }

    @Override
    public List<AppUser> getCompanyOwners(Long krsNumber) {
        List<AppUser> companyOwners = new ArrayList<>();
        Optional<Role> role = Optional.ofNullable(roleRepository.findRoleByRoleType(RoleType.OWNER));
        Optional<Company> company = Optional.ofNullable(companyRepository.findByKrsNumber(Long.valueOf(krsNumber)));
        if (role.isPresent() && company.isPresent()) {
            List<CompanyUserRole> companyOwnersIds = companyUserRoleRepository.findAppUserByCompanyAndByRole(
                    company.get().getCompanyId(), role.get().getRoleId());
            for (CompanyUserRole _companyUserRole : companyOwnersIds) {
                companyOwners.add(appUserRepository.findByUserId(_companyUserRole.getPrimaryKey().getAppUser().getUserId()));
            }
        }
        return companyOwners;
    }

    @Override
    public Optional<AppUser> findUserByUserId(UUID id) {
        return Optional.ofNullable(appUserRepository.findByUserId(id));
    }

}
