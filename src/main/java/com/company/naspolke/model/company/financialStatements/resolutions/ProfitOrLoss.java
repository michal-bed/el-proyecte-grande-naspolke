package com.company.naspolke.model.company.financialStatements.resolutions;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigInteger;

@Entity
@Table(name = "profit_or_loss")
@NoArgsConstructor
@Getter
@Setter
public class ProfitOrLoss implements VotingInterface{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    private String votingType;
    private String resolutionTitle;
    private boolean unanimously;
    private int votesFor;
    private int votesAgainst;
    private int votesAbstentions;
    private BigInteger profitOrLossValue;
    private String coverageOfLossOrProfitAllocation;
    private String coverageOfLossOrProfitAllocationDifferentWay;

    @Builder
    public ProfitOrLoss(String votingType, String resolutionTitle, boolean unanimously, int votesFor, int votesAgainst, int votesAbstentions, BigInteger profitOrLossValue, String coverageOfLossOrProfitAllocation, String coverageOfLossOrProfitAllocationDifferentWay) {
        this.votingType = votingType;
        this.resolutionTitle = resolutionTitle;
        this.unanimously = unanimously;
        this.votesFor = votesFor;
        this.votesAgainst = votesAgainst;
        this.votesAbstentions = votesAbstentions;
        this.profitOrLossValue = profitOrLossValue;
        this.coverageOfLossOrProfitAllocation = coverageOfLossOrProfitAllocation;
        this.coverageOfLossOrProfitAllocationDifferentWay = coverageOfLossOrProfitAllocationDifferentWay;
    }
}