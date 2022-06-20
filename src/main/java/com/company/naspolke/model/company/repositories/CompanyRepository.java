package com.company.naspolke.model.company.repositories;

import com.company.naspolke.model.company.Company;

import java.util.List;
import java.util.Optional;

public interface CompanyRepository {
    List<Company> findByKrsNumber(Long krsNumber);
    List<Company> findAll();
//    Optional<List<Company>> findByKrsNumber(Long krsNumber);
    Company save(Company entity);
}
