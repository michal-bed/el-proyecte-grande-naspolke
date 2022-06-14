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
public class BoardOfDirector {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long boardOfDirectorId;
    private String firstName;
    private String secondName;
    private String lastNameI;
    private String lastNameII;

    @Builder
    public BoardOfDirector(String firstName, String secondName, String lastNameI, String lastNameII) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.lastNameI = lastNameI;
        this.lastNameII = lastNameII;
    }
}
