package com.company.naspolke.model.company.financialStatements.resolutions;

import com.company.naspolke.model.company.companyBodies.Partners.JuridicalPerson;
import com.company.naspolke.model.company.companyBodies.Partners.NaturalPerson;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class ElectionResolution implements VotingInterface {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.REFRESH})
    private NaturalPerson individual;
    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.REFRESH})
    private JuridicalPerson company;
    private String votingType;
    private String resolutionTitle;
    private String meetingFunction;
    private boolean unanimously;
    private int votesFor;
    private int votesAgainst;
    private int votesAbstentions;

    @Builder
    public ElectionResolution(Long id, String votingType, String resolutionTitle, String meetingFunction,
                             boolean unanimously, int votesFor, int votesAgainst, int votesAbstentions,
                              NaturalPerson individual, JuridicalPerson company) {
        this.votingType = votingType;
        this.resolutionTitle = resolutionTitle;
        this.meetingFunction = meetingFunction;
        this.unanimously = unanimously;
        this.votesFor = votesFor;
        this.votesAgainst = votesAgainst;
        this.votesAbstentions = votesAbstentions;
        this.individual = individual;
        this.company = company;
    }
}
