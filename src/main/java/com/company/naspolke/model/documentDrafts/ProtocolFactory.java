package com.company.naspolke.model.documentDrafts;

import com.lowagie.text.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.company.naspolke.model.documentDrafts.FontStyleGenerator.setFontStyle;

@Component
class ProtocolFactory {

    private final Font headerFont = setFontStyle(FontStyles.PROTOCOL_HEADER);
    private final Font regularTextFont = setFontStyle(FontStyles.PROTOCOL_PLANE_TEXT);
    private final Font resolutionHeaderFont = setFontStyle(FontStyles.PROTOCOL_RESOLUTION_HEADER);
    private final Font planeTextBoldFont = setFontStyle(FontStyles.PROTOCOL_TEXT_BOLD);
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

}
