package com.company.naspolke.model.documentDrafts;

import com.lowagie.text.*;
import com.lowagie.text.alignment.HorizontalAlignment;
import com.lowagie.text.alignment.VerticalAlignment;
import org.springframework.stereotype.Component;

import javax.swing.border.Border;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.company.naspolke.model.documentDrafts.FontStyleGenerator.setFontStyle;
import static com.company.naspolke.model.documentDrafts.ProtocolPattern.placeForSign;
import static com.company.naspolke.model.documentDrafts.ProtocolPattern.recorderAndChairpersonSign;

@Component
class ProtocolFactory {

    private final Font headerFont = setFontStyle(FontStyles.PROTOCOL_HEADER);
    private final Font regularTextFont = setFontStyle(FontStyles.PROTOCOL_PLANE_TEXT);
    private final Font resolutionHeaderFont = setFontStyle(FontStyles.PROTOCOL_RESOLUTION_HEADER);
    private final Font planeTextBoldFont = setFontStyle(FontStyles.PROTOCOL_TEXT_BOLD);
    private final Font textBoldAppendixFont = setFontStyle(FontStyles.PROTOCOL_APPENDIX_INFO);
    private final Font resolutionTextFont = setFontStyle(FontStyles.PROTOCOL_RESOLUTION_TEXT);
    private final Font resolutionTextBoldFont = setFontStyle(FontStyles.PROTOCOL_RESOLUTION_TEXT_BOLD);

    public Paragraph getProtocolHeader(String headerText){
        Paragraph protocolHeader = new Paragraph(headerText, headerFont);
        protocolHeader.setAlignment(Paragraph.ALIGN_CENTER);
        protocolHeader.setSpacingBefore(20);
        protocolHeader.setSpacingAfter(20);
        return protocolHeader;
    }

    public Paragraph getPlaneProtocolText(String protocolText){
        Paragraph regularParagraph = new Paragraph(protocolText, regularTextFont);
        regularParagraph.setAlignment(Element.ALIGN_JUSTIFIED);
        regularParagraph.setMultipliedLeading(1.5f);
        regularParagraph.setSpacingAfter(10);
        return regularParagraph;
    }

    public Paragraph getAppendixInfo(String text){
        Paragraph paragraph = new Paragraph(text, textBoldAppendixFont);
        paragraph.setAlignment(Element.ALIGN_LEFT);
        paragraph.setMultipliedLeading(1.2f);
        paragraph.setSpacingAfter(20);
        return paragraph;
    }
    public Paragraph getAttendanceElementListOfShareholders(Paragraph listElement){
        listElement.setAlignment(Element.ALIGN_JUSTIFIED);
        //line spacing
        listElement.setMultipliedLeading(1.5f);
        listElement.setSpacingAfter(5);
        listElement.setIndentationLeft(20);
        return listElement;
    }
    public Paragraph getPlainTextAfterList(String text){
        Paragraph plainTextAfterList = getPlaneProtocolText(text);
        plainTextAfterList.setSpacingBefore(10);
        return plainTextAfterList;
    }
    public List<Paragraph> getResolution(String resolutionTitle,String resolutionText, String resolutionVoting){
        Paragraph resolutionTitleParagraph = getResolutionTitleParagraph(resolutionTitle);
        Paragraph resolutionTextParagraph = getResolutionTextParagraph(resolutionText);
        Paragraph resolutionVotingParagraph = getResolutionVotingParagraph(resolutionVoting);
        return List.of(resolutionTitleParagraph, resolutionTextParagraph, resolutionVotingParagraph);
    }


