package com.company.naspolke.service;

import com.company.naspolke.model.Company;
import com.company.naspolke.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CompanyServiceImplementation implements CompanyService {

    private CompanyRepository companyRepository;

    @Autowired
    public CompanyServiceImplementation(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    public Optional<Company> getCompanyByKRSNumber(Long KRSNumber) {
        return Optional.ofNullable(companyRepository.findByKRSNumber(KRSNumber));
    }
}
