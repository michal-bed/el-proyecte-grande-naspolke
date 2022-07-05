package com.company.naspolke.model.documentDrafts;


import com.company.naspolke.model.company.Company;
import com.company.naspolke.model.company.financialStatements.FinancialStatementProtocol;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.apache.poi.xwpf.usermodel.*;
import org.osgl.$;
import org.osgl.util.S;
import org.rythmengine.Rythm;
import org.springframework.context.annotation.Configuration;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;



@Configuration
@Data
@RequiredArgsConstructor
public class FinancialStatementProtocolGenerator {

    private Company company;
    FinancialStatementProtocol financialStatementProtocolInformation;

    public FinancialStatementProtocolGenerator(Company company, FinancialStatementProtocol financialStatementProtocolInformation) {
        this.company = company;
        this.financialStatementProtocolInformation = financialStatementProtocolInformation;
    }

    public static void saveDocument(XWPFDocument document) throws IOException {
        try {
            File file = new File("src/main/resources/drafts/financialStatements/Test.docx");
            file.delete();
            file.createNewFile();
            document.write(new FileOutputStream(file));
            document.close();
        } catch (IOException e) {
            System.out.printf(e.toString());
            throw new RuntimeException(e);
        }
    }

    public static void generateWordDocument(Company company, FinancialStatementProtocol financialStatementsProtocol) throws IOException {
        XWPFDocument document = new XWPFDocument();
        XWPFDocument template = new XWPFDocument(new FileInputStream("src/main/resources/drafts/financialStatements/protocolStyle.docx"));
        XWPFStyles newStyles = document.createStyles();
        generateProtocolHeader(document, template, newStyles, company, financialStatementsProtocol);
        generateMeetingPlace(document, template, newStyles, company, financialStatementsProtocol);
        saveDocument(document);

    }

    private static void generateProtocolHeader(XWPFDocument document, XWPFDocument template, XWPFStyles newStyles, Company company, FinancialStatementProtocol financialStatementsProtocol) throws IOException {
        XWPFStyle heading = template.getStyles().getStyle("NaglowekProtokol");
        newStyles.addStyle(heading);
        XWPFParagraph pBody = document.createParagraph();
        String text = getTextFromFile(Utils.PROTOCOL_HEADER);
        String finalText = replaceText(text, company, financialStatementsProtocol);
        List<String> paragraphsInHeader = addParagraphsToHeader(finalText);
        XWPFRun run1 = pBody.createRun();
        pBody.setStyle(heading.getStyleId());
        run1.setStyle(heading.getStyleId());
        for (int i = 0; i < paragraphsInHeader.size()-1; i++) {
            run1.setText(paragraphsInHeader.get(i));
            run1.addCarriageReturn();
        }
    }
    private static void generateMeetingPlace(XWPFDocument document, XWPFDocument template, XWPFStyles newStyles, Company company, FinancialStatementProtocol financialStatementsProtocol) throws IOException{
        XWPFStyle heading = template.getStyles().getStyle("TekstProtokol");
        newStyles.addStyle(heading);
        XWPFParagraph pBody = document.createParagraph();
        if(financialStatementsProtocol.isMeetingPlaceInHeadquarters()){
            String text = getTextFromFile(Utils.MEETING_PLACE_IN_HEADQUARTERS);
            String finalText = replaceText(text, company, financialStatementsProtocol);
            XWPFRun run1 = pBody.createRun();
            pBody.setStyle(heading.getStyleId());
            run1.setStyle(heading.getStyleId());
            run1.setText(finalText);
//            run1.addCarriageReturn();
        } else {
            String text = getTextFromFile(Utils.MEETING_PLACE_NOT_IN_HEADQUARTERS);
            String finalText = replaceText(text, company, financialStatementsProtocol);
            XWPFRun run1 = pBody.createRun();
            pBody.setStyle(heading.getStyleId());
            run1.setStyle(heading.getStyleId());
            run1.setText(finalText);
//            run1.addCarriageReturn();
        }
    }
    private static String getTextFromFile(String path){
        StringBuilder contentBuilder = new StringBuilder();

        try (Stream<String> stream
                     = Files.lines(Paths.get(path), StandardCharsets.UTF_8))
        {
            //Read the content with Stream
            stream.forEach(s -> contentBuilder.append(s).append("\n"));
        }
        catch (IOException e)
        { e.printStackTrace(); }

        String fileContent = contentBuilder.toString();
        return fileContent;
    }

