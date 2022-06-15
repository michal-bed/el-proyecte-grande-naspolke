package com.company.naspolke.controller;

import com.company.naspolke.model.company.Company;
import com.company.naspolke.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
@RequestMapping(value = "/add-company")
public class AddCompanyController {

    private final CompanyService companyService;

    @GetMapping(value = "/{krsNumber}")
    public ResponseEntity<Company> getCompanyDtoFromKrsApi(@PathVariable("krsNumber") String krsNumber) {
//        Company company = companyService.getCompanyData(krsNumber);
//        HttpHeaders headers = new HttpHeaders();
//        ResponseEntity<Company> entity = new ResponseEntity<>(company, headers, HttpStatus.OK);
        return companyService.getCompanyData(krsNumber);
    }
}
// zwraca mi status w kluczu i body Map