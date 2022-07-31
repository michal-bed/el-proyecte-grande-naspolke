package com.company.naspolke.model.company.financialStatements.resolutions;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class ElectionResolution {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String votingType;
    private String resolutionTitle;
    private String firstName;
    private String meetingFunction;
    private String lastName;
    private boolean unanimously;
    private int votesFor;
    private int votesAgainst;
    private int votesAbstentions;

    @Builder
    public ElectionResolution(Long id, String votingType, String resolutionTitle, String firstName, String meetingFunction, String lastName, boolean unanimously, int votesFor, int votesAgainst, int votesAbstentions) {
        this.votingType = votingType;
        this.resolutionTitle = resolutionTitle;
        this.firstName = firstName;
        this.meetingFunction = meetingFunction;
        this.lastName = lastName;
        this.unanimously = unanimously;
        this.votesFor = votesFor;
        this.votesAgainst = votesAgainst;
        this.votesAbstentions = votesAbstentions;
    }
}
