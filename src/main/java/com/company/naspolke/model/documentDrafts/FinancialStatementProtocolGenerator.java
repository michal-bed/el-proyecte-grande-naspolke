package com.company.naspolke.model.documentDrafts;

import com.company.naspolke.model.company.Company;
import com.company.naspolke.model.company.companyBodies.Partners.JuridicalPerson;
import com.company.naspolke.model.company.companyBodies.Partners.NaturalPerson;
import com.company.naspolke.model.company.financialStatements.FinancialStatementProtocol;
import com.company.naspolke.model.company.financialStatements.resolutions.ElectionResolution;
import com.company.naspolke.model.company.financialStatements.resolutions.FinancialStatementResolution;
import com.company.naspolke.model.company.financialStatements.resolutions.ResolutionApprovalBodyMember;
import com.company.naspolke.model.company.financialStatements.resolutions.VotingInterface;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import org.rythmengine.Rythm;
import org.springframework.stereotype.Component;

import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.*;
import java.util.List;
import java.util.stream.Stream;
import static com.company.naspolke.model.documentDrafts.ChangeDigitsIntoWords.changeDigitsIntoWords;

import static com.company.naspolke.model.documentDrafts.ProtocolPattern.*;
import static com.company.naspolke.model.documentDrafts.WordFormsHandler.*;

@Component
public class FinancialStatementProtocolGenerator {
    private final ProtocolFactory protocolFactory;
    private final DocumentTextBuilder textBuilder;
    private int resolutionCount = 1;

    public FinancialStatementProtocolGenerator(ProtocolFactory protocolFactory, DocumentTextBuilder textBuilder) {
        this.protocolFactory = protocolFactory;
        this.textBuilder = textBuilder;
    }

    @SuppressWarnings("finally")
    public Document generatePdfDocument(Company company, FinancialStatementProtocol financialStatementInformation, String fileName) throws IOException {
        //Create new pdf file
            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, new FileOutputStream("src/main/webapp/na-spolke-client/src/protocols/"+fileName));
            document.open();

//        int resolutionCount = 1;

        // Set protocol Header
        Paragraph protocolHeader = textBuilder.getProtocolHeader(company, financialStatementInformation);
        document.add(protocolHeader);

        //Set meeting place
        Paragraph meetingPlace = textBuilder.getMeetingPlaceInfo(company, financialStatementInformation);
        document.add(meetingPlace);

        //Set attendants list
            List<Paragraph> attendantsListText = setAttendantsList(financialStatementInformation, true, company);
            for (Paragraph paragraph :attendantsListText) {
                Paragraph listElement = protocolFactory.getAttendanceElementListOfShareholders(paragraph);
                document.add(listElement);
            }

            //Set Chairperson text
            String chairpersonInfo = getChairmanInfo(financialStatementInformation);
        Paragraph chairpersonParagraph = protocolFactory.getPlainTextAfterList(chairpersonInfo);
            document.add(chairpersonParagraph);

            //Set chairperson resolution
            String resolutionTitle = getResolutionTitle(company, financialStatementInformation, financialStatementInformation.getChairperson().getResolutionTitle());
            String resolutionText = getMeetingOrganVotingResolutionText(financialStatementInformation.getChairperson(), company, ProtocolPattern.resolutionChairpersonText);
            String resolutionVoting = getResolutionVoting(financialStatementInformation.getChairperson(), "tajnym");
            List<Paragraph> chairpersonResolutionParagraph = protocolFactory.getResolution(resolutionTitle, resolutionText, resolutionVoting);
            chairpersonResolutionParagraph.forEach(document::add);

            //Set recorder resolution
            String recorderResolutionTitle = getResolutionTitle(company, financialStatementInformation, financialStatementInformation.getRecorder().getResolutionTitle());
            String recorderResolutionText = getMeetingOrganVotingResolutionText(financialStatementInformation.getRecorder(), company, ProtocolPattern.resolutionRecorderText);
            String recorderResolutionVoting = getResolutionVoting(financialStatementInformation.getRecorder(), "tajnym");
            List<Paragraph> recorderResolutionParagraph = protocolFactory.getResolution(recorderResolutionTitle, recorderResolutionText, recorderResolutionVoting);
            recorderResolutionParagraph.forEach(document::add);

