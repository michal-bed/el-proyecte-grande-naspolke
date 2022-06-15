package com.company.naspolke.helpers.adapters;

import com.company.naspolke.model.company.Address;
import com.company.naspolke.model.company.Company;
import com.company.naspolke.model.company.companyBodies.*;
import com.company.naspolke.model.company.companyBodies.Partners.JuridicalPerson;
import com.company.naspolke.model.company.companyBodies.Partners.NaturalPerson;
import com.company.naspolke.model.company.companyBodies.Partners.Partners;
import com.jayway.jsonpath.Configuration;
import com.jayway.jsonpath.JsonPath;
import com.jayway.jsonpath.Option;
import lombok.*;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.util.*;

@Component
public class MonoStringToCompanyAdapter {
    private final String MockKRS = "{\n" +
            "    \"odpis\": {\n" +
            "        \"rodzaj\": \"Aktualny\",\n" +
            "        \"naglowekA\": {\n" +
            "            \"rejestr\": \"RejP\",\n" +
            "            \"numerKRS\": \"0000413516\",\n" +
            "            \"dataCzasOdpisu\": \"08.03.2022 05:03:05\",\n" +
            "            \"stanZDnia\": \"08.03.2022\",\n" +
            "            \"dataRejestracjiWKRS\": \"08.03.2012\",\n" +
            "            \"numerOstatniegoWpisu\": 16,\n" +
            "            \"dataOstatniegoWpisu\": \"15.02.2021\",\n" +
            "            \"sygnaturaAktSprawyDotyczacejOstatniegoWpisu\": \"RDF/277206/21/413\",\n" +
            "            \"oznaczenieSaduDokonujacegoOstatniegoWpisu\": \"SYSTEM\",\n" +
            "            \"stanPozycji\": 1\n" +
            "        },\n" +
            "        \"dane\": {\n" +
            "            \"dzial1\": {\n" +
            "                \"danePodmiotu\": {\n" +
            "                    \"formaPrawna\": \"SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ\",\n" +
            "                    \"identyfikatory\": {\n" +
            "                        \"regon\": \"30204683000000\",\n" +
            "                        \"nip\": \"9721237317\"\n" +
            "                    },\n" +
            "                    \"nazwa\": \"SWLEX SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ\",\n" +
            "                    \"daneOWczesniejszejRejestracji\": {},\n" +
            "                    \"czyProwadziDzialalnoscZInnymiPodmiotami\": false,\n" +
            "                    \"czyPosiadaStatusOPP\": false\n" +
            "                },\n" +
            "                \"siedzibaIAdres\": {\n" +
            "                    \"siedziba\": {\n" +
            "                        \"kraj\": \"POLSKA\",\n" +
            "                        \"wojewodztwo\": \"WIELKOPOLSKIE\",\n" +
            "                        \"powiat\": \"POZNAŃ\",\n" +
            "                        \"gmina\": \"POZNAŃ\",\n" +
            "                        \"miejscowosc\": \"POZNAŃ\"\n" +
            "                    },\n" +
            "                    \"adres\": {\n" +
            "                        \"ulica\": \"UL. SZELĄGOWSKA\",\n" +
            "                        \"nrDomu\": \"49\",\n" +
            "                        \"miejscowosc\": \"POZNAŃ\",\n" +
            "                        \"kodPocztowy\": \"61-626\",\n" +
            "                        \"poczta\": \"POZNAŃ\",\n" +
            "                        \"kraj\": \"POLSKA\"\n" +
            "                    }\n" +
            "                },\n" +
            "                \"umowaStatut\": {\n" +
            "                    \"informacjaOZawarciuZmianieUmowyStatutu\": [\n" +
            "                        {\n" +
            "                            \"zawarcieZmianaUmowyStatutu\": \"AKT NOTARIALNY Z DNIA 06.09.2011 R., NOTARIUSZ MAŁGORZATA RADZIUK, KANCELARIA NOTARIALNA W POZNANIU PRZY AL. WIELKOPOLSKIEJ 28, REP. A NR 3826/2011\"\n" +
            "                        }\n" +
            "                    ]\n" +
            "                },\n" +
            "                \"pozostaleInformacje\": {\n" +
            "                    \"czasNaJakiUtworzonyZostalPodmiot\": \"NIEOZNACZONY\",\n" +
            "                    \"informacjaOLiczbieUdzialow\": \"WIĘKSZĄ LICZBĘ UDZIAŁÓW\"\n" +
            "                },\n" +
            "                \"wspolnicySpzoo\": [\n" +
            "                    {\n" +
            "                        \"nazwisko\": {\n" +
            "                            \"nazwiskoICzlon\": \"W*********\"\n" +
            "                        },\n" +
            "                        \"imiona\": {\n" +
            "                            \"imie\": \"S********\"\n" +
            "                        },\n" +
            "                        \"identyfikator\": {\n" +
            "                            \"pesel\": \"8**********\"\n" +
            "                        },\n" +
            "                        \"posiadaneUdzialy\": \"90 UDZIAŁÓW O ŁĄCZNEJ WARTOŚCI 4 500,00 ZŁ\",\n" +
            "                        \"czyPosiadaCaloscUdzialow\": false\n" +
            "                    },\n" +
            "                    {\n" +
            "                        \"nazwisko\": {\n" +
            "                            \"nazwiskoICzlon\": \"W*********\"\n" +
            "                        },\n" +
            "                        \"imiona\": {\n" +
            "                            \"imie\": \"M******\"\n" +
            "                        },\n" +
            "                        \"identyfikator\": {\n" +
            "                            \"pesel\": \"9**********\"\n" +
            "                        },\n" +
            "                        \"posiadaneUdzialy\": \"10 UDZIAŁÓW O ŁĄCZNEJ WARTOŚCI 500,00 ZŁ\",\n" +
            "                        \"czyPosiadaCaloscUdzialow\": false\n" +
            "                    }\n" +
            "                ],\n" +
            "                \"kapital\": {\n" +
            "                    \"wysokoscKapitaluZakladowego\": {\n" +
            "                        \"wartosc\": \"5000,00\",\n" +
            "                        \"waluta\": \"PLN\"\n" +
            "                    },\n" +
            "                    \"wniesioneAporty\": {}\n" +
            "                }\n" +
            "            },\n" +
            "            \"dzial2\": {\n" +
            "                \"reprezentacja\": {\n" +
            "                    \"nazwaOrganu\": \"ZARZĄD\",\n" +
            "                    \"sposobReprezentacji\": \"W PRZYPADKU POWOŁANIA ZARZĄDU WIELOOSOBOWEGO DO SKŁADANIA OŚWIADCZEŃ W IMIENIU SPÓŁKI I REPREZENTOWANIA SPÓŁKI WYMAGANE JEST WSPÓŁDZIAŁANIE DWÓCH CZŁONKÓW ZARZĄDU ALBO JEDNEGO CZŁONKA ZARZĄDU ŁĄCZNIE Z PROKURENTEM\",\n" +
            "                    \"sklad\": [\n" +
            "                        {\n" +
            "                            \"nazwisko\": {\n" +
            "                                \"nazwiskoICzlon\": \"W*********\"\n" +
            "                            },\n" +
            "                            \"imiona\": {\n" +
            "                                \"imie\": \"S********\"\n" +
            "                            },\n" +
            "                            \"identyfikator\": {\n" +
            "                                \"pesel\": \"8**********\"\n" +
            "                            },\n" +
            "                            \"funkcjaWOrganie\": \"CZŁONEK ZARZĄDU\",\n" +
            "                            \"czyZawieszona\": false\n" +
            "                        }\n" +
            "                    ]\n" +
            "                }\n" +
            "            },\n" +
            "            \"dzial3\": {\n" +
            "                \"przedmiotDzialalnosci\": {\n" +
            "                    \"przedmiotPrzewazajacejDzialalnosci\": [\n" +
            "                        {\n" +
            "                            \"opis\": \"DZIAŁALNOŚĆ PRAWNICZA\",\n" +
            "                            \"kodDzial\": \"69\",\n" +
            "                            \"kodKlasa\": \"10\",\n" +
            "                            \"kodPodklasa\": \"Z\"\n" +
            "                        }\n" +
            "                    ],\n" +
            "                    \"przedmiotPozostalejDzialalnosci\": [\n" +
            "                        {\n" +
            "                            \"opis\": \"POZOSTAŁA FINANSOWA DZIAŁALNOŚĆ USŁUGOWA, GDZIE INDZIEJ NIESKLASYFIKOWANA, Z WYŁĄCZENIEM UBEZPIECZEŃ I FUNDUSZÓW EMERYTALNYCH\",\n" +
            "                            \"kodDzial\": \"64\",\n" +
            "                            \"kodKlasa\": \"99\",\n" +
            "                            \"kodPodklasa\": \"Z\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"opis\": \"POZOSTAŁA DZIAŁALNOŚĆ WSPOMAGAJĄCA USŁUGI FINANSOWE, Z WYŁĄCZENIEM UBEZPIECZEŃ I FUNDUSZÓW EMERYTALNYCH\",\n" +
            "                            \"kodDzial\": \"66\",\n" +
            "                            \"kodKlasa\": \"19\",\n" +
            "                            \"kodPodklasa\": \"Z\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"opis\": \"WYNAJEM I ZARZĄDZANIE NIERUCHOMOŚCIAMI WŁASNYMI LUB DZIERŻAWIONYMI\",\n" +
            "                            \"kodDzial\": \"68\",\n" +
            "                            \"kodKlasa\": \"20\",\n" +
            "                            \"kodPodklasa\": \"Z\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"opis\": \"DZIAŁALNOŚĆ RACHUNKOWO-KSIĘGOWA; DORADZTWO PODATKOWE\",\n" +
            "                            \"kodDzial\": \"69\",\n" +
            "                            \"kodKlasa\": \"20\",\n" +
            "                            \"kodPodklasa\": \"Z\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"opis\": \"STOSUNKI MIĘDZYLUDZKIE (PUBLIC RELATIONS) I KOMUNIKACJA\",\n" +
            "                            \"kodDzial\": \"70\",\n" +
            "                            \"kodKlasa\": \"21\",\n" +
            "                            \"kodPodklasa\": \"Z\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"opis\": \"POZOSTAŁE DORADZTWO W ZAKRESIE PROWADZENIA DZIAŁALNOŚCI GOSPODARCZEJ I ZARZĄDZANIA\",\n" +
            "                            \"kodDzial\": \"70\",\n" +
            "                            \"kodKlasa\": \"22\",\n" +
            "                            \"kodPodklasa\": \"Z\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"opis\": \"DZIERŻAWA WŁASNOŚCI INTELEKTUALNEJ I PODOBNYCH PRODUKTÓW, Z WYŁĄCZENIEM PRAC CHRONIONYCH PRAWEM AUTORSKIM\",\n" +
            "                            \"kodDzial\": \"77\",\n" +
            "                            \"kodKlasa\": \"40\",\n" +
            "                            \"kodPodklasa\": \"Z\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"opis\": \"DZIAŁALNOŚĆ USŁUGOWA ZWIĄZANA Z ADMINISTRACYJNĄ OBSŁUGĄ BIURA\",\n" +
            "                            \"kodDzial\": \"82\",\n" +
            "                            \"kodKlasa\": \"11\",\n" +
            "                            \"kodPodklasa\": \"Z\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"opis\": \"DZIAŁALNOŚĆ ZWIĄZANA Z ORGANIZACJĄ TARGÓW, WYSTAW I KONGRESÓW\",\n" +
            "                            \"kodDzial\": \"82\",\n" +
            "                            \"kodKlasa\": \"30\",\n" +
            "                            \"kodPodklasa\": \"Z\"\n" +
            "                        }\n" +
            "                    ]\n" +
            "                },\n" +
            "                \"wzmiankiOZlozonychDokumentach\": {\n" +
            "                    \"wzmiankaOZlozeniuRocznegoSprawozdaniaFinansowego\": [\n" +
            "                        {\n" +
            "                            \"dataZlozenia\": \"02.03.2012\",\n" +
            "                            \"zaOkresOdDo\": \"06.09.2011 R. - 31.12.2011 R.\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"dataZlozenia\": \"15.02.2016\",\n" +
            "                            \"zaOkresOdDo\": \"OD 01.01.2012 DO 31.12.2012\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"dataZlozenia\": \"15.02.2016\",\n" +
            "                            \"zaOkresOdDo\": \"OD 01.01.2013 DO 31.12.2013\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"dataZlozenia\": \"15.02.2016\",\n" +
            "                            \"zaOkresOdDo\": \"OD 01.01.2014 DO 31.12.2014\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"dataZlozenia\": \"07.12.2016\",\n" +
            "                            \"zaOkresOdDo\": \"OD 01.01.2015 DO 31.12.2015\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"dataZlozenia\": \"26.02.2018\",\n" +
            "                            \"zaOkresOdDo\": \"OD 01.01.2016 DO 31.12.2016\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"dataZlozenia\": \"18.01.2019\",\n" +
            "                            \"zaOkresOdDo\": \"OD 01.01.2017 DO 31.12.2017\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"dataZlozenia\": \"02.03.2020\",\n" +
            "                            \"zaOkresOdDo\": \"OD 01.01.2018 DO 31.12.2018\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"dataZlozenia\": \"15.02.2021\",\n" +
            "                            \"zaOkresOdDo\": \"OD 01.01.2019 DO 31.12.2019\"\n" +
            "                        }\n" +
            "                    ],\n" +
            "                    \"wzmiankaOZlozeniuUchwalyPostanowieniaOZatwierdzeniuRocznegoSprawozdaniaFinansowego\": [\n" +
            "                        {\n" +
            "                            \"zaOkresOdDo\": \"06.09.2011 R. - 31.12.2011 R.\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"zaOkresOdDo\": \"OD 01.01.2012 DO 31.12.2012\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"zaOkresOdDo\": \"OD 01.01.2013 DO 31.12.2013\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"zaOkresOdDo\": \"OD 01.01.2014 DO 31.12.2014\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"zaOkresOdDo\": \"OD 01.01.2015 DO 31.12.2015\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"zaOkresOdDo\": \"OD 01.01.2016 DO 31.12.2016\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"zaOkresOdDo\": \"OD 01.01.2017 DO 31.12.2017\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"zaOkresOdDo\": \"OD 01.01.2018 DO 31.12.2018\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"zaOkresOdDo\": \"OD 01.01.2019 DO 31.12.2019\"\n" +
            "                        }\n" +
            "                    ],\n" +
            "                    \"wzmiankaOZlozeniuSprawozdaniaZDzialalnosci\": [\n" +
            "                        {\n" +
            "                            \"zaOkresOdDo\": \"06.09.2011 R. - 31.12.2011 R.\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"zaOkresOdDo\": \"OD 01.01.2012 DO 31.12.2012\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"zaOkresOdDo\": \"OD 01.01.2013 DO 31.12.2013\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"zaOkresOdDo\": \"OD 01.01.2014 DO 31.12.2014\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"zaOkresOdDo\": \"OD 01.01.2015 DO 31.12.2015\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"zaOkresOdDo\": \"OD 01.01.2016 DO 31.12.2016\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"zaOkresOdDo\": \"OD 01.01.2017 DO 31.12.2017\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"zaOkresOdDo\": \"OD 01.01.2018 DO 31.12.2018\"\n" +
            "                        },\n" +
            "                        {\n" +
            "                            \"zaOkresOdDo\": \"OD 01.01.2019 DO 31.12.2019\"\n" +
            "                        }\n" +
            "                    ]\n" +
            "                },\n" +
            "                \"informacjaODniuKonczacymRokObrotowy\": {\n" +
            "                    \"dzienKonczacyPierwszyRokObrotowy\": \"31.12.2011\"\n" +
            "                }\n" +
            "            },\n" +
            "            \"dzial4\": {},\n" +
            "            \"dzial5\": {},\n" +
            "            \"dzial6\": {}\n" +
            "        }\n" +
            "    }\n" +
            "}";

