package com.company.naspolke.model.documentDrafts;

import com.company.naspolke.model.company.Company;
import com.company.naspolke.model.company.companyBodies.Partners.JuridicalPerson;
import com.company.naspolke.model.company.companyBodies.Partners.NaturalPerson;
import com.company.naspolke.model.company.financialStatements.FinancialStatementProtocol;
import com.company.naspolke.model.company.financialStatements.resolutions.VotingInterface;
import com.lowagie.text.Document;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.rythmengine.Rythm;
import org.springframework.beans.factory.annotation.Autowired;
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
    ProtocolFactory protocolFactory;
    int resolutionCount = 1;
    @Autowired
    public FinancialStatementProtocolGenerator(FinancialStatementProtocol financialStatementInformation, ProtocolFactory protocolFactory) {
        this.financialStatementInformation = financialStatementInformation;
        this.protocolFactory = protocolFactory;
    }

    public FinancialStatementProtocolGenerator(Company company, FinancialStatementProtocol financialStatementInformation, ProtocolFactory protocolFactory) {
        this.company = company;
        this.financialStatementInformation = financialStatementInformation;
        this.protocolFactory = protocolFactory;
    }

    public void generatePdfDocument(Company company, FinancialStatementProtocol financialStatementInformation) throws IOException {
        //Create new pdf file
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, new FileOutputStream("src/main/resources/drafts/financialStatements/pdfTest.pdf"));
        document.open();

        // Set protocol Header
        String header = generateProtocolText(company, financialStatementInformation);
        Paragraph protocolHeader = protocolFactory.getProtocolHeader(header);
        document.add(protocolHeader);

        //Set meeting place
        String meetingPlaceText = setMeetingPlaceText(company, financialStatementInformation);
        Paragraph meetingPlaceParagraph = protocolFactory.getPlaneProtocolText(meetingPlaceText);
        document.add(meetingPlaceParagraph);

        //Set attendants list
        List<Paragraph> attendantsListText = setAttendantsList(financialStatementInformation);
        for (Paragraph paragraph :attendantsListText) {
            Paragraph listElement = protocolFactory.getAttendanceElementListOfShareholders(paragraph);
            document.add(listElement);
        }

        //Set Chairperson text
        String chairpersonInfo = getChairmanInfo(financialStatementInformation);
        Paragraph chairpersonParagraph = protocolFactory.getPlainTextAfterList(chairpersonInfo);
        document.add(chairpersonParagraph);

        //Set chairperson resolution header
        String resolutionTitle = getResolutionTitle(company, financialStatementInformation, financialStatementInformation.getChairperson().getResolutionTitle());
        String resolutionText = getMeetingOrganVotingResolutionText(financialStatementInformation, company, ProtocolPattern.ResolutionChairpersonText);
        String resolutionVoting = getResolutionVoting(financialStatementInformation.getChairperson(), "tajnym");
        List<Paragraph> chairpersonResolutionParagraph = protocolFactory.getResolution(resolutionTitle, resolutionText, resolutionVoting);
        chairpersonResolutionParagraph.forEach(document::add);


        //close file
        document.close();
        resolutionCount = 1;
    }

    private String getResolutionVoting(VotingInterface voting, String votingType) {
        if(voting.isUnanimously()){
            return String.format(ProtocolPattern.ResolutionVotingUnanimously, votingType);
        } else {
            int votesSum = voting.getVotesFor() + voting.getVotesAgainst() + voting.getVotesAbstentions();
            String votesAllForm = getWordProperForm("głos", votesSum);
            String votesFormFor = getWordProperForm("głos", voting.getVotesFor());
            String votesFormAgainst = getWordProperForm("głos", voting.getVotesAgainst());
            String votesFormAbstentions = getWordProperForm("głos", voting.getVotesAbstentions());
            String resolutionPassed = voting.getVotesFor()>voting.getVotesAgainst()? "" : "nie ";
            return String.format(ProtocolPattern.ResolutionVotingNotUnanimously, votingType, votesSum, votesAllForm, voting.getVotesFor(),
                    votesFormFor, voting.getVotesAgainst(), votesFormAgainst, voting.getVotesAbstentions(), votesFormAbstentions, resolutionPassed);
        }
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

    private List<Paragraph> setAttendantsList(FinancialStatementProtocol protocol) {
        int counter = 0;
        List<Paragraph> personList= new java.util.ArrayList<>(List.of());
        for (NaturalPerson partner : protocol.getListPresentIndividualPartners()) {
            counter++;
            String partnerName = getPartnerFullName(partner);
            String sharesProperForm = getWordProperForm("udział", partner.getSharesCount());
            String sharesInWords = changeDigitsIntoWords((long) partner.getSharesCount());
            float sharesValue = Float.parseFloat(partner.getSharesValue().toString());
            String punctuationMark = checkForPunctuationMark(protocol, counter);
            String number = counter + ". ";
            String infoAboutPresentPartner = String.format( " posiadający %d %s (słownie: %s%2$s) o łacznej wartości nominalnej w wysokości %.2f zł%s\n",
                    partner.getSharesCount(), sharesProperForm, sharesInWords, sharesValue, punctuationMark);

            Chunk numberChunk = protocolFactory.getRegularChunkOfText(number);
            Chunk nameOfThePresentPartner = protocolFactory.getBoldChunkOfText(partnerName);
            Chunk infoAboutPresentPartnerWithoutName = protocolFactory.getRegularChunkOfText(infoAboutPresentPartner);

            Paragraph paragraph = protocolFactory.getParagraphFromChunks(numberChunk, nameOfThePresentPartner, infoAboutPresentPartnerWithoutName);

            personList.add(paragraph);
        }
        for (JuridicalPerson partner:protocol.getListPresentsCompanyPartners()) {
            counter++;
            String companyName = partner.getName();
            int sharesCount = partner.getSharesCount();
            String sharesProperForm = getWordProperForm("udział", partner.getSharesCount());
            String sharesCountInWords = changeDigitsIntoWords((long) partner.getSharesCount());
            float sharesValue = Float.parseFloat(partner.getSharesValue().toString());
            String representation = setProperRepresentationName(partner).strip();
            String punctuationMark = checkForPunctuationMark(protocol, counter);
            String number = counter + ".";
            String infoAboutPresentPartner = String.format(" posiadająca %d %s (słownie: %s%2$s) o łącznej wartości nominalnej w wysokości %.2f zł, którą reprezentuje %s%s\n",
                    sharesCount,sharesProperForm, sharesCountInWords,sharesValue, representation, punctuationMark);

            Chunk numberChunk = protocolFactory.getRegularChunkOfText(number);
            Chunk presentCompanyName = protocolFactory.getBoldChunkOfText(companyName);
            Chunk infoAboutPresentPartnerWithoutName = protocolFactory.getRegularChunkOfText(infoAboutPresentPartner);
            Paragraph paragraph = protocolFactory.getParagraphFromChunks(numberChunk, presentCompanyName, infoAboutPresentPartnerWithoutName);
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

    private String getWordProperForm(String word, int sharesCount) {
        if(sharesCount==1){
            return word;
        } else if (sharesCount > 5 && sharesCount < 22) {
            return word+"ów";
        } else if (sharesCount % 10 >= 2 & sharesCount % 10 < 5) {
            return word+"y";
        } else {
            return word+"ów";
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
