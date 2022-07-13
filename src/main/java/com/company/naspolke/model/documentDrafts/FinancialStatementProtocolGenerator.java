package com.company.naspolke.model.documentDrafts;


import com.company.naspolke.model.company.Company;
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
import java.util.Map;
import java.util.stream.Stream;

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

    public  void generatePdfDocument(Company company, FinancialStatementProtocol financialStatementInformation) throws IOException {

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
        Font regularText = setFontStyle(FontStyles.PROTOCOL_PLANE_TEXT);
        String meetingPlaceText = setMeetingPlaceText(company, financialStatementInformation);
        Paragraph meetingPlace = new Paragraph(meetingPlaceText, regularText);
        meetingPlace.setAlignment(Element.ALIGN_JUSTIFIED);


        //Save text to pdf file
        document.add(protocolHeader);
        document.add(meetingPlace);
        document.close();

    }

    private  String generateProtocolText(Company company, FinancialStatementProtocol financialStatementsProtocol){
        String text = getTextFromFile(WordFormsHandler.PROTOCOL_HEADER);
        return fillTextTemplate(text, company, financialStatementsProtocol);
    }

    private  String setMeetingPlaceText(Company company, FinancialStatementProtocol financialStatementsProtocol) throws IOException {
        if (financialStatementsProtocol.isMeetingPlaceInHeadquarters()) {
            String text = getTextFromFile(WordFormsHandler.MEETING_PLACE_IN_HEADQUARTERS);
            return fillTextTemplate(text, company, financialStatementsProtocol);

        } else {
            String text = getTextFromFile(WordFormsHandler.MEETING_PLACE_NOT_IN_HEADQUARTERS);
            return fillTextTemplate(text, company, financialStatementsProtocol);
        }
    }

    private  String getTextFromFile(String path) {
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

    private  String fillTextTemplate(String text, Company company, FinancialStatementProtocol financialStatementsProtocol) {
        Map<String, String> definition = new java.util.HashMap<>(Map.of(
                "protocolNumber", String.valueOf(financialStatementsProtocol.getProtocolNumber()),
                "meetingType", "Zwyczajnego",
                "companyName", company.getCompanyName(),
                "meetingDay", String.valueOf(financialStatementsProtocol.getDateOfTheShareholdersMeeting().getDayOfMonth()),
                "meetingMonth", String.valueOf(financialStatementsProtocol.getDateOfTheShareholdersMeeting().getMonthValue()),
                "meetingYear", String.valueOf(financialStatementsProtocol.getDateOfTheShareholdersMeeting().getYear()),
                "meetingMonthInWords", WordFormsHandler.getMonthInWord(financialStatementsProtocol.getDateOfTheShareholdersMeeting().getMonthValue()),
                "city", WordFormsHandler.placeConjugated(company.getAddress().getCity()),
                "meetingPlace", financialStatementsProtocol.getMeetingPlace()));

        if (!financialStatementsProtocol.isMeetingPlaceInHeadquarters()) {
            definition.put("meetingPlace", correctLetterCases(financialStatementsProtocol.getMeetingPlace()));
            definition.put("meetingStreetName", checkForPronoun(financialStatementsProtocol.getAddress().getStreetName()));
            definition.put("meetingStreetNumber", setProperStreetNumberFormat(financialStatementsProtocol));
            definition.put("meetingZipCode", financialStatementsProtocol.getAddress().getZipCode());
            definition.put("meetingCity", correctLetterCases(financialStatementsProtocol.getAddress().getCity()));
        }
        return Rythm.render(text, definition);
    }
}