    public Company getCompany(String apiResponse) {
        String data = new String(apiResponse);
//        String data = MockKRS;
        String largerSharesInfo = "WIĘKSZĄ LICZBĘ UDZIAŁÓW";
        Configuration conf = Configuration.defaultConfiguration()
                .addOptions(Option.DEFAULT_PATH_LEAF_TO_NULL);
        Object document = Configuration.defaultConfiguration().jsonProvider().parse(data);
        String nip = JsonPath.read(document, "$.odpis.dane.dzial1.danePodmiotu.identyfikatory.nip");
        String regon = JsonPath.read(document, "$.odpis.dane.dzial1.danePodmiotu.identyfikatory.regon");
        Long krsNumber = Long.valueOf(JsonPath.read(document, "$.odpis.naglowekA.numerKRS"));
        String companyName = JsonPath.read(document, "$.odpis.dane.dzial1.danePodmiotu.nazwa");
        BigDecimal shareCapital = getShareCapitalFromApi(document);
        Partners partners = createCompanyPartners(document);
        Address address = getCompanyAddressFromApi(document);
        Set<BoardMember> boardMembers = getBoardMembersFromApi(document, conf);
        Set<BoardOfDirector> boardOfDirectors = getBoardOfDirectorsFromApi(document, conf);
        boolean largerAmountOfSharesAllowed = JsonPath.read(document, "$.odpis.dane.dzial1.pozostaleInformacje.informacjaOLiczbieUdzialow").equals(largerSharesInfo);

        return Company.builder()
                .name(companyName)
                .krsNumber(krsNumber)
                .nip(nip)
                .regon(regon)
                .shareCapital(shareCapital)
                .address(address)
                .partners(partners)
                .boardMembers(boardMembers)
                .boardOfDirectors(boardOfDirectors)
                .manySharesAllowed(largerAmountOfSharesAllowed)
                .build();
    }


