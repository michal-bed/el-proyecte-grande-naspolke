package com.company.naspolke.service;

import com.company.naspolke.model.company.repositories.CompanyRepository;
import com.company.naspolke.helpers.adapters.MonoStringToCompanyAdapter;
import com.company.naspolke.model.company.Company;
import com.company.naspolke.webclient.krs.KrsClient;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.CoreSubscriber;
import reactor.core.publisher.Mono;

import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
public class CompanyService {

    private final KrsClient krsClient;
    private final MonoStringToCompanyAdapter monoStringToCompanyAdapter;
    private final CompanyRepository companyRepository;


    public Company getCompanyData(String krsNumber){
//        String result = krsClient.webClient(krsNumber);
//        if(Objects.equals(result, "404")){
//            return null;
//        }
        krsNumber ="";
        return monoStringToCompanyAdapter.getCompany(krsNumber);
//tutaj mapa string + company
    }

    public void saveCompany(Company company){
        companyRepository.save(company);
    }
}
