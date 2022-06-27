package com.company.naspolke.helpers.adapters;

import com.company.naspolke.controller.KRSMock;
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


    private final String SWLEX = KRSMock.SWLEX;
    private final String EASYSOLAR = KRSMock.EASYSOLAR;


    public Company getCompany(String apiResponse) {
        String data = new String(apiResponse);
//        String data = SWLEX;
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
                .companyName(companyName)
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
        Integer shareCount = Integer.valueOf(shares[0].trim().replaceAll("[^\\d]",""));
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
