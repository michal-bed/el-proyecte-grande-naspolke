package com.company.naspolke.service;

import com.company.naspolke.model.company.Company;
import org.springframework.http.ResponseEntity;

import java.util.Optional;
import java.util.UUID;


public interface CompanyService {

    Optional<Company> getCompanyByKrsNumber(String krsNumber);

    ResponseEntity<Company> getCompanyDtoFromKrsApi(String krsNumber);

    boolean checkForDuplicate(String krsNumber);

    Company saveCompany(Company company);

    ResponseEntity<String> buildSaveResponse(Company company);
}