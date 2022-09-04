package com.company.naspolke.model.documentDrafts;

import com.company.naspolke.model.company.Address;
import com.company.naspolke.model.company.Company;
import com.company.naspolke.model.company.financialStatements.FinancialStatementProtocol;
import com.lowagie.text.Paragraph;
import org.springframework.stereotype.Component;

import java.io.IOException;

import static com.company.naspolke.model.documentDrafts.ProtocolPattern.protocolNumberPattern;
import static com.company.naspolke.model.documentDrafts.WordFormsHandler.*;


@Component
public class DocumentTextBuilder {

    private final ProtocolFactory protocolFactory;
    private final ProtocolPattern protocolPattern;
    public DocumentTextBuilder(ProtocolFactory protocolFactory, ProtocolPattern protocolPattern) {
        this.protocolFactory = protocolFactory;
        this.protocolPattern = protocolPattern;
    }


    Paragraph getProtocolHeader(Company company, FinancialStatementProtocol financialStatementInformation){
    String header = getProtocolHeaderFromPattern(company, financialStatementInformation);
        return protocolFactory.getProtocolHeader(header);
    }
    public Paragraph getMeetingPlaceInfo(Company company, FinancialStatementProtocol financialStatementInformation) throws IOException {
        String meetingPlaceText = setMeetingPlaceText(company, financialStatementInformation);
        return protocolFactory.getPlaneProtocolText(meetingPlaceText);
    }

    private String getProtocolHeaderFromPattern(Company company, FinancialStatementProtocol financialStatementsProtocol) {
        String meetingType = "Zwyczajnego";
        String companyName = company.getCompanyName();
        String companyCity = WordFormsHandler.placeConjugated(company.getAddress().getCity());
        String protocolDate = setResolutionDate(financialStatementsProtocol);
        String protocolNumber = String.format(protocolNumberPattern, financialStatementsProtocol.getProtocolNumber(),
                financialStatementsProtocol.getDateOfTheShareholdersMeeting().getDayOfMonth(),
                financialStatementsProtocol.getDateOfTheShareholdersMeeting().getMonthValue(),
                financialStatementsProtocol.getDateOfTheShareholdersMeeting().getYear());
        return String.format(ProtocolPattern.resolutionHeaderText, protocolNumber, meetingType, companyName, companyCity, protocolDate);
    }

    private String setResolutionDate(FinancialStatementProtocol protocol) {
        String day = String.valueOf(protocol.getDateOfTheShareholdersMeeting().getDayOfMonth());
        String monthInWord = getMonthInWord(protocol.getDateOfTheShareholdersMeeting().getMonthValue());
        String year = String.valueOf(protocol.getDateOfTheShareholdersMeeting().getYear());
        return String.format("%s %s %s r.", day, monthInWord, year);
    }


    private String setMeetingPlaceText(Company company, FinancialStatementProtocol financialStatementsProtocol) throws IOException {
        return String.format(protocolPattern.meetingPlace, setResolutionDate(financialStatementsProtocol),
                setMeetingPlaceInformation(financialStatementsProtocol), company.getCompanyName(),
                WordFormsHandler.placeConjugated(company.getAddress().getCity()));

    }

    private String setMeetingPlaceInformation(FinancialStatementProtocol financialStatementsProtocol) {
        if (financialStatementsProtocol.isMeetingPlaceInHeadquarters()) {
            return "w siedzibie spółki";
        } else {
            String meetingPlaceName = setMeetingPlaceName(financialStatementsProtocol);
            String setAddress = setAddressPlace(financialStatementsProtocol.getAddress());
            return meetingPlaceName.concat(" ").concat(setAddress);
        }
    }

    private String setAddressPlace(Address address) {
        return String.format("(%s %s%s, %s %s)", WordFormsHandler.checkForPronoun(address.getStreetName()), address.getStreetNumber(),checkBuildingNumber(address.getLocalNumber()),
                address.getZipCode(), correctLetterCases(address.getCity()));
    }

    private String checkBuildingNumber(String localNumber) {
        if(localNumber!=null){
            return "/"+localNumber;
        } else {
            return "";
        }
    }

    private String setMeetingPlaceName(FinancialStatementProtocol financialStatementInfo){
        if(financialStatementInfo.getAddress() != null){
            String[] meetingPlaceNameSplit = financialStatementInfo.getMeetingPlace().trim().split(" ");
            meetingPlaceNameSplit[0] = setProperPreposition(meetingPlaceNameSplit[0]);
            return String.join(" ", meetingPlaceNameSplit);
        }
        else {
            throw new IllegalArgumentException();
        }
    }
}
