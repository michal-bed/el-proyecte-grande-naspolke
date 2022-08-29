package com.company.naspolke.repository;

import com.company.naspolke.model.company.Address;
import com.company.naspolke.model.company.companyBodies.Partners.NaturalPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Repository
public interface NaturalPersonRepository extends JpaRepository<NaturalPerson, Long> {

    NaturalPerson findNaturalPersonById(Long naturalPersonId);

    @Transactional
    @Modifying
    @Query("UPDATE NaturalPerson np SET np.firstName = ?1 WHERE np.id = ?2")
    void updateNaturalPersonFirstName(String fieldToChange, Long memberId);

    @Transactional
    @Modifying
    @Query("UPDATE NaturalPerson np SET np.secondName = ?1 WHERE np.id = ?2")
    void updateNaturalPersonSecondName(String fieldToChange, Long memberId);

    @Transactional
    @Modifying
    @Query("UPDATE NaturalPerson np SET np.lastNameI = ?1 WHERE np.id = ?2")
    void updateNaturalPersonLastNameI(String fieldToChange, Long memberId);

    @Transactional
    @Modifying
    @Query("UPDATE NaturalPerson np SET np.lastNameII = ?1 WHERE np.id = ?2")
    void updateNaturalPersonLastNameII(String fieldToChange, Long memberId);

    @Transactional
    @Modifying
    @Query("UPDATE NaturalPerson np SET np.sharesCount = ?1 WHERE np.id = ?2")
    void updateNaturalPersonSharesCount(Integer fieldToChange, Long memberId);

    @Transactional
    @Modifying
    @Query("UPDATE NaturalPerson np SET np.sharesValue = ?1 WHERE np.id = ?2")
    void updateNaturalPersonSharesValue(BigDecimal fieldToChange, Long memberId);

    @Transactional
    @Modifying
    @Query("UPDATE NaturalPerson np SET np.address = ?1 WHERE np.id = ?2")
    void updateNaturalPersonAddress(Address address, Long memberId);
}