    private Set<BoardOfDirector> getBoardOfDirectorsFromApi(Object document, Configuration conf) {
        String path = "$.odpis.dane.dzial2.organNadzoru";
        net.minidev.json.JSONArray boardOfDirectors = JsonPath.using(conf).parse(document).read(path);
        Set<BoardOfDirector> boardOfDirectorSet = new HashSet<>();
        if(boardOfDirectors != null){
            net.minidev.json.JSONArray boardOfDirectorsList = JsonPath.using(conf).parse(document).read(path+"[0].sklad");
            for (int i = 0; i < boardOfDirectorsList.size(); i++) {
                PersonNameAndSurname personNameAndSurname = getBasicPersonalInfo(document, String.format(path + "[0].sklad[%s]", i));
                BoardOfDirector boardOfDirector = BoardOfDirector.builder()
                        .firstName(personNameAndSurname.getFirstName())
                        .secondName(personNameAndSurname.getSecondName())
                        .lastNameI(personNameAndSurname.getLastNameI())
                        .lastNameII(personNameAndSurname.getLastNameII())
                        .build();
                boardOfDirectorSet.add(boardOfDirector);
            }
        }
        return boardOfDirectorSet;
    }

    private Set<BoardMember> getBoardMembersFromApi(Object document, Configuration conf){
        String path = "$.odpis.dane.dzial2.reprezentacja.sklad";

        net.minidev.json.JSONArray boardMembers = JsonPath.using(conf).parse(document).read(path);
        Set<BoardMember> boardMemberSet = new HashSet<>();
        if(boardMembers != null) {
            for (int i = 0; i < boardMembers.size(); i++) {
                PersonNameAndSurname personNameAndSurname = getBasicPersonalInfo(document, String.format(path + "[%s]", i));
                String abs = personNameAndSurname.getFirstName();
                String function = JsonPath.read(document, String.format(path + "[%s].funkcjaWOrganie", i));
                BoardMember boardMember = BoardMember.builder()
                        .firstName(abs)
                        .secondName(personNameAndSurname.getSecondName())
                        .lastNameI(personNameAndSurname.getLastNameI())
                        .lastNameII(personNameAndSurname.getLastNameII())
                        .function(function)
                        .build();
                boardMemberSet.add(boardMember);
            }
        }
        return boardMemberSet;
    }

