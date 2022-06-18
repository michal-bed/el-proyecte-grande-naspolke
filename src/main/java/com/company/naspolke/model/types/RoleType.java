package com.company.naspolke.model.types;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public enum RoleType {

    OWNER("OWNER"),
    EDITOR("EDITOR"),
    READER("READER");

    private String roleType;
}
