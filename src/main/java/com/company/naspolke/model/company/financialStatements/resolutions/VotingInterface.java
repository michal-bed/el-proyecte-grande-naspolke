package com.company.naspolke.model.company.financialStatements.resolutions;

public interface VotingInterface {

    boolean isUnanimously();
    int getVotesFor();
    int getVotesAgainst();
    int getVotesAbstentions();
}
