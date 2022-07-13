package com.company.naspolke.model.documentDrafts;

import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.pdf.BaseFont;
import org.springframework.stereotype.Component;

@Component
class FontStyleGenerator {

    static Font setFontStyle(FontStyles fontStyles) {
        FontFactory.register("src/main/resources/drafts/fonts/natoSans/"+fontStyles.getFontType());
        Font font = FontFactory.getFont(fontStyles.getFontType(), BaseFont.IDENTITY_H);
        switch (fontStyles){
            case PROTOCOL_HEADER -> {
                font.setSize(17);
//                font.isBold();
            }
            case PROTOCOL_PLANE_TEXT, PROTOCOL_RESOLUTION_TEXT -> font.setSize(14);
            case PROTOCOL_RESOLUTION_HEADER -> {
                font.setSize(15);
                font.isBold();
            }
        }
        return font;
    }

}
