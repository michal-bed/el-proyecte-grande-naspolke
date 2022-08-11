package com.company.naspolke.model.documentDrafts;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public enum FontStyles {
    PROTOCOL_HEADER("NotoSans-Bold.ttf"),
    PROTOCOL_PLANE_TEXT("NotoSans-Regular.ttf"),
    PROTOCOL_RESOLUTION_HEADER("NotoSans-Bold.ttf"),
    PROTOCOL_RESOLUTION_TEXT("NotoSans-Italic.ttf"),
    PROTOCOL_TEXT_BOLD("NotoSans-Bold.ttf"),
    PROTOCOL_RESOLUTION_TEXT_BOLD("NotoSans-BoldItalic.ttf"),
    PROTOCOL_APPENDIX_INFO("NotoSans-Bold.ttf");

    private String fontType;
}