    private Partners createCompanyPartners(Object document) {
        net.minidev.json.JSONArray partners = JsonPath.read(document, "$.odpis.dane.dzial1.wspolnicySpzoo");
        Set<NaturalPerson> naturalPersonSet = new HashSet<>();
        Set<JuridicalPerson> juridicalPersonSet = new HashSet<>();
        for (int i = 0; i < partners.size(); i++) {
            LinkedHashMap<Object, String> partner = (LinkedHashMap<Object, String>) partners.get(i);
            if (partner.containsKey("nazwisko")) {
                NaturalPerson naturalPerson = getNaturalPersonPartner(document, String.format("$.odpis.dane.dzial1.wspolnicySpzoo[%s]", i));
                naturalPersonSet.add(naturalPerson);
            } else {
                JuridicalPerson juridicalPerson = getJuridicalPartner(document, String.format("$.odpis.dane.dzial1.wspolnicySpzoo[%s]", i));
                juridicalPersonSet.add(juridicalPerson);
            }
        }
        return  Partners.builder()
                .partnerCompanies(juridicalPersonSet)
                .individualPartners(naturalPersonSet)
                .build();
    }

    private JuridicalPerson getJuridicalPartner(Object document, String path) {
        String companyName = JsonPath.read(document, path+".nazwa");
        SharePackage sharePackage = getShareInfo(document, path);
        return JuridicalPerson.builder()
                .name(companyName)
                .sharesCount(sharePackage.getShareCount())
                .sharesValue(sharePackage.getShareValue())
                .build();
    }

