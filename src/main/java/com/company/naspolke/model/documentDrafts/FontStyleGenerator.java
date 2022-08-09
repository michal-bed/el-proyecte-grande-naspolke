package com.company.naspolke.model.documentDrafts;

import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.pdf.BaseFont;
import org.springframework.stereotype.Component;

@Component
class FontStyleGenerator {

    static Font setFontStyle(FontStyles fontStyles) {
        if(!FontFactory.isRegistered(fontStyles.getFontType())) {
            FontFactory.registerDirectory("src/main/resources/drafts/fonts/natoSans/");
        }
        Font font = FontFactory.getFont(fontStyles.getFontType(), BaseFont.IDENTITY_H);

        switch (fontStyles){
            case PROTOCOL_HEADER -> font.setSize(15);
            case PROTOCOL_PLANE_TEXT, PROTOCOL_RESOLUTION_TEXT, PROTOCOL_TEXT_BOLD, PROTOCOL_RESOLUTION_TEXT_BOLD -> font.setSize(12);
            case PROTOCOL_RESOLUTION_HEADER -> font.setSize(13);
        }
        return font;
    }
}
