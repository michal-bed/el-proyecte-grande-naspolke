package com.company.naspolke.model.company.companyBodies;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

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
    private String gender;
    private String function;

    @Builder
    public BoardMember(String firstName, String secondName, String lastNameI, String lastNameII, String function, String gender) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.lastNameI = lastNameI;
        this.lastNameII = lastNameII;
        this.function = function;
        this.gender = gender;
    }
}
