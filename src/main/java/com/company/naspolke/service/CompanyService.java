package com.company.naspolke.service;

import com.company.naspolke.model.company.repositories.CompanyRepository;
import com.company.naspolke.helpers.adapters.MonoStringToCompanyAdapter;
import com.company.naspolke.model.company.Company;
import com.company.naspolke.webclient.krs.KrsClient;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.function.ServerRequest;
import reactor.core.CoreSubscriber;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Objects;

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
        companyRepository.save(company);
    }
}
