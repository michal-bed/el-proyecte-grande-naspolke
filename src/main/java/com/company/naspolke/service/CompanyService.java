package com.company.naspolke.service;

import com.company.naspolke.webclient.krs.KrsClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
@RequiredArgsConstructor
public class CompanyService {

    private final KrsClient krsClient;

    public CompanyService getCompanyData(String krsNumber){
        String response = krsClient.getKrsData(krsNumber);
        log.info(response);
        return null;
    }
}
