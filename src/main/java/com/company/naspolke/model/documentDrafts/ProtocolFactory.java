package com.company.naspolke.model.documentDrafts;

import com.lowagie.text.Chunk;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.Paragraph;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

import static com.company.naspolke.model.documentDrafts.FontStyleGenerator.setFontStyle;

@Component
class ProtocolFactory {

    Font headerFont = setFontStyle(FontStyles.PROTOCOL_HEADER);
    Font regularTextFont = setFontStyle(FontStyles.PROTOCOL_PLANE_TEXT);
    Font resolutionHeaderFont = setFontStyle(FontStyles.PROTOCOL_RESOLUTION_HEADER);
    Font planeTextBoldFont = setFontStyle(FontStyles.PROTOCOL_RESOLUTION_TEXT_BOLD);
    Font resolutionTextFont = setFontStyle(FontStyles.PROTOCOL_RESOLUTION_TEXT);

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
        //        resolutionParagraph.addAll(List.of(resolutionTitleParagraph, resolutionTextParagraph, resolutionVotingParagraph));
        return List.of(resolutionTitleParagraph, resolutionTextParagraph, resolutionVotingParagraph);
    }

    public Chunk getBoldChunkOfText(String text){
        return new Chunk(text, planeTextBoldFont);
    }
    public Chunk getRegularChunkOfText(String text){
        return new Chunk(text, regularTextFont);
    }

    public Paragraph getParagraphFromChunks(Chunk... chunks){
        Paragraph paragraph = new Paragraph();
        paragraph.addAll(Arrays.asList(chunks));
        return paragraph;
    }


    private Paragraph getResolutionVotingParagraph(String resolutionText) {
        Paragraph resolutionVotingParagraph = new Paragraph(resolutionText, regularTextFont);
        resolutionVotingParagraph.setMultipliedLeading(1.5f);
        resolutionVotingParagraph.setAlignment(Element.ALIGN_JUSTIFIED);
        resolutionVotingParagraph.setSpacingAfter(10);
        return resolutionVotingParagraph;
    }

    private Paragraph getResolutionTextParagraph(String resolutionText) {
        Paragraph resolutionTextParagraph = new Paragraph(resolutionText, resolutionTextFont);
        resolutionTextParagraph.setSpacingAfter(10);
        resolutionTextParagraph.setAlignment(Element.ALIGN_JUSTIFIED);
        resolutionTextParagraph.setIndentationLeft(25);
        resolutionTextParagraph.setIndentationRight(25);
        resolutionTextParagraph.setMultipliedLeading(1.5f);
        return resolutionTextParagraph;
    }

    private Paragraph getResolutionTitleParagraph(String resolutionTitle) {
        Paragraph resolutionTitleParagraph = new Paragraph(resolutionTitle, resolutionHeaderFont);
        resolutionTitleParagraph.setAlignment(Element.ALIGN_CENTER);
        resolutionTitleParagraph.setSpacingAfter(10f);
        resolutionTitleParagraph.setMultipliedLeading(1.5f);
        return resolutionTitleParagraph;
    }

}
