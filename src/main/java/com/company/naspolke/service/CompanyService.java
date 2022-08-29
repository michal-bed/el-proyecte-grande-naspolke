package com.company.naspolke.service;

import com.company.naspolke.model.company.Address;
import com.company.naspolke.model.company.Company;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CompanyService {
    Optional<Company> getCompanyByKrsNumber(String krsNumber);
    Optional<Company> getCompanyByCompanyId(UUID companyId);
    ResponseEntity<Company> getCompanyDtoFromKrsApi(String krsNumber);
    Company saveCompany(Company company);
    boolean checkForDuplicate(String krsNumber);
    ResponseEntity<String> buildSaveResponse(Company company);
    List<Company> findAll();
    Company getCompanyById(UUID uuid);
    void updateAddressById(Address address, UUID companyId);
    void updateCompany(Company company);
    void updateBoardMember(String keys, String fieldToChange, Long memberId);
    void updateDirectorMember(String keys, String fieldToChange, Long memberId);
    void updateIndividualPartner(String keys, String fieldToChange, Long memberId);
    void updateCompanyPartner(String keys, String fieldToChange, Long memberId);
    void updateIndividualPartnerAddress(ObjectNode objectNode, Long companyPartnerId);
    void updateCompanyPartnerAddress(ObjectNode objectNode, Long companyPartnerId);
}
