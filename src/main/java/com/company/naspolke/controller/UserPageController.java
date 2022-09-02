package com.company.naspolke.controller;
import com.company.naspolke.config.util.JwtUtil;
import com.company.naspolke.model.AppUser;
import com.company.naspolke.model.company.Company;
import com.company.naspolke.service.AppUserService;
import com.company.naspolke.service.CompanyService;
import com.company.naspolke.service.CompanyUserRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000")
public class UserPageController {
    private final JwtUtil jwtUtil;
    private CompanyService companyService;
    private CompanyUserRoleService companyUserRoleService;

    @Autowired
    public UserPageController(CompanyService companyService, CompanyUserRoleService companyUserRoleService, JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
        this.companyService = companyService;
        this.companyUserRoleService = companyUserRoleService;
    }

    @GetMapping(value = "/get-companies")
    public List<Company> getUserCompanies(HttpServletRequest request) {
        UUID loggedUserId = jwtUtil.getUserId(request);
        List<Company> companies = companyUserRoleService.findCompaniesByUserId(loggedUserId);
        System.out.println(companies);
        return companies;
    }

    @GetMapping(value = "/get-company-by-id/{companyId}")
    public Optional<Company> getCompanyById(@PathVariable UUID companyId) {
        //autoryzacja?
        return companyService.getCompanyByCompanyId(companyId);
    }
}