    private static String replaceText(String text, Company company, FinancialStatementProtocol financialStatementsProtocol){
        Map<String,String> definition = new java.util.HashMap<>(Map.of("protocolNumber", String.valueOf(financialStatementsProtocol.getProtocolNumber()),
                "meetingType", "Zwyczajnego",
                "companyName", company.getCompanyName(),
                "meetingDay", String.valueOf(financialStatementsProtocol.getDateOfTheShareholdersMeeting().getDayOfMonth()),
                "meetingMonth", String.valueOf(financialStatementsProtocol.getDateOfTheShareholdersMeeting().getMonthValue()),
                "meetingYear", String.valueOf(financialStatementsProtocol.getDateOfTheShareholdersMeeting().getYear()),
                "meetingMonthInWords", Utils.getMonthInWord(financialStatementsProtocol.getDateOfTheShareholdersMeeting().getMonthValue()),
                "city", Utils.placeConjugated(company.getAddress().getCity()),
                "meetingPlace", financialStatementsProtocol.getMeetingPlace()));

        if (!financialStatementsProtocol.isMeetingPlaceInHeadquarters()){
            definition.put("meetingPlace", correctLetterCases(financialStatementsProtocol.getMeetingPlace()));
            definition.put("meetingStreetName", checkForPronoun(financialStatementsProtocol.getAddress().getStreetName()));
            definition.put("meetingStreetNumber", setProperStreetNumberFormat(financialStatementsProtocol));
            definition.put("meetingZipCode", financialStatementsProtocol.getAddress().getZipCode());
            definition.put("meetingCity", correctLetterCases(financialStatementsProtocol.getAddress().getCity()));
        }
        String result = Rythm.render(text, definition);
        return result;
    }
    private static List<String> addParagraphsToHeader(String text){
        return List.of(text.split("\n"));
    }

    private static String checkForPronoun(String placeName){
        String correctedPlaceName = "";
        if (placeName.toUpperCase().contains("OS.")) {
            return correctLetterCases(placeName);
        } else if (placeName.toUpperCase().contains("UL.")) {
            return correctLetterCases(placeName);
        } else if (placeName.toUpperCase().contains("UL")) {
            correctedPlaceName = placeName.toUpperCase().replace("UL", "Ul.");
            return correctLetterCases(correctedPlaceName);
        } else if ((placeName.toUpperCase().contains("OS "))){
            correctedPlaceName = placeName.toUpperCase().replace("OS", "Os.");
            return correctLetterCases(correctedPlaceName);
        } else if ((placeName.toUpperCase().contains("OSIEDLE"))){
            correctedPlaceName = placeName.toUpperCase().replace("OSIEDLE", "Os.");
            return correctLetterCases(correctedPlaceName);
        } else if (placeName.toUpperCase().contains("OŚ.")) {
            String replaceEstate = placeName.toUpperCase().replace("OŚ.", "Os.");
            return correctLetterCases(replaceEstate);
        } else if (placeName.toUpperCase().contains("PL.")) {
            return correctLetterCases(placeName);
        } else if (placeName.toUpperCase().contains("PL ")) {
            correctedPlaceName = placeName.toUpperCase().replace("PL", "PL.");
            return correctLetterCases(correctedPlaceName);
        } else if (placeName.toUpperCase().contains("AL.")) {
            return correctLetterCases(placeName);
        } else if (placeName.toUpperCase().contains("ALEJA")) {
            correctedPlaceName = placeName.toUpperCase().replace("ALEJA", "AL.");
            return correctLetterCases(correctedPlaceName);
        } else if (placeName.toUpperCase().contains("AL ")) {
            correctedPlaceName = placeName.toUpperCase().replace("AL", "AL.");
            return correctLetterCases(correctedPlaceName);
        }

        return "ul. ".concat(correctLetterCases(placeName));
    }

    private static String correctLetterCases(String text){
        if (text.trim().contains(" ")){
            String[] partialText = text.split(" ");
            StringBuilder changeCase= new StringBuilder();
            for (String part: partialText) {
                if (Utils.NO_UPPER_CASE.contains(part.toLowerCase())){
                    changeCase.append(part.toLowerCase());
                } else {
                    changeCase.append(part.substring(0, 1).toUpperCase().concat(part.substring(1).toLowerCase()));
                }
            }
            return changeCase.toString();
        }
        return text.substring(0,1).toUpperCase().concat(text.substring(1).toLowerCase());
    }

    private static String setProperStreetNumberFormat(FinancialStatementProtocol protocol){
        if(protocol.getAddress().getLocalNumber().isBlank()){
            return protocol.getAddress().getStreetNumber().trim();
        } else {
            return protocol.getAddress().getStreetNumber() + "/" + protocol.getAddress().getLocalNumber();
        }
    }
}