package com.company.naspolke.webclient.krs;

import lombok.Data;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Data
@Component
public class KrsClient {

    private WebClient webClient;
    private String KRS_URL = "https://api-krs.ms.gov.pl/api/krs";

    public Mono<String> webClient(String krsNumber){
        WebClient webClient = WebClient
                .builder()
                .baseUrl(KRS_URL)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        WebClient.RequestHeadersSpec<?> requestHeadersSpec = webClient.get().uri("/OdpisAktualny/"+krsNumber+"?rejestr=p&format=json");
        return requestHeadersSpec.retrieve().bodyToMono(String.class);



//        mono
//                .doOnNext(body-> System.out.println(body))
//                .subscribe();
    }

//
//    private RestTemplate restTemplate = new RestTemplate();
//
//    public ResponseEntity getKrsData(String krsNumber) {
//        System.out.println("ok");
//        return restTemplate (KRS_URL +
//                "{typeOfAllowance}/{krsNumber}?rejestr={typeOfRegister}&format=json",
//                CompanyDto.class,
//                "OdpisAktualny", krsNumber, "p");
//    }
}


//<html>
//
//<head>
//<title>Przerwa techniczna</title>
//<meta http-equiv=Content-Type content=text/html; charset=utf-8 />
//<meta name=robots content=noindex, nofollow />
//<style type=text/css> body { background: url(http://gov.pl/sprawiedliwosc/Themes/ErrorPages/Images/background.gif)
//        repeat-x white; color: #363636; font-size: 11px; font-family: Georgia; Tahoma, Arial; line-height: 16px; margin:
//        0px; padding: 0px; } </style> </head> <body bgcolor=#363636>
//<center>
//
//
//<a href=http://www.gov.pl/sprawiedliwosc border=0>
//<img src=http://ms.gov.pl/sprawiedliwosc/Themes/ErrorPages//Images/logo.png alt=www.gov.pl/sprawiedliwosc border=0>
//</a>
//<BR><BR><BR><BR>
//<font family=Georgia size=6><b></font><font family=Georgia size=6>Przerwa techniczna </b></font>
//<BR><BR><BR><BR><BR>
//
//<font family=Georgia size=4>
//
//
//<BR>
//<BR>Szanowni Pa&#324;stwo,
//<BR>
//<BR>
//<BR>Uprzejmie informujemy, i&#380; od godz. 18:30 do godz. 23:00
//<BR>
//<BR>trwa przerwa techniczna w dost&#281;pie do systemu.
//<BR>
//<BR>
//<BR>Za utrudnienia przepraszamy.</BR>
//<BR>
//<BR>
//</font>
//
//
//</center>
//</body>
//</html>
//