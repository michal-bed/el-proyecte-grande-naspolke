package com.company.naspolke.webclient.krs;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class KrsClient {

    private RestTemplate restTemplate = new RestTemplate();
    private String KRS_URL = "https://api-krs.ms.gov.pl/api/krs/";

    public String getKrsData(String krsNumber) {
        return restTemplate.getForObject(KRS_URL +
                "{typeOfAllowance}/{krsNumber}?rejestr={typeOfRegister}&format=json",
                String.class,
                "OdpisAktualny", krsNumber, "p");
    }
}
