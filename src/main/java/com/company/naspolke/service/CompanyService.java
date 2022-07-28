package com.company.naspolke.service;

import com.company.naspolke.model.company.Company;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface CompanyService {
    Optional<Company> getCompanyByKrsNumber(String krsNumber);
    Optional<Company> getCompanyByCompanyId(UUID companyId);
//    ResponseEntity<Company> getCompanyData(String krsNumber);
    ResponseEntity<Company> getCompanyDtoFromKrsApi(String krsNumber);
    Company saveCompany(Company company);
    boolean checkForDuplicate(String krsNumber);
    ResponseEntity<String> buildSaveResponse(Company company);
    List<Company> findAll();
    Company getCompanyById(UUID uuid);
}