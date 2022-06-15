package com.company.naspolke.repository;

import com.company.naspolke.model.aggregate.CompanyUserRole;
import com.company.naspolke.model.aggregate.CompanyUserRoleId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CompanyUserRoleRepository extends JpaRepository<CompanyUserRole, CompanyUserRoleId> {

    @Query("SELECT c FROM CompanyUserRole c WHERE c.primaryKey.company.companyId = ?1 AND c.primaryKey.appUser.userId = ?2")
    CompanyUserRole findByCompanyIdAndUserId(UUID companyId, UUID userId);
}