    public Chunk getBoldChunkOfText(String text){
        return new Chunk(text, planeTextBoldFont);
    }
    public Chunk getResolutionBoldChunkOfText(String text){
        return new Chunk(text, resolutionTextBoldFont);
    }
    public Chunk getResolutionRegularChunkOfText(String text){
        return new Chunk(text, resolutionTextFont);
    }
    public Chunk getRegularChunkOfText(String text){
        return new Chunk(text, regularTextFont);
    }
    public Paragraph getParagraphResolutionFromChunks(Chunk... chunks){
        Paragraph paragraph = new Paragraph();
        paragraph.addAll(Arrays.asList(chunks));
        return formatResolutionTextParagraph(paragraph);

    }
    public Paragraph getParagraphRegularFromChunks(Chunk... chunks){
        Paragraph paragraph = new Paragraph();
        paragraph.addAll(Arrays.asList(chunks));
        paragraph.setMultipliedLeading(1.5f);
        paragraph.setAlignment(Element.ALIGN_JUSTIFIED);
        paragraph.setSpacingAfter(10);
        return paragraph;
    }
    public List<Paragraph> getNumberedListInResolution(List<String> listItems){
        List<Paragraph> numberedParagraphs = new ArrayList<>();
        for (String item: listItems) {
            Paragraph paragraph = new Paragraph(item, resolutionTextFont);
            paragraph.setMultipliedLeading(1.5f);
            paragraph.setAlignment(Element.ALIGN_JUSTIFIED);
            paragraph.setIndentationLeft(30);
            paragraph.setIndentationRight(25);
            numberedParagraphs.add(paragraph);
        }
        return numberedParagraphs;
    }

    public Paragraph getResolutionVotingParagraph(String resolutionText) {
        Paragraph resolutionVotingParagraph = new Paragraph(resolutionText, regularTextFont);
        resolutionVotingParagraph.setMultipliedLeading(1.5f);
        resolutionVotingParagraph.setAlignment(Element.ALIGN_JUSTIFIED);
        resolutionVotingParagraph.setSpacingAfter(10);
        resolutionVotingParagraph.setSpacingBefore(10);
        return resolutionVotingParagraph;
    }

    public Paragraph getResolutionTextParagraph(String resolutionText) {
        Paragraph resolutionTextParagraph = new Paragraph(resolutionText, resolutionTextFont);
        return formatResolutionTextParagraph(resolutionTextParagraph);
    }
    private Paragraph formatResolutionTextParagraph(Paragraph resolutionTextParagraph) {
        resolutionTextParagraph.setAlignment(Element.ALIGN_JUSTIFIED);
        resolutionTextParagraph.setIndentationLeft(25);
        resolutionTextParagraph.setIndentationRight(25);
        resolutionTextParagraph.setMultipliedLeading(1.5f);
        return resolutionTextParagraph;
    }

    public Paragraph getResolutionTitleParagraph(String resolutionTitle) {
        Paragraph resolutionTitleParagraph = new Paragraph(resolutionTitle, resolutionHeaderFont);
        resolutionTitleParagraph.setAlignment(Element.ALIGN_CENTER);
        resolutionTitleParagraph.setSpacingAfter(10f);
        resolutionTitleParagraph.setMultipliedLeading(1.5f);
        return resolutionTitleParagraph;
    }


    public Paragraph getPlaceForPartnersSign(){
        Paragraph paragraph = new Paragraph(placeForSign);
        paragraph.setAlignment(Element.ALIGN_CENTER);
        paragraph.setSpacingBefore(40);
        paragraph.setSpacingAfter(10);
        return paragraph;
    }

    public Paragraph recorderAndChairpersonSign(){
        Paragraph paragraph = new Paragraph(recorderAndChairpersonSign, regularTextFont);
        paragraph.setAlignment(Element.ALIGN_CENTER);
        return paragraph;
    }

    public Table getSignTable(String recorder, String chairperson){
        float[] pointColumnWidths = {150F, 150F};
        Table table = new Table(2, 3);
        table.setWidths(pointColumnWidths);
        table.setBorder(0);
        Cell cell1 = getCell("..........................");
        Cell cell2 = getCell("..........................");
        Cell cell3 = getCell(recorder);
        Cell cell4 = getCell(chairperson);
        Cell cell5 = getCell("Przewodniczący");
        Cell cell6 = getCell("Protokolant");

        table.addCell(cell1, 0,0);
        table.addCell(cell2, 0,1);
        table.addCell(cell3, 1,0);
        table.addCell(cell4, 1,1);
        table.addCell(cell5, 2,0);
        table.addCell(cell6, 2,1);
        return table;
    }
    private Cell getCell(String content){
        Chunk chunk = new Chunk(content, regularTextFont);
        Cell cell = new Cell(chunk);
        cell.setBorder(Rectangle.NO_BORDER);
        cell.setVerticalAlignment(VerticalAlignment.CENTER);
        cell.setHorizontalAlignment(HorizontalAlignment.CENTER);
        return cell;
    }
}