            //Set protocolAttendanceInfo
            Chunk protocolAttendanceInfo = getAttendanceInfo("Zwyczajnego");
            Chunk protocolValidationFormula = getProtocolValidationFormula(financialStatementInformation, company);
            Paragraph protocolAttendanceAndValidation = protocolFactory.getParagraphRegularFromChunks(protocolAttendanceInfo, protocolValidationFormula);
            document.add(protocolAttendanceAndValidation);

            //Set information about agenda
            Paragraph paragraphAboutAgenda = protocolFactory.getPlaneProtocolText(ProtocolPattern.informationAboutAgenda);
            document.add(paragraphAboutAgenda);

            //Set agenda resolution
            String agendaResolutionTitle = getResolutionTitle(company, financialStatementInformation, financialStatementInformation.getAgendaResolution().getResolutionTitle());
            List<String> agenda = getAgendaResolutionText(financialStatementInformation);
            String agendaVoting = getResolutionVoting(financialStatementInformation.getAgendaResolution(), "jawnym");

            Paragraph agendaResolutionTitleParagraph = protocolFactory.getResolutionTitleParagraph(agendaResolutionTitle);
            Paragraph agendaResolutionIntroduction = protocolFactory.getResolutionTextParagraph(String.format(ProtocolPattern.agendaIntroduction, "Zwyczajne"));
            List<Paragraph> agendaResolutionList = protocolFactory.getNumberedListInResolution(agenda);
            Paragraph agendaResolutionVotingParagraph = protocolFactory.getResolutionVotingParagraph(agendaVoting);

            document.add(agendaResolutionTitleParagraph);
            document.add(agendaResolutionIntroduction);
            agendaResolutionList.forEach(document::add);
            document.add(agendaResolutionVotingParagraph);


            //Set financial statement resolution
            String financialStatementTitle = getFinancialStatementTitle(financialStatementInformation);
            String financialStatementResolutionTitle = getResolutionTitle(company,financialStatementInformation, financialStatementTitle);
            String financialStatementResolutionText = getFinancialStatementResolutionText(company, financialStatementInformation);
            String financialStatementResolutionVoting = getResolutionVoting(financialStatementInformation.getFinancialStatementResolution(), "jawnym");
            List<Paragraph> financialStatementResolutionParagraph = protocolFactory.getResolution(financialStatementResolutionTitle,
                    financialStatementResolutionText, financialStatementResolutionVoting);
            financialStatementResolutionParagraph.forEach(document::add);

            //Set amount profit or lose resolution
            String profitOrLoseTitlePart = getProfitLoseInfo(financialStatementInformation);
            String profitOrLoseTitle = getResolutionTitle(company, financialStatementInformation, profitOrLoseTitlePart);

            String profitOrLoseText = getProfitLoseResolutionText(company, financialStatementInformation);
            String profitOrLoseVoting = getResolutionVoting(financialStatementInformation.getProfitOrLoss(),"jawnym");

            List<Paragraph> profitOrLoseParagraphs = protocolFactory.getResolution(profitOrLoseTitle, profitOrLoseText, profitOrLoseVoting);
            profitOrLoseParagraphs.forEach(document::add);

            //Set approval resolution
            List<Paragraph> approvalResolutions = getApprovalResolutionTitle(financialStatementInformation, "board", company);
            approvalResolutions.forEach(document::add);
            List<Paragraph> approvalResolutionsDirectors = getApprovalResolutionTitle(financialStatementInformation, "directors", company);
            approvalResolutionsDirectors.forEach(document::add);

            //conclusions of the meeting
            Paragraph conclusions = protocolFactory.getPlaneProtocolText(conclusionsOfTheMeeting);
            document.add(conclusions);

            document.newPage();
            //appendix
            String appendix = getAppendixText(company, financialStatementInformation);
            Paragraph appendixParagraph = protocolFactory.getAppendixInfo(appendix);
            document.add(appendixParagraph);

