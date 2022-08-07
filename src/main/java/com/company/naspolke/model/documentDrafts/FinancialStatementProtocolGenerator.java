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
import java.util.Locale;
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

    public FinancialStatementProtocolGenerator(Company company, FinancialStatementProtocol financialStatementInformation) {
        this.company = company;
        this.financialStatementInformation = financialStatementInformation;
    }

    public void generatePdfDocument(Company company, FinancialStatementProtocol financialStatementInformation) throws IOException {
        //Create new pdf file
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, new FileOutputStream("src/main/resources/drafts/financialStatements/pdfTest.pdf"));
        document.open();

        // Set protocol Header
        Font headerFont = setFontStyle(FontStyles.PROTOCOL_HEADER);
        String header = generateProtocolText(company, financialStatementInformation);
        Paragraph protocolHeader = new Paragraph(header, headerFont);
        protocolHeader.setAlignment(Paragraph.ALIGN_CENTER);
        protocolHeader.setSpacingBefore(20);
        protocolHeader.setSpacingAfter(20);

        //Set meeting place
        Font regularTextFontStyle = setFontStyle(FontStyles.PROTOCOL_PLANE_TEXT);
        String meetingPlaceText = setMeetingPlaceText(company, financialStatementInformation);
        Paragraph meetingPlace = new Paragraph(meetingPlaceText, regularTextFontStyle);
        meetingPlace.setMultipliedLeading(1.5f);
        meetingPlace.setAlignment(Element.ALIGN_JUSTIFIED);

        //Set attendants list
        String attendantsListText = setAttendantsList(financialStatementInformation);
        Paragraph attendantsList = new Paragraph(attendantsListText, regularTextFontStyle);
        attendantsList.setAlignment(Element.ALIGN_JUSTIFIED);
        //line spacing
        attendantsList.setMultipliedLeading(1.5f);
        attendantsList.setSpacingAfter(10);
        attendantsList.setIndentationLeft(20);

        //Save text to pdf file
        document.add(protocolHeader);
        document.add(meetingPlace);
        document.add(attendantsList);
        document.close();

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

    private String setAttendantsList(FinancialStatementProtocol protocol) {
        int counter = 0;
        StringBuilder stringBuilder = new StringBuilder();
        for (NaturalPerson partner : protocol.getListPresentIndividualPartners()) {
            counter++;
            String partnerName = getPartnerFullName(partner);
            String sharesProperForm = getSharesProperForm(partner.getSharesCount());
            String sharesInWords = changeDigitsIntoWords((long) partner.getSharesCount());
            float sharesValue = Float.parseFloat(partner.getSharesValue().toString());
            String punctuationMark = checkForPunctuationMark(protocol, counter);
            stringBuilder.append(String.format(Locale.ITALY, "%d. %s posiadający %d %s (słownie: %s%4$s) o łacznej wartości nominalnej w wysokości %.2f zł%s\n",
                    counter, partnerName.trim(), partner.getSharesCount(), sharesProperForm, sharesInWords, sharesValue, punctuationMark));
        }
        for (JuridicalPerson partner:protocol.getListPresentsCompanyPartners()) {
            counter++;
            String companyName = partner.getName();
            int sharesCount = partner.getSharesCount();
            String sharesProperForm = getSharesProperForm(partner.getSharesCount());
            String sharesCountInWords = changeDigitsIntoWords((long) partner.getSharesCount());
            float sharesValue = Float.parseFloat(partner.getSharesValue().toString());
            String representation = setProperRepresentationName(partner).strip();
            String punctuationMark = checkForPunctuationMark(protocol, counter);
            stringBuilder.append(String.format(Locale.ITALY, "%d. %s posiadająca %d %s (słownie: %s%4$s) o łącznej wartości nominalnej w wysokości %.2f zł, którą reprezentuje %s%s\n",
                    counter, companyName, sharesCount,sharesProperForm, sharesCountInWords,sharesValue, representation, punctuationMark));
        }
        return stringBuilder.toString();
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
//TODO zamienić na String.format z array
}
