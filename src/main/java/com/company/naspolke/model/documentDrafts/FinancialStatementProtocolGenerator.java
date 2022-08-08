package com.company.naspolke.model.documentDrafts;

import com.company.naspolke.model.company.Company;
import com.company.naspolke.model.company.companyBodies.Partners.JuridicalPerson;
import com.company.naspolke.model.company.companyBodies.Partners.NaturalPerson;
import com.company.naspolke.model.company.financialStatements.FinancialStatementProtocol;
import com.lowagie.text.Document;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.rythmengine.Rythm;
import org.springframework.stereotype.Component;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;
import static com.company.naspolke.model.documentDrafts.ChangeDigitsIntoWords.changeDigitsIntoWords;

import static com.company.naspolke.model.documentDrafts.FontStyleGenerator.setFontStyle;
import static com.company.naspolke.model.documentDrafts.WordFormsHandler.*;

@Component
@Data
@RequiredArgsConstructor
public class FinancialStatementProtocolGenerator {

    private Company company;
    FinancialStatementProtocol financialStatementInformation;
    int resolutionCount = 1;


    public FinancialStatementProtocolGenerator(Company company, FinancialStatementProtocol financialStatementInformation) {
        this.company = company;
        this.financialStatementInformation = financialStatementInformation;
    }

    public void generatePdfDocument(Company company, FinancialStatementProtocol financialStatementInformation) throws IOException {
        //Create new pdf file
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, new FileOutputStream("src/main/resources/drafts/financialStatements/pdfTest.pdf"));
        document.open();
        Font headerFont = setFontStyle(FontStyles.PROTOCOL_HEADER);
        Font regularTextFont = setFontStyle(FontStyles.PROTOCOL_PLANE_TEXT);
        Font resolutionHeaderFont = setFontStyle(FontStyles.PROTOCOL_RESOLUTION_HEADER);
        Font planeTextBoldFont = setFontStyle(FontStyles.PROTOCOL_RESOLUTION_TEXT_BOLD);
        Font resolutionTextFont = setFontStyle(FontStyles.PROTOCOL_RESOLUTION_TEXT);

        // Set protocol Header
        String header = generateProtocolText(company, financialStatementInformation);
        Paragraph protocolHeader = new Paragraph(header, headerFont);
        protocolHeader.setAlignment(Paragraph.ALIGN_CENTER);
        protocolHeader.setSpacingBefore(20);
        protocolHeader.setSpacingAfter(20);
        document.add(protocolHeader);

        //Set meeting place
        String meetingPlaceText = setMeetingPlaceText(company, financialStatementInformation);
        Paragraph meetingPlace = new Paragraph(meetingPlaceText, regularTextFont);
        meetingPlace.setMultipliedLeading(1.5f);
        meetingPlace.setAlignment(Element.ALIGN_JUSTIFIED);
        meetingPlace.setSpacingAfter(10);

        document.add(meetingPlace);

        //Set attendants list
        List<Paragraph> attendantsListText = setAttendantsList(financialStatementInformation, planeTextBoldFont,regularTextFont);
        for (Paragraph paragraph :attendantsListText) {
            paragraph.setAlignment(Element.ALIGN_JUSTIFIED);
            //line spacing
            paragraph.setMultipliedLeading(1.5f);
            paragraph.setSpacingAfter(5);
            paragraph.setIndentationLeft(20);
            document.add(paragraph);
        }

        //Set Chairperson text
        String chairpersonInfo = getChairmanInfo(financialStatementInformation);
        Paragraph chairpersonText = new Paragraph(chairpersonInfo, regularTextFont);
        chairpersonText.setAlignment(Element.ALIGN_JUSTIFIED);
        chairpersonText.setMultipliedLeading(1.5f);
        chairpersonText.setSpacingBefore(10);
        chairpersonText.setSpacingAfter(10);
        document.add(chairpersonText);

