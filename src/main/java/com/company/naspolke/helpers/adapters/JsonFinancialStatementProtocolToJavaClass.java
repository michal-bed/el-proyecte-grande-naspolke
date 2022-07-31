package com.company.naspolke.helpers.adapters;

import com.company.naspolke.model.company.Address;
import com.company.naspolke.model.company.Company;
import com.company.naspolke.model.company.companyBodies.Partners.JuridicalPerson;
import com.company.naspolke.model.company.companyBodies.Partners.NaturalPerson;
import com.company.naspolke.model.company.financialStatements.FinancialStatementProtocol;
import com.company.naspolke.model.company.financialStatements.resolutions.FinancialStatementResolution;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Component
@NoArgsConstructor
public class JsonFinancialStatementProtocolToJavaClass {

    public static FinancialStatementProtocol getProtocolFromFormData(Map<String, Object> formData, Company company){
        LocalDate dateOfMeeting = (LocalDate) formData.get("meetingDate");
        int protocolNumber = (int) formData.get("protocolNumber");
        boolean meetingPlaceInHeadquarters = (boolean) formData.get("meetingPlaceInHeadquarters");
        String place = meetingPlaceName(formData);
        Address meetingAddress = getMeetingAddress(formData);
        boolean formalConvening = (boolean) formData.get("formalConvening");
        Set<NaturalPerson> naturalPersonPresent = getAllNaturalPersonPresent(formData, company);
        return new FinancialStatementProtocol();
    }

    private static Set<NaturalPerson> getAllNaturalPersonPresent(Map<String, Object> formData, Company company) {
        List<Long> naturalPersonIdList = (List<Long>) formData.get("listIdPresentIndividualPartners");
        Set<NaturalPerson> naturalPersonPresent = null;
        if (naturalPersonIdList.size()>0){
            for (Long naturalPersonId: naturalPersonIdList) {
                NaturalPerson personPresent = company.getPartners().getIndividualPartners()
                        .stream()
                        .filter(partner->partner.getId().equals(naturalPersonId))
                        .findFirst().get();
                naturalPersonPresent.add(personPresent);
            }
        }
        return naturalPersonPresent;
    }

    private static Set<JuridicalPerson> getAllCompanyJuridicalPersonPresent(Map<String, Object> formData, Company company) {
        List<Long> juridicalPersonIdList = (List<Long>) formData.get("listIdPresentsCompanyPartners");
        Set<JuridicalPerson> juridicalPersonSet = null;
        if (juridicalPersonIdList.size()>0){
            for (Long juridicalPersonId: juridicalPersonIdList) {
                JuridicalPerson personPresent = company.getPartners().getPartnerCompanies()
                        .stream()
                        .filter(partner->partner.getId().equals(juridicalPersonId))
                        .findFirst().get();
                juridicalPersonSet.add(personPresent);
            }
        }
        return juridicalPersonSet;
    }
    private static String meetingPlaceName(Map<String, Object> formData) {
        if(!(boolean)formData.get("meetingPlaceInHeadquarters")){
            return (String) formData.get("meetingPlace");
        }
        return null;
    }

    private static Address getMeetingAddress(Map<String, Object> formData){
        if(!(boolean)formData.get("meetingPlaceInHeadquarters")) {
            Address address = Address.builder()
                    .city((String) formData.get("city"))
                    .streetName((String) formData.get("streetName"))
                    .localNumber((String) formData.get("localNumber"))
                    .streetNumber((String) formData.get("streetNumber"))
                    .zipCode((String) formData.get("zipCode"))
                    .build();
            return address;
        }
        return null;
    }

}
