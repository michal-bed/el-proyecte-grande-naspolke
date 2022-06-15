package com.company.naspolke.model.types;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public enum RoleType {

    OWNER(1),
    EDITOR(2),
    READER(3);

    private int roleType;
}
