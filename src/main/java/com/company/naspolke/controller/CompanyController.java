package com.company.naspolke.controller;

import com.company.naspolke.model.AppUser;
import com.company.naspolke.model.Company;
import com.company.naspolke.model.Role;
import com.company.naspolke.model.types.RoleType;
import com.company.naspolke.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000")
public class CompanyController {

    private CompanyService companyService;
    private AppUserService appUserService;
    private RoleService roleService;
    private CompanyUserRoleService companyUserRoleService;

    @Autowired
    public CompanyController(CompanyService companyService, AppUserService appUserService,
                             RoleService roleService, CompanyUserRoleService companyUserRoleService) {
        this.companyService = companyService;
        this.appUserService = appUserService;
        this.roleService = roleService;
        this.companyUserRoleService = companyUserRoleService;
    }

    @PostMapping(value = "/add-company")
    public void addNewCompany(@RequestBody String userEmail) {
        //TODO: potrzebuje obiektu spółki zapisanego już w bazie danych i to będzie zamiast
        //TODO: tego poniżej
        Company company = new Company();
        Optional<AppUser> appUser = appUserService.findUserByUserEmail(userEmail);
        Optional<Role> role = roleService.findRoleByRoleType(RoleType.OWNER);
        if (appUser.isPresent() && role.isPresent()) {
            companyUserRoleService.addNewMemberToCompany(company, appUser.get(), role.get());
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't find company or appUser");
        }
    }

    @PostMapping(value = "/add-member-to-company")
    public void addNewMemberToCompany(@RequestBody Long KRSNumber, String userEmail, String roleType) {
        Optional<Company> company = companyService.getCompanyByKRSNumber(KRSNumber);
        Optional<AppUser> appUser = appUserService.findUserByUserEmail(userEmail);
        Optional<Role> role = roleService.findRoleByRoleType(RoleType.valueOf(roleType));
        if (company.isPresent() && appUser.isPresent() && role.isPresent()) {
            companyUserRoleService.addNewMemberToCompany(company.get(), appUser.get(), role.get());
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't find company or appUser");
        }
    }

    @PostMapping(value = "/change-role")
    public void changeMemberRoleInCompany(@RequestBody Long KRSNumber, String userEmail, String roleType) {
        Optional<Company> company = companyService.getCompanyByKRSNumber(KRSNumber);
        Optional<AppUser> appUser = appUserService.findUserByUserEmail(userEmail);
        Optional<Role> role = roleService.findRoleByRoleType(RoleType.valueOf(roleType));
        if (company.isPresent() && appUser.isPresent() && role.isPresent()) {
            companyUserRoleService.changeMemberRoleInCompany(company.get(), appUser.get(), role.get());
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't find company or appUser");
        }
    }

    @DeleteMapping(value = "/delete-member")
    public void deleteMemberFromCompany(@RequestBody Long KRSNumber, String userEmail) {
        Optional<Company> company = companyService.getCompanyByKRSNumber(KRSNumber);
        Optional<AppUser> appUser = appUserService.findUserByUserEmail(userEmail);
        if (company.isPresent() && appUser.isPresent()) {
            companyUserRoleService.deleteMemberFromCompany(company.get(), appUser.get());
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't find company or appUser");
        }
    }
}
