package com.company.naspolke.model.documentDrafts;


import com.company.naspolke.model.company.Company;
import com.company.naspolke.model.company.financialStatements.FinancialStatementProtocol;
import com.fasterxml.jackson.core.json.UTF8JsonGenerator;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.apache.commons.compress.utils.Lists;
import org.apache.poi.xssf.model.Styles;
import org.apache.poi.xwpf.usermodel.*;
import org.osgl.util.S;
import org.rythmengine.Rythm;
import org.springframework.context.annotation.Configuration;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import static org.apache.coyote.http11.Constants.a;


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
        File file = new File("src/main/resources/drafts/financialStatements/Test.docx");
        file.delete();
        file.createNewFile();
        document.write(new FileOutputStream(file));
        document.close();
    }

    public static void generateWordDocument(Company company, FinancialStatementProtocol financialStatementsProtocol) throws IOException {
        XWPFDocument document = new XWPFDocument();
        XWPFDocument template = new XWPFDocument(new FileInputStream("src/main/resources/drafts/financialStatements/protocolStyle.docx"));
        XWPFStyles newStyles = document.createStyles();
        XWPFStyle heading = template.getStyles().getStyle("NaglowekProtokol");
        newStyles.addStyle(heading);
        String text = getTextFromFile();
        String finalText = replaceText(text, company, financialStatementsProtocol);
        List<String> paragraphsInHeader = addParagraphsToHeader(finalText);
        generateBodyParagraphs(document, heading, paragraphsInHeader);
        saveDocument(document);

//        Document document = new Document();
//        PdfWriter.getInstance(document, new FileOutputStream("src/main/resources/drafts/financialStatements/iTextHelloWorld.pdf"));
//        document.open();
//        Font font1 = FontFactory.getFont(FontFactory.TIMES_ROMAN, 16, BaseColor.BLACK);
//
////        Paragraph paragraph = new Paragraph("Lorem \nipsum dolor sit amet,\n consectetur adipiscing elit. Aliquam non lacus augue. Aliquam at porttitor enim, tincidunt placerat ex. Etiam sollicitudin, urna in dignissim tristique, orci sapien luctus lectus, et eleifend lacus est a eros. Vivamus nunc orci, commodo vel nulla in, malesuada cursus orci. Proin vulputate posuere nulla, sed lacinia mi volutpat vel. Cras congue tellus diam, id fringilla turpis porttitor non. Nam faucibus vestibulum vehicula. Proin magna velit, egestas quis malesuada ac, viverra sed neque. Nullam nec nisl vel lacus posuere sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam blandit, velit vel imperdiet mollis, sapien sapien sollicitudin erat, nec ullamcorper enim quam in metus. Nam tempus, velit accumsan lobortis pulvinar, velit metus porttitor magna, eu ullamcorper eros dui ac mi. Sed erat leo, sagittis id molestie at, pulvinar at purus. Proin vehicula, mi dignissim placerat ornare, erat sapien accumsan mauris, nec tincidunt metus justo sed sapien.", font1);
//        String text1 = getTextFromFile();
//        String text2 = replaceText(text1, company, financialStatementsProtocol);
//        Paragraph chapter = new Paragraph(text2);
//        document.add(chapter);
//        document.close();
    }

    private static void generateBodyParagraphs(XWPFDocument document, XWPFStyle heading, List<String> text) throws IOException {
        XWPFParagraph pBody = document.createParagraph();
        XWPFRun run1 = pBody.createRun();
        pBody.setStyle(heading.getStyleId());
        run1.setStyle(heading.getStyleId());
        for (int i = 0; i < text.size()-1; i++) {
            run1.setText(text.get(i));
            run1.addCarriageReturn();
        }


//        XWPFParagraph pBody2 = document.createParagraph();
//        XWPFRun run2 = pBody2.createRun();
//        run2.setText(text);
//        run2.addCarriageReturn();
        // Empty paragraph
//        document.createParagraph();

    }
    private static String getTextFromFile(){
        StringBuilder contentBuilder = new StringBuilder();

        try (Stream<String> stream
                     = Files.lines(Paths.get("src/main/resources/drafts/financialStatements/protocolHeader.txt"), StandardCharsets.UTF_8))
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
        Map<String,String> definition = Map.of("protocolNumber", String.valueOf(financialStatementsProtocol.getProtocolNumber()),
                "meetingType","Zwyczajnego",
                "companyName", company.getCompanyName(),
                "meetingDay", String.valueOf(financialStatementsProtocol.getDateOfTheShareholdersMeeting().getDayOfMonth()),
                "meetingMonth", String.valueOf(financialStatementsProtocol.getDateOfTheShareholdersMeeting().getMonthValue()),
                "meetingYear", String.valueOf(financialStatementsProtocol.getDateOfTheShareholdersMeeting().getYear()),
                "meetingMonthInWords", Utils.getMonthInWord(financialStatementsProtocol.getDateOfTheShareholdersMeeting().getMonthValue()),
                "city", company.getAddress().getCity());
        String result = Rythm.render(text, definition);
        return result;
    }
    private static List<String> addParagraphsToHeader(String text){
        return List.of(text.split("\n"));

    }
}