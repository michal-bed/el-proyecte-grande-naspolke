package com.company.naspolke.repository;

import com.company.naspolke.model.company.companyBodies.Partners.JuridicalPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Repository
public interface JuridicalPersonRepository extends JpaRepository<JuridicalPerson, Long> {

    @Transactional
    @Modifying
    @Query("UPDATE JuridicalPerson jp SET jp.name = ?1 WHERE jp.id = ?2")
    void updateJuridicalPersonName(String fieldToChange, Long memberId);

    @Transactional
    @Modifying
    @Query("UPDATE JuridicalPerson jp SET jp.sharesCount = ?1 WHERE jp.id = ?2")
    void updateJuridicalPersonSharesCount(Integer fieldToChange, Long memberId);

    @Transactional
    @Modifying
    @Query("UPDATE JuridicalPerson jp SET jp.sharesValue = ?1 WHERE jp.id = ?2")
    void updateJuridicalPersonSharesValue(BigDecimal fieldToChange, Long memberId);
}
