package com.company.naspolke.service;

import com.company.naspolke.model.company.repositories.CompanyRepository;
import com.company.naspolke.helpers.adapters.MonoStringToCompanyAdapter;
import com.company.naspolke.model.company.Company;
import com.company.naspolke.webclient.krs.KrsClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class CompanyService {

    private final KrsClient krsClient;
    private final MonoStringToCompanyAdapter monoStringToCompanyAdapter;
    private final CompanyRepository companyRepository;


    public ResponseEntity<Company> getCompanyData(String krsNumber){
//        String result = krsClient.webClient(krsNumber);
        String result = "4046";
        HttpStatus httpStatus = HttpStatus.OK;
        Company company = null;
        HttpHeaders headers = new HttpHeaders();
        String resultApi;
        if(result.length()==3){
            httpStatus = HttpStatus.valueOf(Integer.parseInt(result));
        } else {
            company = monoStringToCompanyAdapter.getCompany(result);
        }
        return new ResponseEntity<>(company, headers, httpStatus);
    }

    public void saveCompany(Company company){
        Company companyToSave = Company.builder()
                        .companyName(company.getCompanyName())
                        .krsNumber(company.getKrsNumber())
                        .address(company.getAddress())
                        .nip(company.getNip())
                        .regon(company.getRegon())
                        .shareCapital(company.getShareCapital())
                        .boardMembers(company.getBoardMembers())
                        .boardOfDirectors(company.getBoardOfDirectors())
                        .partners(company.getPartners())
                        .manySharesAllowed(company.isManySharesAllowed())
                        .build();
        companyRepository.save(companyToSave);
    }
}
