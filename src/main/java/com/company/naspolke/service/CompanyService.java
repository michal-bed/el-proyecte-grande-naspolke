package com.company.naspolke.service;

import com.company.naspolke.model.company.Company;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CompanyService {
    Optional<Company> getCompanyByKrsNumber(Long krsNumber);
    Optional<Company> getCompanyByCompanyId(UUID companyId);
//    ResponseEntity<Company> getCompanyData(String krsNumber);
    ResponseEntity<Company> getCompanyDtoFromKrsApi(String krsNumber);
    boolean checkForDuplicate(Long krsNumber);
    Company saveCompany(Company company);
    ResponseEntity<String> buildSaveResponse(Company company);
    List<Company> findAll();
}