package com.company.naspolke.controller;

import com.company.naspolke.config.util.JwtUtil;
import com.company.naspolke.model.AppUser;
import com.company.naspolke.model.Role;
import com.company.naspolke.model.company.Address;
import com.company.naspolke.model.company.Company;
import com.company.naspolke.model.types.RoleType;
import com.company.naspolke.service.AppUserService;
import com.company.naspolke.service.CompanyService;
import com.company.naspolke.service.CompanyUserRoleService;
import com.company.naspolke.service.RoleService;
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
        Optional<Company> company = companyService.getCompanyByKrsNumber(Long.valueOf(krsNumber));
        if (company.isPresent()) {
            return ResponseEntity.ok(company.get());
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't find company");
        }
    }

    @PatchMapping(value = "/update-company-address")
    public void updateAddressInCompany(@RequestBody ObjectNode objectNode) {
        UUID companyId = UUID.fromString(objectNode.get("companyId").asText());
        Address companyAddress = companyService.getCompanyByCompanyId(companyId).get().getAddress();
        var streetName = objectNode.get("streetName");
        if (streetName != null)
        {
            companyAddress.setStreetName(streetName.asText());

        }
        var streetNumber = objectNode.get("streetNumber");
        if (streetNumber != null)
        {
            companyAddress.setStreetNumber(streetNumber.asText());
        }
        var localNumber = objectNode.get("localNumber");
        if (localNumber != null)
        {
            companyAddress.setLocalNumber(localNumber.asText());
        }
        var city = objectNode.get("city");
        if (city != null)
        {
            companyAddress.setCity(city.asText());
        }
        var zipCode = objectNode.get("zipCode");
        if (zipCode != null)
        {
            companyAddress.setZipCode(zipCode.asText());
        }
        var postOffice = objectNode.get("postOffice");
        if (postOffice != null)
        {
            companyAddress.setPostOffice(postOffice.asText());
        }

        companyService.updateAddressById(companyAddress, companyId);
    }

    @PutMapping(value = "/edit-member/{memberId}/{selectedData}/{keys}/{fieldToChange}")
    public void updateBoardMemberOrDirectorInfo(@PathVariable String fieldToChange, @PathVariable String keys,
                                                @PathVariable String memberId, @PathVariable String selectedData) {
        if (fieldToChange != null && selectedData != null && memberId != null && keys != null) {
            switch (selectedData) {
                case "boardMembers" -> companyService.updateBoardMember(keys, fieldToChange, Long.valueOf(memberId));
                case "boardOfDirectors" -> companyService.updateDirectorMember(keys, fieldToChange, Long.valueOf(memberId));
            }
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't find company");
        }
    }

    @PostMapping(value = "/edit-partner/{companyPartnerId}/{selectedData}/{keys}/{fieldToChange}")
    public void updateJuridicalOrNaturalPersonInfo(@PathVariable String fieldToChange, @PathVariable String keys,
                @PathVariable String companyPartnerId, @PathVariable String selectedData, @RequestBody ObjectNode objectNode) {
        System.out.println(objectNode.elements());
        if (fieldToChange != null && selectedData != null && companyPartnerId != null && keys != null) {
            switch (selectedData) {
                case "individualPartners" -> companyService.updateIndividualPartner(keys, fieldToChange, Long.valueOf(companyPartnerId));
                case "partnerCompanies" -> companyService.updateCompanyPartner(keys, fieldToChange, Long.valueOf(companyPartnerId));
            }
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can't find company");
        }
    }
}
