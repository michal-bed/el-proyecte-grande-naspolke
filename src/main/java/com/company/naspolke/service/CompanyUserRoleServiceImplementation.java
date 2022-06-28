package com.company.naspolke.service;

import com.company.naspolke.model.AppUser;
import com.company.naspolke.model.company.Company;
import com.company.naspolke.model.Role;
import com.company.naspolke.model.aggregate.CompanyUserRole;
import com.company.naspolke.model.types.RoleType;
import com.company.naspolke.repository.AppUserRepository;
import com.company.naspolke.repository.CompanyRepository;
import com.company.naspolke.repository.CompanyUserRoleRepository;
import com.company.naspolke.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CompanyUserRoleServiceImplementation implements CompanyUserRoleService {

    private CompanyUserRoleRepository companyUserRoleRepository;
    private CompanyRepository companyRepository;
    private AppUserRepository appUserRepository;
    private RoleRepository roleRepository;

    @Autowired
    public CompanyUserRoleServiceImplementation(CompanyUserRoleRepository companyUserRoleRepository,
                CompanyRepository companyRepository, AppUserRepository appUserRepository,
                RoleRepository roleRepository) {
        this.companyUserRoleRepository = companyUserRoleRepository;
        this.companyRepository = companyRepository;
        this.appUserRepository = appUserRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public RoleType checkAppUserRoleTypeInCompany(UUID companyId, UUID userId) {
        return companyUserRoleRepository
                .findByCompanyIdAndUserId(companyId, userId)
                .getRole().getRoleType();
    }

    @Override
    public void addNewMemberToCompany(Company company, AppUser appUser, Role role) {
        if (company!= null) {
            CompanyUserRole companyUserRole = new CompanyUserRole();
            companyUserRole.setCompany(company);
            companyUserRole.setUser(appUser);
            companyUserRole.setRole(role);
            companyUserRole.setRegisteredDate(LocalDateTime.now());

            companyUserRoleRepository.save(companyUserRole);

            company.addCompanyUserRole(companyUserRole);
            appUser.addCompanyUserRole(companyUserRole);
            role.addCompanyUserRole(companyUserRole);

            companyRepository.save(company);
            appUserRepository.save(appUser);
            roleRepository.save(role);
        }
    }

    @Override
    @Transactional
    public void changeMemberRoleInCompany(Company company, AppUser appUser, Role role) {
        companyUserRoleRepository.setModifiedRole(role.getRoleId(), company.getCompanyId(), appUser.getUserId());

        Optional<CompanyUserRole> companyUserRole = Optional.ofNullable(companyUserRoleRepository
                .findByCompanyIdAndUserId(company.getCompanyId(), appUser.getUserId()));

        if (companyUserRole.isPresent()) {
            Set<CompanyUserRole> companySet = company.getCompanyUserRole().stream()
                    .map(e -> e.getCompany().getKrsNumber().equals(company.getKrsNumber()) &&
                            e.getUser().getUserEmail().equals(appUser.getUserEmail()) ? companyUserRole.get() : e)
                    .collect(Collectors.toSet());
            company.setCompanyUserRole(companySet);

            Set<CompanyUserRole> appUserSet = appUser.getCompanyUserRole().stream()
                    .map(e -> e.getCompany().getKrsNumber().equals(company.getKrsNumber()) &&
                            e.getUser().getUserEmail().equals(appUser.getUserEmail()) ? companyUserRole.get() : e)
                    .collect(Collectors.toSet());
            appUser.setCompanyUserRole(appUserSet);

            Set<CompanyUserRole> roleSet = role.getCompanyUserRole().stream()
                    .map(e -> e.getCompany().getKrsNumber().equals(company.getKrsNumber()) &&
                            e.getUser().getUserEmail().equals(appUser.getUserEmail()) ? companyUserRole.get() : e)
                    .collect(Collectors.toSet());
            role.setCompanyUserRole(roleSet);

            companyRepository.save(company);
            appUserRepository.save(appUser);
            roleRepository.save(role);
        }
    }

    @Override
    @Transactional
    public void deleteMemberFromCompany(Company company, AppUser appUser) {
        Optional<Role> foundedRole = Optional.ofNullable(companyUserRoleRepository.findByCompanyIdAndUserId(
                company.getCompanyId(), appUser.getUserId()).getRole());

        Set<CompanyUserRole> companySet = company.getCompanyUserRole().stream()
                .filter(e -> !(e.getCompany().getKrsNumber().equals(company.getKrsNumber()) &&
                        e.getUser().getUserEmail().equals(appUser.getUserEmail())))
                .collect(Collectors.toSet());
        company.setCompanyUserRole(companySet);

        Set<CompanyUserRole> appUserSet = appUser.getCompanyUserRole().stream()
                .filter(e -> !(e.getCompany().getKrsNumber().equals(company.getKrsNumber()) &&
                        e.getUser().getUserEmail().equals(appUser.getUserEmail())))
                .collect(Collectors.toSet());
        appUser.setCompanyUserRole(appUserSet);

        Set<CompanyUserRole> roleSet = foundedRole.get().getCompanyUserRole().stream()
                .filter(e -> !(e.getCompany().getKrsNumber().equals(company.getKrsNumber()) &&
                        e.getUser().getUserEmail().equals(appUser.getUserEmail())))
                .collect(Collectors.toSet());
        foundedRole.get().setCompanyUserRole(roleSet);

        companyRepository.save(company);
        appUserRepository.save(appUser);
        roleRepository.save(foundedRole.get());

        companyUserRoleRepository.deleteMemberFromCompany(company.getCompanyId(), appUser.getUserId());
    }
}
