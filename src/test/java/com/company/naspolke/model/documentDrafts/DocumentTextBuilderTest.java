package com.company.naspolke.model.documentDrafts;

import com.company.naspolke.model.company.Address;
import com.company.naspolke.model.company.Company;
import com.company.naspolke.model.company.financialStatements.FinancialStatementProtocol;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.BaseFont;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
class DocumentTextBuilderTest {

    DocumentTextBuilder generatorMock = new DocumentTextBuilder(new ProtocolFactory(), new ProtocolPattern());


    @Before
    void Before() {
        FontFactory.registerDirectory("src/main/resources/drafts/fonts/natoSans/");
    }

    @Test
    void getProtocolHeader_testProtocolHeaderText_generatedValidHeaderText() {
        //Arrange
        Company companyMock = Company.builder().companyName("Allegro sp. z o.o.").address(Address.builder().city("Poznań").build()).build();
        FinancialStatementProtocol protocolInfoMock = FinancialStatementProtocol.builder()
                .dateOfTheShareholdersMeeting(LocalDate.of(2022, 8, 30))
                .protocolNumber(1)
                .build();

        String expectedResult = """
                Protokół nr 1/30/8/2022
                Zwyczajnego Zgromadzenia Wspólników spółki pod firmą
                Allegro sp. z o.o. z siedzibą w Poznaniu
                z dnia 30 sierpnia 2022 r.
                """;

        //Act
        String sut = generatorMock.getProtocolHeader(companyMock, protocolInfoMock).getContent();

        //Assert
        assertEquals(expectedResult, sut);
    }

    @Test
    void getProtocolHeader_testProtocolHeaderTextAlignment_useProperAlignmentWhenHeaderIsGenerated() {
        //Arrange
        Company companyMock = Company.builder().companyName("Allegro sp. z o.o.").address(Address.builder().city("Poznań").build()).build();
        FinancialStatementProtocol protocolInfoMock = FinancialStatementProtocol.builder()
                .dateOfTheShareholdersMeeting(LocalDate.of(2022, 8, 30))
                .protocolNumber(1)
                .build();

        Font font = FontFactory.getFont("NotoSans-Bold.ttf", BaseFont.IDENTITY_H);
        font.setSize(15);

        Paragraph paragraph = new Paragraph("""
                Protokół nr 1/30/8/2022
                Zwyczajnego Zgromadzenia Wspólników spółki pod firmą
                Allegro sp. z o.o. z siedzibą w Poznaniu
                z dnia 30 sierpnia 2022 r.
                """, font);
        paragraph.setAlignment(Paragraph.ALIGN_CENTER);
        int expectedResult = paragraph.getAlignment();

        //Act
        int sut = generatorMock.getProtocolHeader(companyMock, protocolInfoMock).getAlignment();

        //Assert
        assertEquals(expectedResult, sut);
    }

    @Test
    void getProtocolHeader_testProtocolHeaderFontSize_useProperFontSizeWhenHeaderIsGenerated() {
        //Arrange
        Company companyMock = Company.builder().companyName("Allegro sp. z o.o.").address(Address.builder().city("Poznań").build()).build();
        FinancialStatementProtocol protocolInfoMock = FinancialStatementProtocol.builder()
                .dateOfTheShareholdersMeeting(LocalDate.of(2022, 8, 30))
                .protocolNumber(1)
                .build();

        float expectedResult = 15;

        //Act
        float sut = generatorMock.getProtocolHeader(companyMock, protocolInfoMock).getFont().getSize();

        //Assert
        assertEquals(expectedResult, sut);
    }

    @Test
    void getProtocolHeader_testProtocolHeaderFontFamily_useProperFontFamilyInProtocolHeader() {
        //Arrange
        Company companyMock = Company.builder().companyName("Allegro sp. z o.o.").address(Address.builder().city("Poznań").build()).build();
        FinancialStatementProtocol protocolInfoMock = FinancialStatementProtocol.builder()
                .dateOfTheShareholdersMeeting(LocalDate.of(2022, 8, 30))
                .protocolNumber(1)
                .build();

        String expectedResult = "Noto Sans";
        //Act
        String sut = generatorMock.getProtocolHeader(companyMock, protocolInfoMock).getFont().getFamilyname();

        //Assert
        assertEquals(expectedResult, sut);
    }

//TODO rozbić testy na sprawdzanie rodziny czcionek, wielkości czcionek, treści i justowania paragrafu
    @Test
    void getMeetingPlaceInfo_testMeetingPlaceInHeadquarterText_generatedValidMeetingPlaceText() throws IOException {

        //Arrange
        Company companyMock = Company.builder()
                .companyName("SWLEX sp. z o.o.")
                .address(Address.builder().city("Poznań").build()).build();
        FinancialStatementProtocol protocol = FinancialStatementProtocol.builder()
                .dateOfTheShareholdersMeeting(LocalDate.of(2023, 1, 1))
                .meetingPlaceInHeadquarters(true)
                .build();

        String result = "Dnia 1 stycznia 2023 r. w siedzibie spółki odbyło się Zwyczajne Zgromadzenie Wspólników " +
                "spółki pod firmą SWLEX sp. z o.o. z siedzibą w Poznaniu.\n" +
                "Na Zwyczajnym Zgromadzeniu Wspólników stawili się:";

        //Act
        String sut = generatorMock.getMeetingPlaceInfo(companyMock, protocol).getContent();

        //Assert
        assertEquals(result, sut);
    }

    @Test
    void getMeetingPlaceInfo_testMeetingPlaceNotInHeadquarterText_generatedValidMeetingPlaceText() throws IOException {

        //Arrange
        Company companyMock = Company.builder()
                .companyName("SWLEX sp. z o.o.")
                .address(Address.builder().city("Poznań").build()).build();
        FinancialStatementProtocol protocol = FinancialStatementProtocol.builder()
                .dateOfTheShareholdersMeeting(LocalDate.of(2023, 1, 1))
                .meetingPlaceInHeadquarters(false)
                .meetingPlace("Kancelarii Notarialnej Agnieszki Pawlusiewicz")
                .address(Address.builder()
                        .city("Poznań")
                        .streetName("Kwiatowa")
                        .streetNumber("30")
                        .zipCode("60-511")
                        .build())
                .build();

        String result ="Dnia 1 stycznia 2023 r. w Kancelarii Notarialnej Agnieszki Pawlusiewicz (ul. Kwiatowa 30, 60-511 Poznań) odbyło się Zwyczajne Zgromadzenie Wspólników " +
                "spółki pod firmą SWLEX sp. z o.o. z siedzibą w Poznaniu.\n" +
                "Na Zwyczajnym Zgromadzeniu Wspólników stawili się:";

        //Act
        String sut = generatorMock.getMeetingPlaceInfo(companyMock, protocol).getContent();

        //Assert
        assertEquals(result, sut);
    }
}