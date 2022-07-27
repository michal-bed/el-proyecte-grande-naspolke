package com.company.naspolke.repository;

import com.company.naspolke.model.company.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CompanyRepository extends JpaRepository<Company, UUID> {
    Company findByKrsNumber(Long krsNumber);
    Company findByCompanyId(UUID companyId);

    @RestResource(path = "all")
    List<Company> findBy();
}
