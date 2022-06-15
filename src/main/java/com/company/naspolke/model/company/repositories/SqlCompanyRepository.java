package com.company.naspolke.model.company.repositories;

import com.company.naspolke.model.company.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
interface SqlCompanyRepository extends CompanyRepository, JpaRepository<Company, UUID> {
}