    private NaturalPerson getNaturalPersonPartner(Object document, String path) {
        PersonNameAndSurname personNameAndSurname = getBasicPersonalInfo(document, path);
        SharePackage sharePackage = getShareInfo(document, path);
        return new NaturalPerson().builder()
                .firstName(personNameAndSurname.getFirstName())
                .secondName(personNameAndSurname.getSecondName())
                .lastNameI(personNameAndSurname.getLastNameI())
                .lastNameII(personNameAndSurname.getLastNameII())
                .sharesCount(sharePackage.getShareCount())
                .sharesValue(sharePackage.getShareValue())
                .build();
    }

    private PersonNameAndSurname getBasicPersonalInfo(Object document, String path){
        String lastNameI = JsonPath.read(document, path+".nazwisko.nazwiskoICzlon");
        String lastNameII = checkForOptionalData("nazwiskoIICzlon",path+".nazwisko", document);
        String nameI = JsonPath.read(document, path + ".imiona.imie");
        String nameII = checkForOptionalData("imieDrugie",path + ".imiona", document);
        return PersonNameAndSurname.builder()
                .lastNameI(lastNameI)
                .lastNameII(lastNameII)
                .firstName(nameI)
                .secondName(nameII)
                .build();
    }

    private String checkForOptionalData(String key, String path, Object document){
        LinkedHashMap <Object, String> objectToCheck = JsonPath.read(document, path);
        if(objectToCheck.containsKey(key)){
            return objectToCheck.get(key);
        }
        return null;
    }

