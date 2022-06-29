package com.company.naspolke.service;

import com.company.naspolke.model.company.Company;
import org.springframework.http.ResponseEntity;

import java.util.Optional;


public interface CompanyService {


    Optional<Company> getCompanyByKrsNumber(String krsNumber);

    public ResponseEntity<Company> getCompanyDtoFromKrsApi(String krsNumber);

    public boolean checkForDuplicate(String krsNumber);

    public Company saveCompany(Company company);

    ResponseEntity<String> buildSaveResponse(Company company);
}