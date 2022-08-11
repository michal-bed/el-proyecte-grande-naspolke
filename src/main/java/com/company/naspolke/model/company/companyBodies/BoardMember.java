package com.company.naspolke.model.company.companyBodies;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
@NoArgsConstructor
public class BoardMember {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long boardMemberId;
    private String firstName;
    private String secondName;
    private String lastNameI;
    private String lastNameII;
    private String function;

    @Builder
    public BoardMember(String firstName, String secondName, String lastNameI, String lastNameII, String function) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.lastNameI = lastNameI;
        this.lastNameII = lastNameII;
        this.function = function;
    }
}
