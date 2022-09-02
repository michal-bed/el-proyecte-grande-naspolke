package com.company.naspolke.repository;

import com.company.naspolke.model.company.Address;
import com.company.naspolke.model.company.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CompanyRepository extends JpaRepository<Company, UUID> {
    Company findByKrsNumber(String krsNumber);
    Company findByCompanyId(UUID companyId);

    @RestResource(path = "all")
    List<Company> findBy();

    @RestResource(path = "updateCompanyName")
    @Transactional
    @Modifying
    @Query("UPDATE Company company SET company.companyName = ?1 WHERE company.companyId = ?2")
    void updateCompanyNameById(String companyName, UUID companyId);

    @RestResource(path = "updateShareCapital")
    @Transactional
    @Modifying
    @Query("UPDATE Company company SET company.shareCapital = ?1 WHERE company.companyId = ?2")
    void updateShareCapitalById(BigDecimal shareCapital, UUID companyId);

    @RestResource(path = "updateShareValue")
    @Transactional
    @Modifying
    @Query("UPDATE Company company SET company.shareValue = ?1 WHERE company.companyId = ?2")
    void updateShareValueById(BigDecimal shareValue, UUID companyId);

    @RestResource(path = "updateSharesCount")
    @Transactional
    @Modifying
    @Query("UPDATE Company company SET company.sharesCount = ?1 WHERE company.companyId = ?2")
    void updateSharesCountById(Integer sharesCount, UUID companyId);


    @RestResource(path = "updateBoardOfDirectorsTerm")
    @Transactional
    @Modifying
    @Query("UPDATE Company company SET company.boardOfDirectorsTerm = ?1 WHERE company.companyId = ?2")
    void updateBoardOfDirectorsTermById(Integer boardOfDirectorsTerm, UUID companyId);

    @RestResource(path = "updateBoardMembersTerm")
    @Transactional
    @Modifying
    @Query("UPDATE Company company SET company.boardMembersTerm = ?1 WHERE company.companyId = ?2")
    void updateBoardMembersTermById(Integer boardMembersTerm, UUID companyId);

    @RestResource(path = "updateAddress")
    @Transactional
    @Modifying
    @Query("UPDATE Company company SET company.address = ?1 WHERE company.companyId = ?2")
    void updateAddressById(Address address, UUID companyId);

}
