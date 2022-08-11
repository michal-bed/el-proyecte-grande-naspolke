package com.company.naspolke.model.company.financialStatements.resolutions;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigInteger;
import java.time.LocalDate;

@Entity
@Table(name = "financial_statement_resolution")
@NoArgsConstructor
@Getter
@Setter
public class FinancialStatementResolution implements VotingInterface {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    private String votingType;
    private String resolutionTitle;
    private boolean unanimously;
    private int votesFor;
    private int votesAgainst;
    private int votesAbstentions;
    private LocalDate beginningReportingPeriod;
    private LocalDate endReportingPeriod;
    private BigInteger sumOfAssetsAndLiabilities;

    @Builder
    public FinancialStatementResolution(String votingType, String resolutionTitle, boolean unanimously, int votesFor, int votesAgainst, int votesAbstentions, LocalDate beginningReportingPeriod, LocalDate endReportingPeriod, BigInteger sumOfAssetsAndLiabilities) {
        this.votingType = votingType;
        this.resolutionTitle = resolutionTitle;
        this.unanimously = unanimously;
        this.votesFor = votesFor;
        this.votesAgainst = votesAgainst;
        this.votesAbstentions = votesAbstentions;
        this.beginningReportingPeriod = beginningReportingPeriod;
        this.endReportingPeriod = endReportingPeriod;
        this.sumOfAssetsAndLiabilities = sumOfAssetsAndLiabilities;
    }
}