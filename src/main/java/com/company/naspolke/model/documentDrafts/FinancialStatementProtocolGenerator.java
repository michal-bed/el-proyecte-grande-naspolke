package com.company.naspolke.model.documentDrafts;


import com.company.naspolke.model.company.Company;
import com.company.naspolke.model.company.financialStatements.FinancialStatementProtocol;
import com.fasterxml.jackson.core.json.UTF8JsonGenerator;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.rythmengine.Rythm;
import org.springframework.context.annotation.Configuration;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
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

    public static void generateWordDocument(Company company, FinancialStatementProtocol financialStatementsProtocol) throws FileNotFoundException, DocumentException {
        Document document = new Document();
        PdfWriter.getInstance(document, new FileOutputStream("src/main/resources/drafts/financialStatements/iTextHelloWorld.pdf"));
        document.open();
        Font font1 = FontFactory.getFont(FontFactory.TIMES_ROMAN, 16, BaseColor.BLACK);

//        Paragraph paragraph = new Paragraph("Lorem \nipsum dolor sit amet,\n consectetur adipiscing elit. Aliquam non lacus augue. Aliquam at porttitor enim, tincidunt placerat ex. Etiam sollicitudin, urna in dignissim tristique, orci sapien luctus lectus, et eleifend lacus est a eros. Vivamus nunc orci, commodo vel nulla in, malesuada cursus orci. Proin vulputate posuere nulla, sed lacinia mi volutpat vel. Cras congue tellus diam, id fringilla turpis porttitor non. Nam faucibus vestibulum vehicula. Proin magna velit, egestas quis malesuada ac, viverra sed neque. Nullam nec nisl vel lacus posuere sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam blandit, velit vel imperdiet mollis, sapien sapien sollicitudin erat, nec ullamcorper enim quam in metus. Nam tempus, velit accumsan lobortis pulvinar, velit metus porttitor magna, eu ullamcorper eros dui ac mi. Sed erat leo, sagittis id molestie at, pulvinar at purus. Proin vehicula, mi dignissim placerat ornare, erat sapien accumsan mauris, nec tincidunt metus justo sed sapien.", font1);
        String text1 = getTextFromFile();
        String text2 = replaceText(text1, company, financialStatementsProtocol);
        Paragraph chapter = new Paragraph(text2);
        document.add(chapter);
        document.close();

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
        {
            e.printStackTrace();
        }

        String fileContent = contentBuilder.toString();
        return fileContent;
    }

    private static String replaceText(String text, Company company, FinancialStatementProtocol financialStatementsProtocol){
        Integer s = financialStatementsProtocol.getProtocolNumber();
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
}