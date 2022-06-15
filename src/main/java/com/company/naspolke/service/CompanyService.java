package com.company.naspolke.service;

import com.company.naspolke.model.Company;

import java.util.Optional;

public interface CompanyService {
    Optional<Company> getCompanyByKRSNumber(Long KRSNumber);
}