    private BigDecimal getShareCapitalFromApi(Object document) {
        String shareCapitalsFromAPI = JsonPath.read(document, "$.odpis.dane.dzial1.kapital.wysokoscKapitaluZakladowego.wartosc");
        return BigDecimal.valueOf(Double.parseDouble(shareCapitalsFromAPI.replaceAll("[,]",".")));
    }


    private SharePackage getShareInfo(Object document, String path) {
        String sharesInfo = JsonPath.read(document, path + ".posiadaneUdzialy");
        String[] shares = sharesInfo.split("UDZIAŁÓW O ŁĄCZNEJ WARTOŚCI");
        Integer shareCount = Integer.valueOf(shares[0].trim());
        String sharesValueString = shares[1].replaceAll("[^\\d,]","").replaceAll("\\s+","");
        sharesValueString = sharesValueString.substring(0, sharesValueString.length()-2);
        BigDecimal sharesValueBigDecimal = BigDecimal.valueOf(Double.parseDouble(sharesValueString.replaceAll("[^\\d]", ".")));
        return new SharePackage().builder()
                .shareCount(shareCount)
                .shareValue(sharesValueBigDecimal)
                .build();
    }


    private Address getCompanyAddressFromApi(Object document) {
        String addressPath = "$.odpis.dane.dzial1.siedzibaIAdres.adres";

        String city = JsonPath.read(document, addressPath+".miejscowosc");
        String zipCode = JsonPath.read(document, addressPath+".kodPocztowy");
        String postOffice = JsonPath.read(document, addressPath+".poczta");
        String streetName = JsonPath.read(document, addressPath+".ulica");
        String streetNumber = JsonPath.read(document, addressPath+".nrDomu");
        String localNumber = checkForOptionalData("nrLokalu", addressPath, document);
        return Address.builder()
                .streetName(streetName)
                .streetNumber(streetNumber)
                .localNumber(localNumber)
                .zipCode(zipCode)
                .city(city)
                .postOffice(postOffice)
                .build();
    }

}

@Component
@NoArgsConstructor
@Data
@Builder
@AllArgsConstructor
class PersonNameAndSurname {
    private String firstName;
    private String secondName;
    private String lastNameI;
    private String lastNameII;
}

@Builder
@Component
@Getter
@NoArgsConstructor
@AllArgsConstructor
class SharePackage {
    private BigDecimal shareValue;
    private Integer shareCount;

}
