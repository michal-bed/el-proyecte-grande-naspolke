package com.company.naspolke.controller;

import com.company.naspolke.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class StartController {

    private final CompanyService companyService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String start() {
        companyService.getCompanyData("0000405063");
        return "hello world";
    }
}
