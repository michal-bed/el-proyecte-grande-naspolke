package com.company.naspolke.helpers.adapters;

import com.company.naspolke.model.company.Address;
import com.company.naspolke.model.company.Company;
import com.company.naspolke.model.company.companyBodies.Partner;
import com.company.naspolke.model.company.companyBodies.PartnerCompany;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class MonoStringToCompanyAdapter {
    private String MockKRS = "{\n" +
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
    private final List<String> nipAndRegonPath = Arrays.asList("odpis","dane", "dzial1", "danePodmiotu", "identyfikatory");
    private final List<String> addressPath = Arrays.asList("odpis","dane", "dzial1", "siedzibaIAdres", "adres");
    private final List<String> partnersPath = Arrays.asList("odpis","dane", "dzial1");
    private final String partnersDetailsKey = "wspolnicySpzoo";
    private final List<String> shareCapitalPath = Arrays.asList("odpis","dane", "dzial1", "kapital", "wysokoscKapitaluZakladowego");
    private final List<String> boardCompanyPath = Arrays.asList("odpis","dane", "dzial2", "reprezentacja", "sklad");

    public Company getCompany(Mono<String> APIResponse) throws JsonProcessingException {
        String data = APIResponse.block();
        var parser = new JSONParser();
        JSONObject json;
        Company company = new Company();
        try {
            json = (JSONObject) parser.parse(data);
            setCompanyNipAndRegonFromApi(json, company);
            setCompanyAddressFromApi(json, company);
            setCompanyPartnersFromApi(json, company);
            setShareCapitalFromApi(json,company);


            return null;
        } catch (ParseException e) {
            e.printStackTrace();
            json = null;
        }
        return null;
    }

    private void setShareCapitalFromApi(JSONObject json, Company company) {
        JSONObject shareCapital = getDataToBuildClass(json, shareCapitalPath);
        String companyCapital = (String) shareCapital.get("wartosc");
        BigDecimal convertedCapital = BigDecimal.valueOf(Double.parseDouble(companyCapital.replaceAll("[,]",".")));
        company.setShareCapital(convertedCapital);
    }

    private void setCompanyPartnersFromApi(JSONObject json, Company company) {
        JSONObject companyPartners = getDataToBuildClass(json, partnersPath);
        JSONArray companyPartnersList = getcompanyPartnersListFromAPIData(companyPartners,partnersDetailsKey);
        getCompanyPartnersList(companyPartnersList, company);

    }

    private void getCompanyPartnersList(JSONArray companyPartnersList, Company company) {
        Set<Partner> individualList = new HashSet<>();
        Set<PartnerCompany> legalEntitiesList = new HashSet<>();
        for (int i = 0; i < companyPartnersList.size(); i++) {
            JSONObject partner = (JSONObject) companyPartnersList.get(i);
            if(partner.containsKey("nazwisko")){
                Partner individual = new Partner();

                JSONObject nazwisko = (JSONObject) partner.get("nazwisko");
                individual.setLastNameI((String) nazwisko.get("nazwiskoICzlon"));
                checkForSecondLastName(individual, nazwisko);

                JSONObject imiona = (JSONObject) partner.get("imiona");
                individual.setFirstName((String) imiona.get("imie"));
                checkForSecondName(individual, imiona);

                String sharesInfo = (String) partner.get("posiadaneUdzialy");
                getIndividualShareInfo(individual, sharesInfo);
                individualList.add(individual);
            } else {
                PartnerCompany partnerCompany = new PartnerCompany();

                String partnerCompanyName = (String) partner.get("nazwa");
                partnerCompany.setName(partnerCompanyName);

                String sharesInfo = (String) partner.get("posiadaneUdzialy");
                getCompanyShareInfo(partnerCompany, sharesInfo);
                legalEntitiesList.add(partnerCompany);
            }
        }
            company.setPartners(individualList);
            company.setPartnerCompanies(legalEntitiesList);
    }

    private void getCompanyShareInfo(PartnerCompany partnerCompany, String sharesInfo) {
        String[] shares = sharesInfo.split("UDZIAŁÓW O ŁĄCZNEJ WARTOŚCI");
        Integer shareCount = Integer.parseInt(shares[0].trim());
        String sharesValueString = shares[1].replaceAll("[^\\d,]","").replaceAll("\\s+","");
        sharesValueString = sharesValueString.substring(0, sharesValueString.length()-2);
        BigDecimal sharesValueBigDecimal = BigDecimal.valueOf(Double.parseDouble(sharesValueString.replaceAll("[^\\d]", ".")));
        partnerCompany.setSharesCount(shareCount);
        partnerCompany.setSharesValue(sharesValueBigDecimal);

    }

    private void getIndividualShareInfo(Partner individual, String sharesInfo) {
        String[] shares = sharesInfo.split("UDZIAŁÓW O ŁĄCZNEJ WARTOŚCI");
        Integer shareCount = Integer.valueOf(shares[0].trim());
        String sharesValueString = shares[1].replaceAll("[^\\d,]","").replaceAll("\\s+","");
        sharesValueString = sharesValueString.substring(0, sharesValueString.length()-2);
        BigDecimal sharesValueBigDecimal = BigDecimal.valueOf(Double.parseDouble(sharesValueString.replaceAll("[^\\d]", ".")));
        individual.setSharesCount(shareCount);
        individual.setSharesValue(sharesValueBigDecimal);
    }

    private void checkForSecondName(Partner individual, JSONObject imiona) {
        if (imiona.containsKey("imieDrugie")) {
            individual.setSecondName((String) imiona.get("imieDrugie"));
        } else {
            individual.setSecondName(null);
        }
    }

    private void checkForSecondLastName(Partner individual, JSONObject nazwisko) {
        if (nazwisko.containsKey("nazwiskoIICzlon")) {
            individual.setLastNameII((String) nazwisko.get("nazwiskoIICzlon"));
        } else {
            individual.setLastNameII(null);
        }
    }

    private JSONArray getcompanyPartnersListFromAPIData(JSONObject companyPartners, String partnersDetailsKey) {
        return (JSONArray) companyPartners.get(partnersDetailsKey);
    }

    private void setCompanyAddressFromApi(JSONObject json, Company company) {
        JSONObject companyAddress = getDataToBuildClass(json, addressPath);
        Address address = new Address();
        address.setCity((String) companyAddress.get("miejscowosc"));
        address.setZipCode((String) companyAddress.get("kodPocztowy"));
        address.setPostOffice((String) companyAddress.get("poczta"));
        address.setStreetName((String) companyAddress.get("ulica"));
        address.setStreetNumber((String) companyAddress.get("nrDomu"));
        checkForCompanyLocalNumber(companyAddress, address);
        company.setAdress(address);
    }

    private void checkForCompanyLocalNumber(JSONObject companyAddress, Address address) {
        if (companyAddress.containsKey("nrLokalu")) {
            address.setLocalNumber((String) companyAddress.get("nrLokalu"));
        } else {
            address.setLocalNumber(null);
        }
    }

    private void setCompanyNipAndRegonFromApi(JSONObject json, Company company) {
        JSONObject nipAndRegon = getDataToBuildClass(json, nipAndRegonPath);
        company.setNIP((String) nipAndRegon.get("nip"));
        company.setREGON((String) nipAndRegon.get("regon"));
    }

    private JSONObject getDataToBuildClass(JSONObject jObj, List<String> keys){
        JSONObject result = jObj;
        for (String key : keys) {
            if (result.get(key)!=null){
                result = (JSONObject) result.get(key);
            } else {
                break;
            }
        }
        return result;
    }
}
