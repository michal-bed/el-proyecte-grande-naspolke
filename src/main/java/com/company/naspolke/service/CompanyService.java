package com.company.naspolke.service;

import com.company.naspolke.helpers.adapters.MonoStringToCompanyAdapter;
import com.company.naspolke.webclient.krs.KrsClient;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@Slf4j
@RequiredArgsConstructor
public class CompanyService {

    private final KrsClient krsClient;
    private final MonoStringToCompanyAdapter monoStringToCompanyAdapter;


    public CompanyService getCompanyData(String krsNumber){
        Mono<String> result = krsClient.webClient(krsNumber);
        try {
            monoStringToCompanyAdapter.getCompany(result);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

}
