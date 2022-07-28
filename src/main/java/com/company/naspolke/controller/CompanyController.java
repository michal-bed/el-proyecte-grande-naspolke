package com.company.naspolke.controller;

import com.company.naspolke.helpers.adapters.mocks.MocksData;
import com.company.naspolke.config.util.JwtUtil;
import com.company.naspolke.model.AppUser;
import com.company.naspolke.model.Role;
import com.company.naspolke.model.company.Company;
import com.company.naspolke.model.types.RoleType;
import com.company.naspolke.service.*;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000")
public class CompanyController {

    private CompanyService companyService;
    private AppUserService appUserService;
    private JwtUtil jwtUtil;
    private RoleService roleService;
    private CompanyUserRoleService companyUserRoleService;

    @Autowired
    public CompanyController(CompanyService companyService, AppUserService appUserService, JwtUtil jwtUtil,
                             RoleService roleService, CompanyUserRoleService companyUserRoleService) {
        this.companyService = companyService;
        this.appUserService = appUserService;
        this.jwtUtil = jwtUtil;
        this.roleService = roleService;
        this.companyUserRoleService = companyUserRoleService;
    }

    @PostMapping(value = "/add-company")
    public ResponseEntity<String> addNewCompany(HttpServletRequest request, @RequestBody Company newCompany) {
        UUID loggedUserId = jwtUtil.getUserId(request);
        Optional<AppUser> appUser = appUserService.findUserByUserId(loggedUserId);
        Optional<Role> role = roleService.findRoleByRoleType(RoleType.OWNER);
        if (appUser.isPresent() && role.isPresent()) {
            Company savedCompany = companyService.saveCompany(newCompany);
            companyUserRoleService.addNewMemberToCompany(savedCompany, appUser.get(), role.get());
            return companyService.buildSaveResponse(savedCompany);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't find company or appUser");
        }
    }

    @PostMapping(value = "/add-member-to-company")
    public void addNewMemberToCompany(@RequestBody ObjectNode objectNode) {
        Optional<Company> company = companyService.getCompanyByCompanyId(UUID.fromString(objectNode.get("companyId").asText()));
        Optional<AppUser> appUser = appUserService.findUserByUserEmail(objectNode.get("userEmail").asText());
        Optional<Role> role = roleService.findRoleByRoleType(RoleType.valueOf(objectNode.get("roleType").asText()));
        if (company.isPresent() && appUser.isPresent() && role.isPresent()) {
            companyUserRoleService.addNewMemberToCompany(company.get(), appUser.get(), role.get());
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't find company or appUser");
        }
    }

    @PutMapping(value = "/change-role")
    public void changeMemberRoleInCompany(@RequestBody ObjectNode objectNode) {
        Optional<Company> company = companyService.getCompanyByCompanyId(UUID.fromString(objectNode.get("companyId").asText()));
        Optional<AppUser> appUser = appUserService.findUserByUserEmail(objectNode.get("userEmail").asText());
        Optional<Role> role = roleService.findRoleByRoleType(RoleType.valueOf(objectNode.get("roleType").asText()));
        if (company.isPresent() && appUser.isPresent() && role.isPresent()) {
            companyUserRoleService.changeMemberRoleInCompany(company.get(), appUser.get(), role.get());
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't find company or appUser");
        }
    }

    @DeleteMapping(value = "/delete-member")
    public void deleteMemberFromCompany(@RequestBody ObjectNode objectNode) {
        Optional<Company> company = companyService.getCompanyByCompanyId(UUID.fromString(objectNode.get("companyId").asText()));
        Optional<AppUser> appUser = appUserService.findUserByUserEmail(objectNode.get("userEmail").asText());
        if (company.isPresent() && appUser.isPresent()) {
            companyUserRoleService.deleteMemberFromCompany(company.get(), appUser.get());
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't find company or appUser");
        }
    }

    @GetMapping(value = "/add-company/{krsNumber}")
    public ResponseEntity<Company> getCompanyDataFromKrsApi(@PathVariable("krsNumber") String krsNumber) {
        return companyService.getCompanyDtoFromKrsApi(krsNumber);
    }

    @GetMapping(value = "/find-company-to-membership-request/{krsNumber}", produces = {"application/json"})
    public ResponseEntity<Company> getCompanyDetails(@PathVariable String krsNumber) {
        Optional<Company> company = companyService.getCompanyByKrsNumber(krsNumber);
        if (company.isPresent()) {
            return ResponseEntity.ok(company.get());
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't find company");
        }
    }
    @GetMapping(value = "/company/{id}")
    public Company getCompanyById(@PathVariable String id) {
        return companyService.getCompanyById(UUID.fromString(id));
      //  return MocksData.getMockCompany();
    }
}
