package com.company.naspolke.model.company.bodyOrgans;

import org.springframework.stereotype.Component;

public enum BoardMemberFunction {
    President ("Prezes"),
    VicePresident ("Wiceprezes"),
    BoardMember ("Członek Zarządu");

    BoardMemberFunction(String position) {
    }

}
