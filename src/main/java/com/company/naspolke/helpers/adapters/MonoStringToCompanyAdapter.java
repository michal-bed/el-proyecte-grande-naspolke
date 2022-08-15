package com.company.naspolke.helpers.adapters;

import com.company.naspolke.model.company.Address;
import com.company.naspolke.model.company.Company;
import com.company.naspolke.model.company.companyBodies.BoardMember;
import com.company.naspolke.model.company.companyBodies.BoardOfDirector;
import com.company.naspolke.model.company.companyBodies.Partners.JuridicalPerson;
import com.company.naspolke.model.company.companyBodies.Partners.NaturalPerson;
import com.company.naspolke.model.company.companyBodies.Partners.Partners;
import com.jayway.jsonpath.Configuration;
import com.jayway.jsonpath.JsonPath;
import com.jayway.jsonpath.Option;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.Set;

@Component
public class MonoStringToCompanyAdapter {
    private final CompanyPaths path;

//TODO usunąć importów z *
//    private final String SWLEX = MocksData.SWLEX;
//    private final String EASYSOLAR = MocksData.EASYSOLAR;
    @Autowired
    public MonoStringToCompanyAdapter(CompanyPaths path) {
        this.path = path;
    }

    public Company getCompany(String apiResponse) {
        boolean isValid = checkForProperCompanyLegalForm(apiResponse);
        String data = new String(apiResponse);
        Object document = Configuration.defaultConfiguration().jsonProvider().parse(data);
        if (isValid) {
//        String data = SWLEX;
            Configuration conf = Configuration.defaultConfiguration()
                    .addOptions(Option.DEFAULT_PATH_LEAF_TO_NULL);
            String nip = JsonPath.read(document, path.getNip());
            String regon = JsonPath.read(document, path.getRegon());
            String krsNumber = JsonPath.read(document, path.getKrsNumber());
            String companyName = JsonPath.read(document, path.getCompanyName());
            BigDecimal shareCapital = getShareCapitalFromApi(document);
            Partners partners = createCompanyPartners(document);
            Address address = getCompanyAddressFromApi(document);
            Set<BoardMember> boardMembers = getBoardMembersFromApi(document, conf);
            Set<BoardOfDirector> boardOfDirectors = getBoardOfDirectorsFromApi(document, conf);
            boolean largerAmountOfSharesAllowed = JsonPath.read(document, path.getMultipleSharesAllowed()).equals("WIĘKSZĄ LICZBĘ UDZIAŁÓW");

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
        String name = JsonPath.read(document, path.getCompanyName());
        return Company.builder()
                .companyName(name)
                .build();
    }

    private boolean checkForProperCompanyLegalForm(String apiResponse) {
        Object document = Configuration.defaultConfiguration().jsonProvider().parse(apiResponse);
        return JsonPath.read(document, path.getLegalForm()).equals("SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ");
    }
//TODO wywalić string do inego do properties

    private Set<BoardOfDirector> getBoardOfDirectorsFromApi(Object document, Configuration conf) {
        net.minidev.json.JSONArray boardOfDirectors = JsonPath.using(conf).parse(document).read(path.getDirectors());
        Set<BoardOfDirector> boardOfDirectorSet = new HashSet<>();
        if(boardOfDirectors != null){
            net.minidev.json.JSONArray boardOfDirectorsList = JsonPath.using(conf).parse(document).read(path.getDirectors()+"[0].sklad");
            for (int i = 0; i < boardOfDirectorsList.size(); i++) {
                PersonNameAndSurname personNameAndSurname = getBasicPersonalInfo(document, String.format(path.getDirectors() + "[0].sklad[%s]", i));
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
//        String path = "$.odpis.dane.dzial2.reprezentacja.sklad";

        net.minidev.json.JSONArray boardMembers = JsonPath.using(conf).parse(document).read(path.getBoardMembers());
        Set<BoardMember> boardMemberSet = new HashSet<>();
        if(boardMembers != null) {
//            Set<BoardMember> boardMembersList = boardMembers.stream()
//                    .map(person -> {
//                        PersonNameAndSurname personNameAndSurname = getBasicPersonalInfo(document, String.format(path + "[%s]"));
//                        String abs = personNameAndSurname.getFirstName();
//                        String function = JsonPath.read(document, String.format(path + "[%s].funkcjaWOrganie"));
//                        return BoardMember.builder()
//                                .firstName(abs)
//                                .secondName(personNameAndSurname.getSecondName())
//                                .lastNameI(personNameAndSurname.getLastNameI())
//                                .lastNameII(personNameAndSurname.getLastNameII())
//                                .function(function)
//                                .build();
//                    }).collect(Collectors.toSet());

            for (int i = 0; i < boardMembers.size(); i++) {
                PersonNameAndSurname personNameAndSurname = getBasicPersonalInfo(document, String.format(path.getBoardMembers() + "[%s]", i));
                String abs = personNameAndSurname.getFirstName();
                String function = JsonPath.read(document, String.format(path.getBoardMembers() + "[%s].funkcjaWOrganie", i));
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
//TODO częściej stream niż for
    private Partners createCompanyPartners(Object document) {
        net.minidev.json.JSONArray partners = JsonPath.read(document, path.getPartners());
        Set<NaturalPerson> naturalPersonSet = new HashSet<>();
        Set<JuridicalPerson> juridicalPersonSet = new HashSet<>();
        for (int i = 0; i < partners.size(); i++) {
            LinkedHashMap<Object, String> partner = (LinkedHashMap<Object, String>) partners.get(i);
            if (partner.containsKey("nazwisko")) {
                NaturalPerson naturalPerson = getNaturalPersonPartner(document, String.format(path.getPartners()+"[%s]", i));
                naturalPersonSet.add(naturalPerson);
            } else {
                JuridicalPerson juridicalPerson = getJuridicalPartner(document, String.format(path.getPartners()+"[%s]", i));
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
        return NaturalPerson.builder()
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
        String shareCapitalsFromAPI = JsonPath.read(document, path.getShareCapital());
        return BigDecimal.valueOf(Double.parseDouble(shareCapitalsFromAPI.replaceAll("[,]",".")));
    }


    private SharePackage getShareInfo(Object document, String path) {
        String sharesInfo = JsonPath.read(document, path + ".posiadaneUdzialy");
        String[] shares = sharesInfo.split("UDZIAŁÓW O ŁĄCZNEJ WARTOŚCI");
        Integer shareCount = Integer.valueOf(shares[0].trim().replaceAll("[^\\d]",""));
        String sharesValueString = getSharesValueFromApiData(shares[1]);
        BigDecimal sharesValueBigDecimal = BigDecimal.valueOf(Double.parseDouble(sharesValueString.replaceAll("[^\\d]", ".")));
        return SharePackage.builder()
                .shareCount(shareCount)
                .shareValue(sharesValueBigDecimal)
                .build();
    }

    String getSharesValueFromApiData(String shares) {
        String sharesValueString;
        if(shares.contains(",")) {
            sharesValueString = shares.replaceAll("[^\\d]", "").replaceAll("\\s+", "");
            sharesValueString = sharesValueString.substring(0, sharesValueString.length() - 2);
        } else {
            sharesValueString = shares.replaceAll("[^\\d]", "").replaceAll("\\s+", "");
        }
        return sharesValueString;
    }


    Address getCompanyAddressFromApi(Object document) {
        String city = JsonPath.read(document, path.getAddress()+".miejscowosc");
        String zipCode = JsonPath.read(document, path.getAddress()+".kodPocztowy");
        String postOffice = JsonPath.read(document, path.getAddress()+".poczta");
        String streetName = JsonPath.read(document, path.getAddress()+".ulica");
        String streetNumber = JsonPath.read(document, path.getAddress()+".nrDomu");
        String localNumber = checkForOptionalData("nrLokalu", path.getAddress(), document);
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
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
class PersonNameAndSurname {
    private String firstName;
    private String secondName;
    private String lastNameI;
    private String lastNameII;
}

@Builder
@Component
@Getter
@AllArgsConstructor
@NoArgsConstructor
class SharePackage {
    private BigDecimal shareValue;
    private Integer shareCount;

}
