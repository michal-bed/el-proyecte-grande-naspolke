package com.company.naspolke.controller;
import com.company.naspolke.config.util.JwtUtil;
import com.company.naspolke.model.company.Company;
import com.company.naspolke.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
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

    @PostMapping(value = "/get-companies")
    public List<Company> getUserCompanies(HttpServletRequest request) {
        UUID loggedUserId = jwtUtil.getUserId(request);


        return companyService.findAll();
    }
}
