package com.company.naspolke.service;

import com.company.naspolke.helpers.adapters.MonoStringToCompanyAdapter;
import com.company.naspolke.model.company.Address;
import com.company.naspolke.model.company.Company;
import com.company.naspolke.repository.CompanyRepository;
import com.company.naspolke.webclient.krs.KrsClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class CompanyServiceImplementation implements CompanyService {

    private CompanyRepository companyRepository;
    private final KrsClient krsClient;
    private final MonoStringToCompanyAdapter monoStringToCompanyAdapter;

    @Autowired
    public CompanyServiceImplementation(CompanyRepository companyRepository, KrsClient krsClient, MonoStringToCompanyAdapter monoStringToCompanyAdapter) {
        this.companyRepository = companyRepository;
        this.krsClient = krsClient;
        this.monoStringToCompanyAdapter = monoStringToCompanyAdapter;
    }

    @Override
    public ResponseEntity<com.company.naspolke.model.company.Company> getCompanyDtoFromKrsApi(String krsNumber) {
        String result = krsClient.webClient(krsNumber);
//        String result = "404";
        HttpStatus httpStatus = HttpStatus.OK;
        com.company.naspolke.model.company.Company company = null;
        HttpHeaders headers = new HttpHeaders();
//        String resultApi;
        if (result.length() == 3) {
            httpStatus = HttpStatus.valueOf(Integer.parseInt(result));
        } else {
            company = monoStringToCompanyAdapter.getCompany(result);
        }
        return new ResponseEntity<>(company, headers, httpStatus);
    }

    @Override
    public boolean checkForDuplicate(Long krsNumber) {
        Company a = companyRepository.findByKrsNumber(krsNumber);
        return companyRepository.findByKrsNumber(krsNumber)== null ;
    }
    @Override
    public Company saveCompany(Company company) {
        if (checkForDuplicate(company.getKrsNumber())) {
            Company companyToSave = Company.builder()
                    .companyName(company.getCompanyName())
                    .krsNumber(company.getKrsNumber())
                    .address(company.getAddress())
                    .nip(company.getNip())
                    .regon(company.getRegon())
                    .shareCapital(company.getShareCapital())
                    .boardMembers(company.getBoardMembers())
                    .boardMembersTerm(company.getBoardMembersTerm())
                    .boardOfDirectors(company.getBoardOfDirectors())
                    .boardOfDirectorsTerm(company.getBoardOfDirectorsTerm())
                    .partners(company.getPartners())
                    .manySharesAllowed(company.isManySharesAllowed())
                    .build();
            return companyRepository.save(companyToSave);
        }
        return null;
    }

    @Override
    public ResponseEntity<String> buildSaveResponse(Company company) {
        if (company!= null) {
            String companyName = company.getCompanyName();
            return new ResponseEntity<>(companyName, new HttpHeaders(), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.NO_CONTENT);
        }
    }

    @Override
    public Optional<Company> getCompanyByKrsNumber(Long krsNumber) {
        return Optional.ofNullable(companyRepository.findByKrsNumber(krsNumber));
    }

    @Override
    public Optional<Company> getCompanyByCompanyId(UUID companyId) {
        return Optional.ofNullable(companyRepository.findByCompanyId(companyId));
    }

    @Override
    public List<Company> findAll() {
        return companyRepository.findAll();
    }

    @Override
    public void updateAddressById(Address address, UUID companyId) {
        companyRepository.updateAddressById(address, companyId);
    }

    @Override
    public void updateCompany(Company company) {
        companyRepository.save(company);
    }
}