            Paragraph appendixAttendanceHeaderParagraph = protocolFactory.getProtocolHeader("LISTA OBECNOŚCI");
            document.add(appendixAttendanceHeaderParagraph);
            Paragraph appendixAttendanceIntroParagraph = protocolFactory.getPlaneProtocolText(appendixAttendanceListIntro);
            document.add(appendixAttendanceIntroParagraph);

            List<Paragraph> attendantsEndListText = setAttendantsList(financialStatementInformation, false, company);
            for (Paragraph paragraph: attendantsEndListText) {
                Paragraph signPlace = protocolFactory.getPlaceForPartnersSign();
                document.add(signPlace);
                document.add(paragraph);
            }

//        Paragraph recorderAndChairpersonSignPlace = protocolFactory.recorderAndChairpersonSign();
//        document.add(recorderAndChairpersonSignPlace);
            String recorderName = getMeetingOrganPersonName(financialStatementInformation.getRecorder());
            String chairpersonName = getMeetingOrganPersonName(financialStatementInformation.getChairperson());

            Table signTable = protocolFactory.getSignTable(recorderName, chairpersonName);
            document.add(signTable);
            document.close();
            //close file
            resolutionCount = 1;
            return document;

    }

    private void setMeetingPlace(Company company, FinancialStatementProtocol financialStatementInformation, Document document) throws IOException {
        String meetingPlaceText = setMeetingPlaceText(company, financialStatementInformation);
        Paragraph meetingPlaceParagraph = protocolFactory.getPlaneProtocolText(meetingPlaceText);
        document.add(meetingPlaceParagraph);
    }

    Paragraph getProtocolHeader(Company company, FinancialStatementProtocol financialStatementInformation) {
        String header = generateProtocolText(company, financialStatementInformation);
        return protocolFactory.getProtocolHeader(header);
    }

    //TODO try finaly
    private String getMeetingOrganPersonName(ElectionResolution resolution) {
        if(resolution.getIndividual()!=null){
            return getPartnerFullName(resolution.getIndividual());
        }else {
            return getPartnerFullName(resolution.getCompany());
        }
    }

    private String getAppendixText(Company company, FinancialStatementProtocol protocolData) {
        LocalDate meetingDate = protocolData.getDateOfTheShareholdersMeeting();
        String protocolNumber = String.format(protocolNumberPattern, protocolData.getProtocolNumber(),
                meetingDate.getDayOfMonth(), meetingDate.getMonthValue(), meetingDate.getYear());
        String companyName = company.getCompanyName();
        String companyCity = placeConjugated(company.getAddress().getCity());
        return String.format(appendixInfo,protocolNumber, companyName, companyCity);
    }

    private List<Paragraph> getApprovalResolutionTitle(FinancialStatementProtocol financialStatementInformation, String bodyType, Company company) {
        List<Paragraph> paragraphList = new ArrayList<>(List.of());
        Set<ResolutionApprovalBodyMember> boardMemberList = financialStatementInformation.getBoardMembersApproval();
        List<ResolutionApprovalBodyMember> boardMembers;
        if(Objects.equals(bodyType, "board")) {
            boardMembers = boardMemberList.stream().toList();
        } else {
            boardMembers = financialStatementInformation.getDirectorsMembersApproval().stream().toList();
        }

        for (ResolutionApprovalBodyMember resolution: boardMembers){
            String periodOfOffice = getPeriodOfOffice(financialStatementInformation, resolution);
            String function;
            String personalPronoun;
            String functionProperForm;
            String name, nameII, lastname, lastnameII, gender, personalPronounII;
            if (bodyType.equals("board")){
                function = Objects.equals(resolution.getBoardMember().getFunction(), "PREZES ZARZĄDU") ? "Prezesowi Zarządu" :
                        "Członkowi Zarządu";
                functionProperForm = Objects.equals(resolution.getBoardMember().getFunction(), "PREZES ZARZĄDU") ? "Prezesa Zarządu" :
                        "Członka Zarządu";
                personalPronoun = resolution.getBoardMember().getGender()=='m'?"niego" : "nią";
                personalPronounII = resolution.getBoardMember().getGender()=='m'?"mu" : "jej";
                name = resolution.getBoardMember().getFirstName();
                nameII = resolution.getBoardMember().getSecondName()!=null ? resolution.getBoardMember().getSecondName():"";
                lastname = resolution.getBoardMember().getLastNameI();
                lastnameII = resolution.getBoardMember().getLastNameII()!=null ? resolution.getBoardMember().getLastNameII():"";
                gender = resolution.getBoardMember().getGender()=='m'?"Pan" :"Pani";
            } else {
                function = "Członkowi Rady Nadzorczej";
                functionProperForm = "Członka Rady Nadzorczej";
                personalPronoun = resolution.getDirector().getGender()=='m'?"niego" : "nią";
                personalPronounII = resolution.getDirector().getGender()=='m'?"mu" : "jej";
                name = resolution.getDirector().getFirstName();
                nameII = resolution.getDirector().getSecondName()!=null ? resolution.getDirector().getSecondName():"";
                lastname = resolution.getDirector().getLastNameI();
                lastnameII = resolution.getDirector().getLastNameII()!=null ? resolution.getDirector().getLastNameII():"";
                gender = resolution.getDirector().getGender()=='m'?"Pan" :"Pani";
            }
            String properWordForm = gender.equals("Pan")? "pełnił " : "pełniła";

            String title = String.format(approvalResolutionHeader, function, personalPronoun, periodOfOffice);
            String resolutionHeader = getResolutionTitle(company, financialStatementInformation, title);
            Paragraph resolutionHeaderParagraph = protocolFactory.getResolutionTitleParagraph(resolutionHeader);
            paragraphList.add(resolutionHeaderParagraph);

            String text1 = String.format(approvalResolutionText1, gender);
            String nameAndSurname = getPartnerFullName(name, nameII, lastname,lastnameII);
            String text2 = String.format(approvalResolutionText2, periodOfOffice, properWordForm, functionProperForm,
                    personalPronounII, personalPronoun);
            Chunk resolutionTextPart1 = protocolFactory.getResolutionRegularChunkOfText(text1);
            Chunk resolutionTextPart2 = protocolFactory.getResolutionBoldChunkOfText(nameAndSurname);
            Chunk resolutionTextPart3 = protocolFactory.getResolutionRegularChunkOfText(text2);
            Paragraph resolutionText = protocolFactory.getParagraphResolutionFromChunks(resolutionTextPart1, resolutionTextPart2, resolutionTextPart3);
            paragraphList.add(resolutionText);

            String voting = getResolutionVoting(resolution, "tajnym");
            String exclusion = checkForVotingExclusion(financialStatementInformation, name, lastname);
            if(!Objects.equals(exclusion, "")) {
                paragraphList.add(protocolFactory.getPlainTextAfterList(exclusion));
            }
            Paragraph votingParagraph = protocolFactory.getResolutionVotingParagraph(voting);
            paragraphList.add(votingParagraph);

        }
        return paragraphList;
    }

    private String checkForVotingExclusion(FinancialStatementProtocol financialStatementInformation, String name, String lastname) {
        boolean isExcluded = isPartnerExcluded(financialStatementInformation, name, lastname);
        if(isExcluded){
            return String.format(exclusionFromVoting, correctLetterCases(name.concat(" ").concat(lastname)).trim());
        }
        return "";
    }

    private boolean isPartnerExcluded(FinancialStatementProtocol financialStatementInformation,String name, String lastname) {
        if(financialStatementInformation.getListPresentsCompanyPartners()!=null) {
            boolean companyPartnerPresent = financialStatementInformation.getListPresentsCompanyPartners().stream()
                    .anyMatch(person -> person.getRepresentativeFirstname().equals(name) && person.getRepresentativeLastname().equals(lastname));
            if (!companyPartnerPresent && financialStatementInformation.getListPresentIndividualPartners()!=null) {
                return financialStatementInformation.getListPresentIndividualPartners().stream()
                        .anyMatch(naturalPerson -> naturalPerson.getFirstName().equals(name) && naturalPerson.getLastNameI().equals(lastname));
            }
            return true;
        }
        return false;
    }


    private String getPartnerFullName(String name,String nameII,String lastname,String lastnameII) {
            String fullName = name.concat(" ").concat(nameII)
                    .concat(" ").concat(lastname).concat(" ").concat(lastnameII)
                    .concat(" ");
            return correctLetterCases(fullName);
    }

    private String getPeriodOfOffice(FinancialStatementProtocol financialStatementInformation, ResolutionApprovalBodyMember resolution) {
        if (resolution.isWholeReportingPeriod()) {
            return getWholePeriod(financialStatementInformation.getFinancialStatementResolution().getBeginningReportingPeriod(),
                    financialStatementInformation.getFinancialStatementResolution().getEndReportingPeriod());
        } else {
            return getWholePeriod(resolution.getBeginningOfReportingPeriod(), resolution.getEndOfReportingPeriod());
        }
    }


    private String getProfitLoseResolutionText(Company company, FinancialStatementProtocol financialStatementInformation) {
        String resolutionTextBeginning = getOfficialApprovalText(company);
        String profitOrLoseInfo = getProfitLoseInfo(financialStatementInformation);
        String profitOrLoseText = getAmountProfitOrLoseText(financialStatementInformation.getProfitOrLoss().getProfitOrLossValue(),
                "zysk zostanie przeznaczony","strata zostanie pokryta","");
        String coverageOfLossOrProfitAllocation = financialStatementInformation.getProfitOrLoss().getCoverageOfLossOrProfitAllocation();
        if (Objects.equals(coverageOfLossOrProfitAllocation, "inne...")){
            coverageOfLossOrProfitAllocation = financialStatementInformation.getProfitOrLoss().getCoverageOfLossOrProfitAllocationDifferentWay();
        }
        return String.format(amountProfitLoseText, resolutionTextBeginning, profitOrLoseInfo, profitOrLoseText, coverageOfLossOrProfitAllocation);
    }

    private String getProfitLoseInfo(FinancialStatementProtocol financialStatementInformation) {
        String profitLoseText = getAmountProfitOrLoseText(financialStatementInformation.getProfitOrLoss().getProfitOrLossValue(),
                "podziału zysku", "pokrycia straty", "");
        String period = getWholePeriod(financialStatementInformation.getFinancialStatementResolution().getBeginningReportingPeriod(),
                financialStatementInformation.getFinancialStatementResolution().getEndReportingPeriod());
        return String.format(amountProfitLoseTitle, profitLoseText, period);
    }

    private String getFinancialStatementResolutionText(Company company, FinancialStatementProtocol financialStatementInformation) {
        FinancialStatementResolution resolutionInfo = financialStatementInformation.getFinancialStatementResolution();
        String officialApproval = getOfficialApprovalText(company);
        String reportingPeriod = getWholePeriod(financialStatementInformation.getFinancialStatementResolution().getBeginningReportingPeriod(),
                financialStatementInformation.getFinancialStatementResolution().getEndReportingPeriod());
        String endPeriod = getPeriod(resolutionInfo.getEndReportingPeriod());
        String sumOfAssetsAndLiabilities = String.valueOf(resolutionInfo.getSumOfAssetsAndLiabilities());
        String amountProfitOrLoss = getAmountProfitOrLoseText(financialStatementInformation.getProfitOrLoss().getProfitOrLossValue(),
                "zysk w wysokości ","stratę w wysokości ","sumę ");
        String amountProfitOrLossValue = String.valueOf(financialStatementInformation.getProfitOrLoss().getProfitOrLossValue());
        return String.format(financialStatementResolution, officialApproval,reportingPeriod, endPeriod, sumOfAssetsAndLiabilities,
                amountProfitOrLoss, amountProfitOrLossValue);
    }

    private String getAmountProfitOrLoseText(BigDecimal value, String profitText, String LoseText, String zeroText) {
        if (value!=null) {
            if(value.compareTo(new BigDecimal("0")) > 0) {
                return profitText;
            } else if (value.compareTo(new BigDecimal("0")) < 0) {
                return LoseText;
            }
        }
        return zeroText;
    }

    private String getOfficialApprovalText(Company company) {
        String companyHeadQuarter = WordFormsHandler.placeConjugated(company.getAddress().getCity());
        return String.format(startingResolutionText, company.getCompanyName(), companyHeadQuarter);
    }

    private String getFinancialStatementTitle(FinancialStatementProtocol financialStatementInformation) {
        String reportingPeriod = getWholePeriod(financialStatementInformation.getFinancialStatementResolution().getBeginningReportingPeriod(),
                financialStatementInformation.getFinancialStatementResolution().getEndReportingPeriod());
        return String.format(financialStatementResolutionTitle,reportingPeriod);
    }

    private String getWholePeriod(LocalDate beginningDate, LocalDate endDate) {
        String beginningPeriod = getPeriod(beginningDate);
        String endPeriod = getPeriod(endDate);
        return String.format(ProtocolPattern.reportingPeriodPattern, beginningPeriod, endPeriod);
    }
    private String getPeriod(LocalDate date){
        String day = String.valueOf(date.getDayOfMonth());
        String monthInWords = getMonthInWord(date.getMonthValue());
        String year =  String.valueOf(date.getYear());
        return day.concat(" ").concat(monthInWords).concat(" ").concat(year);
    }

    private List<String> getAgendaResolutionText(FinancialStatementProtocol financialStatementInformation) {
        List<String> agendaList = new ArrayList<>(List.of(ProtocolPattern.agendaPointsConstant.split("\n")));
        String profitLoseInformation = getProfitLoseInformation(financialStatementInformation);
        agendaList.set(agendaList.indexOf("%s"), profitLoseInformation);
        for (int i = 0; i < agendaList.size(); i++) {
            agendaList.set(i,agendaList.get(i).replace("%s", String.valueOf(i+1)));
        }
        return agendaList;
    }

    private String getProfitLoseInformation(FinancialStatementProtocol protocolInfo) {
            BigDecimal profitLoseAmount = protocolInfo.getProfitOrLoss().getProfitOrLossValue();
        if (profitLoseAmount!=null) {
            if(profitLoseAmount.compareTo(new BigDecimal("0")) > 0){
                return ProtocolPattern.agendaProfit;
            } else if (profitLoseAmount.compareTo(new BigDecimal("0")) < 0) {
                return ProtocolPattern.agendaLose;
            }
        }
        return ProtocolPattern.agendaNoProfitAndNoLose;
    }

    private Chunk getProtocolValidationFormula(FinancialStatementProtocol financialStatementInformation, Company company) {
        String convening;
        String percentAttendance = "cały kapitał zakładowy";
        String legalBasis = "238 k.s.h.";
        String objectionsToTheResolutionsInfo="";
        if(!financialStatementInformation.isFormalConvening()){
            convening = ProtocolPattern.conveningUnofficialFormula;
            legalBasis = "240 k.s.h.";
            objectionsToTheResolutionsInfo=ProtocolPattern.objectionsToTheResolutionsInfo;
        } else {
            convening = ProtocolPattern.conveningFormalFormula;
            percentAttendance = getAttendancePercentInfo(financialStatementInformation, company);
        }
        String sharesCount = getPresentSharesInfo(financialStatementInformation);
        String meetingValidationFormula = String.format(ProtocolPattern.meetingValidationFormula, convening, sharesCount,
                getSharesInfo(company.getSharesCount()), percentAttendance, legalBasis, objectionsToTheResolutionsInfo);
        return protocolFactory.getRegularChunkOfText(meetingValidationFormula);
    }

    private String getAttendancePercentInfo(FinancialStatementProtocol protocol, Company company) {
        int presentPartnerCount = (int) countSharesPresent(protocol);
        int partnersInCompany = company.getSharesCount();
        int percent = presentPartnerCount * 100 / partnersInCompany;
        return percent +"% udziałów";
    }
    private String getSharesInfo(long sharesCount){
        String sharesCountInWords = changeDigitsIntoWords(sharesCount);
        String sharesCorrectForm = getWordCorrectForm("udział", (int) sharesCount);
        return String.format("%d (słownie: %s) %s",sharesCount, sharesCountInWords, sharesCorrectForm);
    }
    private String getPresentSharesInfo(FinancialStatementProtocol protocol){
        long sharesCount = countSharesPresent(protocol);
        return getSharesInfo(sharesCount);
    }

    private long countSharesPresent(FinancialStatementProtocol protocol) {
        long companyPartnersSharesCount = 0;
        long individualPartnersSharesCount = 0;
        if(protocol.getListPresentsCompanyPartners()!=null) {
            companyPartnersSharesCount = protocol.getListPresentsCompanyPartners().stream()
                    .map(JuridicalPerson::getSharesCount)
                    .reduce(0, Integer::sum);
        }
        if(protocol.getListPresentIndividualPartners()!=null) {
            individualPartnersSharesCount = protocol.getListPresentIndividualPartners().stream()
                    .map(NaturalPerson::getSharesCount)
                    .reduce(0, Integer::sum);
        }
        return companyPartnersSharesCount + individualPartnersSharesCount;
    }

    private Chunk getAttendanceInfo(String meetingType) {
        String attendanceInfo = String.format(ProtocolPattern.protocolAttendanceInfo, meetingType);
        return protocolFactory.getRegularChunkOfText(attendanceInfo);
    }

    private String getResolutionVoting(VotingInterface voting, String votingType) {
        if(voting.isUnanimously()){
            return String.format(ProtocolPattern.ResolutionVotingUnanimously, votingType);
        } else {
            int votesSum = voting.getVotesFor() + voting.getVotesAgainst() + voting.getVotesAbstentions();
            String votesAllForm = getWordCorrectForm("głos", votesSum);
            String votesFormFor = getWordCorrectForm("głos", voting.getVotesFor());
            String votesFormAgainst = getWordCorrectForm("głos", voting.getVotesAgainst());
            String votesFormAbstentions = getWordCorrectForm("głos", voting.getVotesAbstentions());
            String resolutionPassed = voting.getVotesFor()>voting.getVotesAgainst()? "" : "nie ";
            return String.format(ProtocolPattern.resolutionVotingNotUnanimously, votingType, votesSum, votesAllForm, voting.getVotesFor(),
                    votesFormFor, voting.getVotesAgainst(), votesFormAgainst, voting.getVotesAbstentions(), votesFormAbstentions, resolutionPassed);
        }
    }

    private String getMeetingOrganVotingResolutionText(ElectionResolution resolution, Company company, String resolutionText) {
        String minutesType = "Zwyczajne";
        String companyName = company.getCompanyName();
        String companyCity = placeConjugated(company.getAddress().getCity());
        String gender;
        String name;
        if (resolution.getIndividual()!=null) {
            gender = resolution.getIndividual().getGender()=='m'?"Pan":"Pani";
            name = getPartnerFullName(resolution.getIndividual()).trim();
        } else {
            gender = resolution.getCompany().getRepresentativeGender()=='m'?"Pan":"Pani";
            name = getPartnerFullName(resolution.getCompany()).trim();
        }
        return String.format(resolutionText, minutesType, companyName, companyCity, gender, name);
    }

    private String generateProtocolText(Company company, FinancialStatementProtocol financialStatementsProtocol){
//        String text = getTextFromFile(WordFormsHandler.PROTOCOL_HEADER);
        return getProtocolHeaderPattern(company, financialStatementsProtocol);
//        return fillTextTemplate(text, company, financialStatementsProtocol);
    }

    public String getProtocolHeaderPattern(Company company, FinancialStatementProtocol financialStatementsProtocol) {
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

    private List<Paragraph> setAttendantsList(FinancialStatementProtocol protocol, boolean getPresentPartners, Company company) {
        int counter = 0;
        Set<NaturalPerson> naturalPartners;
        Set<JuridicalPerson> juridicalPartners;
        if (getPresentPartners){
            naturalPartners = protocol.getListPresentIndividualPartners();
            juridicalPartners = protocol.getListPresentsCompanyPartners();
        } else {
            naturalPartners = company.getPartners().getIndividualPartners();
            juridicalPartners = company.getPartners().getPartnerCompanies();
        }
        List<Paragraph> personList= new java.util.ArrayList<>(List.of());
        if (protocol.getListPresentIndividualPartners()!=null) {
            for (NaturalPerson partner : protocol.getListPresentIndividualPartners()) {
                counter++;
                String partnerName = getPartnerFullName(partner);
                String sharesProperForm = getWordCorrectForm("udział", partner.getSharesCount());
                String sharesInWords = changeDigitsIntoWords((long) partner.getSharesCount());
                float sharesValue = Float.parseFloat(partner.getSharesValue().toString());
                String punctuationMark = checkForPunctuationMark(protocol, counter);
                String number = counter + ". ";
                String infoAboutPresentPartner = String.format(" posiadający %d %s (słownie: %s%2$s) i tyle samo głosów o łacznej wartości nominalnej w wysokości %.2f zł%s\n",
                        partner.getSharesCount(), sharesProperForm, sharesInWords, sharesValue, punctuationMark);

                Chunk numberChunk = protocolFactory.getRegularChunkOfText(number);
                Chunk nameOfThePresentPartner = protocolFactory.getBoldChunkOfText(partnerName);
                Chunk infoAboutPresentPartnerWithoutName = protocolFactory.getRegularChunkOfText(infoAboutPresentPartner);

                Paragraph paragraph = protocolFactory.getParagraphRegularFromChunks(numberChunk, nameOfThePresentPartner, infoAboutPresentPartnerWithoutName);

                personList.add(paragraph);
            }
        }

        if(protocol.getListPresentsCompanyPartners()!=null) {
            for (JuridicalPerson partner : protocol.getListPresentsCompanyPartners()) {
                counter++;
                String companyName = partner.getName();
                int sharesCount = partner.getSharesCount();
                String sharesProperForm = getWordCorrectForm("udział", partner.getSharesCount());
                String sharesCountInWords = changeDigitsIntoWords((long) partner.getSharesCount());
                float sharesValue = Float.parseFloat(partner.getSharesValue().toString());
                String representation = setProperRepresentationName(partner).strip();
                String punctuationMark = checkForPunctuationMark(protocol, counter);
                String number = counter + ".";
                String infoAboutPresentPartner = String.format(" posiadająca %d %s (słownie: %s%2$s) i tyle samo głosów o łącznej wartości nominalnej w wysokości %.2f zł, którą reprezentuje %s%s\n",
                        sharesCount, sharesProperForm, sharesCountInWords, sharesValue, representation, punctuationMark);

                Chunk numberChunk = protocolFactory.getRegularChunkOfText(number);
                Chunk presentCompanyName = protocolFactory.getBoldChunkOfText(companyName);
                Chunk infoAboutPresentPartnerWithoutName = protocolFactory.getRegularChunkOfText(infoAboutPresentPartner);
                Paragraph paragraph = protocolFactory.getParagraphRegularFromChunks(numberChunk, presentCompanyName, infoAboutPresentPartnerWithoutName);
                personList.add(paragraph);
            }
        }
        return personList;
    }
    private String checkForPunctuationMark(FinancialStatementProtocol protocol, int counter) {
        int indListLength = 0;
        if (protocol.getListPresentIndividualPartners() != null) {
            indListLength = protocol.getListPresentIndividualPartners().size();
        }
        int companyListLength = 0;
        if (protocol.getListPresentsCompanyPartners()!=null) {
            companyListLength = protocol.getListPresentsCompanyPartners().size();
        }
        boolean isLastElementInList = counter == indListLength && companyListLength == 0 || counter == indListLength + companyListLength;
        return isLastElementInList ? ".": ";";
    }

    private String setProperRepresentationName(JuridicalPerson partner) {
        String firstName = correctLetterCases(partner.getRepresentativeFirstname());
        String lastName = correctLetterCases(partner.getRepresentativeLastname());
        return firstName.concat(" ").concat(lastName);
    }

    private String getWordCorrectForm(String word, int count) {
        if(count==1){
            return word;
        } else if (count > 5 && count < 22) {
            return word+"ów";
        } else if (count % 10 >= 2 & count % 10 < 5) {
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
        return String.format(ProtocolPattern.resolutionPattern,resolutionNumber, minutesType, company.getCompanyName(), placeConjugated(company.getAddress().getCity()),  resolutionDate, title);
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

}
