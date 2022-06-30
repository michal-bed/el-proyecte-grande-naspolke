package com.company.naspolke.repository;

import com.company.naspolke.model.aggregate.CompanyUserRole;
import com.company.naspolke.model.aggregate.CompanyUserRoleId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CompanyUserRoleRepository extends JpaRepository<CompanyUserRole, CompanyUserRoleId> {

    @Query("SELECT c FROM CompanyUserRole c WHERE c.primaryKey.company.companyId = ?1 AND c.primaryKey.appUser.userId = ?2")
    CompanyUserRole findByCompanyIdAndUserId(UUID companyId, UUID userId);

    @Modifying
    @Query("UPDATE CompanyUserRole c SET c.primaryKey.role.roleId = ?1 WHERE c.primaryKey.company.companyId = ?2 AND c.primaryKey.appUser.userId = ?3")
    void setModifiedRole(int roleId, UUID companyId, UUID userId);

    @Modifying
    @Query("DELETE FROM CompanyUserRole c WHERE c.primaryKey.company.companyId = ?1 AND c.primaryKey.appUser.userId = ?2")
    void deleteMemberFromCompany(UUID companyId, UUID userId);

    @Query("SELECT a FROM CompanyUserRole a WHERE a.primaryKey.company.companyId = ?1 AND a.primaryKey.role.roleId = ?2")
    List<CompanyUserRole> findAppUserByCompanyAndByRole(UUID companyId, int role);
}