        //Set chairperson resolution header
        String resolutionTitle = getResolutionTitle(company, financialStatementInformation, financialStatementInformation.getChairperson().getResolutionTitle());
        Paragraph chairpersonResolutionHeader = new Paragraph(resolutionTitle, resolutionHeaderFont);
        chairpersonResolutionHeader.setAlignment(Element.ALIGN_CENTER);
        chairpersonResolutionHeader.setSpacingAfter(10f);
        chairpersonResolutionHeader.setMultipliedLeading(1.5f);
        document.add(chairpersonResolutionHeader);

        //Set chairperson resolution text
        String resolutionText = getMeetingOrganVotingResolutionText(financialStatementInformation, company, ProtocolPattern.ResolutionChairpersonText);
        Paragraph chairpersonResolutionText = new Paragraph(resolutionText, resolutionTextFont);
        chairpersonResolutionText.setSpacingAfter(10);
        chairpersonResolutionText.setAlignment(Element.ALIGN_JUSTIFIED);
        chairpersonResolutionText.setIndentationLeft(25);
        chairpersonResolutionText.setIndentationRight(25);
        chairpersonResolutionText.setMultipliedLeading(1.5f);
        document.add(chairpersonResolutionText);

        //close file
        document.close();
        resolutionCount = 1;
    }

    private String getMeetingOrganVotingResolutionText(FinancialStatementProtocol financialStatementInformation, Company company, String resolutionText) {
        String minutesType = "Zwyczajne";
        String companyName = company.getCompanyName();
        String companyCity = placeConjugated(company.getAddress().getCity());
        String gender;
        String name;
        if (financialStatementInformation.getChairperson().getIndividual()!=null) {
            gender = financialStatementInformation.getChairperson().getIndividual().getGender()=='m'?"Pan":"Pani";
            name = getPartnerFullName(financialStatementInformation.getChairperson().getIndividual()).trim();
        } else {
            gender = financialStatementInformation.getChairperson().getCompany().getRepresentativeGender()=='m'?"Pan":"Pani";
            name = getPartnerFullName(financialStatementInformation.getChairperson().getCompany()).trim();
        }
        return String.format(resolutionText, minutesType, companyName, companyCity, gender, name);
    }

    private String generateProtocolText(Company company, FinancialStatementProtocol financialStatementsProtocol){
        String text = getTextFromFile(WordFormsHandler.PROTOCOL_HEADER);
        return fillTextTemplate(text, company, financialStatementsProtocol);
    }

    private String setMeetingPlaceText(Company company, FinancialStatementProtocol financialStatementsProtocol) throws IOException {
        String text;
        if (financialStatementsProtocol.isMeetingPlaceInHeadquarters()) {
            text = getTextFromFile(WordFormsHandler.MEETING_PLACE_IN_HEADQUARTERS);
        } else {
            text = getTextFromFile(WordFormsHandler.MEETING_PLACE_NOT_IN_HEADQUARTERS);
        }
        return fillTextTemplate(text, company, financialStatementsProtocol);
    }

    private String getTextFromFile(String path) {
        StringBuilder contentBuilder = new StringBuilder();
        try (Stream<String> stream
                     = Files.lines(Paths.get(path), StandardCharsets.UTF_8)) {
            //Read the content with Stream
            stream.forEach(s -> contentBuilder.append(s).append("\n"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return contentBuilder.toString();
    }

    private String fillTextTemplate(String text, Company company, FinancialStatementProtocol financialStatementsProtocol) {
        Map<String, String> definition = new java.util.HashMap<>(Map.of(
                "protocolNumber", String.valueOf(financialStatementsProtocol.getProtocolNumber()),
                "meetingType", "Zwyczajnego",
                "companyName", company.getCompanyName(),
                "meetingDay", String.valueOf(financialStatementsProtocol.getDateOfTheShareholdersMeeting().getDayOfMonth()),
                "meetingMonth", String.valueOf(financialStatementsProtocol.getDateOfTheShareholdersMeeting().getMonthValue()),
                "meetingYear", String.valueOf(financialStatementsProtocol.getDateOfTheShareholdersMeeting().getYear()),
                "meetingMonthInWords", WordFormsHandler.getMonthInWord(financialStatementsProtocol.getDateOfTheShareholdersMeeting().getMonthValue()),
                "city", WordFormsHandler.placeConjugated(company.getAddress().getCity()),
                "meetingPlace", financialStatementsProtocol.getMeetingPlace(),
                ".", "."));

        if (!financialStatementsProtocol.isMeetingPlaceInHeadquarters()) {
            definition.put("meetingPlace", correctLetterCases(financialStatementsProtocol.getMeetingPlace()));
            definition.put("meetingStreetName", checkForPronoun(financialStatementsProtocol.getAddress().getStreetName()));
            definition.put("meetingStreetNumber", setProperStreetNumberFormat(financialStatementsProtocol));
            definition.put("meetingZipCode", financialStatementsProtocol.getAddress().getZipCode());
            definition.put("meetingCity", correctLetterCases(financialStatementsProtocol.getAddress().getCity()));
        }
        return Rythm.render(text, definition);
    }

    private List<Paragraph> setAttendantsList(FinancialStatementProtocol protocol, Font planeTextBold, Font planeText) {
        int counter = 0;
        List<Paragraph> personList= new java.util.ArrayList<>(List.of());
        for (NaturalPerson partner : protocol.getListPresentIndividualPartners()) {
            Paragraph paragraph = new Paragraph();
            counter++;
            String partnerName = getPartnerFullName(partner);
            String sharesProperForm = getSharesProperForm(partner.getSharesCount());
            String sharesInWords = changeDigitsIntoWords((long) partner.getSharesCount());
            float sharesValue = Float.parseFloat(partner.getSharesValue().toString());
            String punctuationMark = checkForPunctuationMark(protocol, counter);
            String number = counter + ". ";
            paragraph.add(number);
            Chunk name = new Chunk(partnerName, planeTextBold);
            paragraph.add(name);
            Chunk restText = new Chunk(String.format( " posiadający %d %s (słownie: %s%2$s) o łacznej wartości nominalnej w wysokości %.2f zł%s\n",
                    partner.getSharesCount(), sharesProperForm, sharesInWords, sharesValue, punctuationMark), planeText);
            paragraph.add(restText);
            personList.add(paragraph);
        }
        for (JuridicalPerson partner:protocol.getListPresentsCompanyPartners()) {
            counter++;
            Paragraph paragraph = new Paragraph();
            String companyName = partner.getName();
            int sharesCount = partner.getSharesCount();
            String sharesProperForm = getSharesProperForm(partner.getSharesCount());
            String sharesCountInWords = changeDigitsIntoWords((long) partner.getSharesCount());
            float sharesValue = Float.parseFloat(partner.getSharesValue().toString());
            String representation = setProperRepresentationName(partner).strip();
            String punctuationMark = checkForPunctuationMark(protocol, counter);
            String number = counter + ".";
            paragraph.add(number);
            Chunk name = new Chunk(companyName, planeTextBold);
            paragraph.add(name);
            Chunk restText = new Chunk(String.format(" posiadająca %d %s (słownie: %s%2$s) o łącznej wartości nominalnej w wysokości %.2f zł, którą reprezentuje %s%s\n",
                    sharesCount,sharesProperForm, sharesCountInWords,sharesValue, representation, punctuationMark), planeText);
            paragraph.add(restText);
            personList.add(paragraph);
        }
        return personList;
    }
    private String checkForPunctuationMark(FinancialStatementProtocol protocol, int counter) {
        int indListLength = protocol.getListPresentIndividualPartners().size();
        int companyListLength = protocol.getListPresentsCompanyPartners().size();
        boolean isLastElementInList = counter == indListLength && companyListLength == 0 || counter == indListLength + companyListLength;
        return isLastElementInList ? ".": ";";
    }

    private String setProperRepresentationName(JuridicalPerson partner) {
        String firstName = correctLetterCases(partner.getRepresentativeFirstname());
        String lastName = correctLetterCases(partner.getRepresentativeLastname());
        return firstName.concat(" ").concat(lastName);
    }

    private String getSharesProperForm(int sharesCount) {
        if(sharesCount==1){
            return "udział";
        } else if (sharesCount > 5 && sharesCount < 22) {
            return "udziałów";
        } else if (sharesCount % 10 >= 2 & sharesCount % 10 < 5) {
            return "udziały";
        } else {
            return "udziałów";
        }
    }

    private String getPartnerFullName(NaturalPerson partner) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(partner.getFirstName()).append(" ");
        if(partner.getSecondName() != null){
            stringBuilder.append(partner.getSecondName()).append(" ");
        }
        stringBuilder.append(partner.getLastNameI()).append(" ");
        if(partner.getLastNameII() != null){
            stringBuilder.append(partner.getLastNameII()).append(" ");
        }
        return correctLetterCases(stringBuilder.toString());
    }
    private String getPartnerFullName(JuridicalPerson juridicalPerson){
        String nameAndSurname = juridicalPerson.getRepresentativeFirstname() + " " +
                juridicalPerson.getRepresentativeLastname();
        return correctLetterCases(nameAndSurname);
    }

    private String getChairmanInfo(FinancialStatementProtocol protocol){
        System.out.println(protocol.getChairperson().getIndividual());
        char genderSymbol=' ';
        String nameAndLastname = "";
        if(protocol.getChairperson().getCompany()== null && protocol.getChairperson().getIndividual()!=null) {
            NaturalPerson person = protocol.getChairperson().getIndividual();
            nameAndLastname = (getPartnerFullName(person));
            genderSymbol = person.getGender();
        } else if(protocol.getChairperson().getIndividual()==null && protocol.getChairperson().getCompany() != null) {
            JuridicalPerson person = protocol.getChairperson().getCompany();
            genderSymbol = person.getRepresentativeGender();
            nameAndLastname = getPartnerFullName(person);
        }
        String gender = genderSymbol =='m' ? "Pan" : "Pani";
        String statedForm = genderSymbol =='m' ? "stwierdził" : "stwierdziła";
        String properPossessivePronoun = genderSymbol=='m' ? "jego" : "jej";
        String expressedForm = genderSymbol=='m' ? "wyraził" : "wyraziła";
        return String.format("%s %s %s, iż na funkcję Przewodniczącego niniejszego Zgromadzenia zgłoszono %s kandydaturę, " +
                "na co %s zgodę, wobec czego przystąpiono do głosowania nad poniższą uchwałą.", gender, nameAndLastname,
                statedForm, properPossessivePronoun, expressedForm);
    }

    private String getResolutionTitle(Company company, FinancialStatementProtocol protocol, String title){
        String minutesType = "Zwyczajnego";
        String resolutionNumber = setResolutionNumber(protocol);
        String resolutionDate = setResolutionDate(protocol);
        return String.format(ProtocolPattern.ResolutionPattern,resolutionNumber, minutesType, company.getCompanyName(), placeConjugated(company.getAddress().getCity()),  resolutionDate, title);
    }

    private String setResolutionDate(FinancialStatementProtocol protocol) {
        String day = String.valueOf(protocol.getDateOfTheShareholdersMeeting().getDayOfMonth());
        String monthInWord = getMonthInWord(protocol.getDateOfTheShareholdersMeeting().getMonthValue());
        String year = String.valueOf(protocol.getDateOfTheShareholdersMeeting().getYear());
        return String.format("%s %s %s r.", day, monthInWord, year);
    }

    private String setResolutionNumber(FinancialStatementProtocol protocol) {
        String number = String.valueOf(resolutionCount);
        resolutionCount++;
        String day = String.valueOf(protocol.getDateOfTheShareholdersMeeting().getDayOfMonth());
        String month = String.valueOf(protocol.getDateOfTheShareholdersMeeting().getMonthValue());
        String year = String.valueOf(protocol.getDateOfTheShareholdersMeeting().getYear());
        return String.format("%s/%s/%s/%s", number, day,month,year);
    }
//TODO zamienić na String.format z array
//Uchwała nr %s \n" +
//            "%s  Zgromadzenia Wspólników %s %s\n" +
//            "z dnia %s \n" +
//            "w sprawie %s\n";

}
