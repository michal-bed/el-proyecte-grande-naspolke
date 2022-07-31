package com.company.naspolke.model.company.financialStatements.resolutions;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "agenda_resolution")
@Getter
@Setter
@NoArgsConstructor
public class AgendaResolution {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    private String votingType;
    private String resolutionTitle;
    private String meetingFunction;
    private boolean unanimously;
    private int votesFor;
    private int votesAgainst;
    private int votesAbstentions;

    @Builder
    public AgendaResolution(String votingType, String resolutionTitle, String meetingFunction, boolean unanimously, int votesFor, int votesAgainst, int votesAbstentions) {
        this.votingType = votingType;
        this.resolutionTitle = resolutionTitle;
        this.meetingFunction = meetingFunction;
        this.unanimously = unanimously;
        this.votesFor = votesFor;
        this.votesAgainst = votesAgainst;
        this.votesAbstentions = votesAbstentions;
    }
}