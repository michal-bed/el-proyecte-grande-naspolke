package com.company.naspolke.controller;
import com.company.naspolke.config.util.JwtUtil;
import com.company.naspolke.model.company.Company;
import com.company.naspolke.service.CompanyService;
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

    @Autowired
    public UserPageController(CompanyService companyService, JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
        this.companyService = companyService;
    }

    @GetMapping(value = "/get-companies")
    public List<Company> getUserCompanies(HttpServletRequest request) {
        UUID loggedUserId = jwtUtil.getUserId(request);

        return companyService.findAll();
    }

    @GetMapping(value = "/get-company-by-id/{companyId}")
    public Optional<Company> getCompanyById(@PathVariable UUID companyId) {
        //autoryzacja?
        return companyService.getCompanyByCompanyId(companyId);
    }
}
