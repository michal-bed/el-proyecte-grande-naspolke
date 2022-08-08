package com.company.naspolke.model.company.financialStatements.resolutions;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

//@Entity
@Getter
@Setter
@NoArgsConstructor

public class Voting {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private boolean unanimously;
    private int votingFor;
    private int votingAgainst;
    private int votingAbstentions;
}
