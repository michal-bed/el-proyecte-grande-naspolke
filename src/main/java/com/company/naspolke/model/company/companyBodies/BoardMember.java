package com.company.naspolke.model.company.companyBodies;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class BoardMember {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String firstName;
    private String secondName;
    private String lastNameI;
    private String lastNameII;
    private String function;
    private LocalDate appointmentDate;


    public BoardMember(String firstName, String secondName, String lastNameI, String lastNameII, String function, LocalDate appointmentDate) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.lastNameI = lastNameI;
        this.lastNameII = lastNameII;
        this.function = function;
        this.appointmentDate = appointmentDate;
    }
}
