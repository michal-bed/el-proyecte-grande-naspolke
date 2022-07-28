export class Resolution {
    votingType;
    unanimously;
    votesFor;
    votesAgainst;
    votesAbstentions;
    resolutionTitle;

    constructor(data, votingType, resolutionTitle, key) {
        this.resolutionTitle = resolutionTitle;
        this.votingType = votingType;
        this.unanimously = data[`${key}Unanimously`];
        if(this.unanimously===false){
            this.votesFor = data[`${key}VotingFor`];
            this.votesAgainst = data[`${key}VotingAgainst`];
            this.votesAbstentions = data[`${key}VotingAbstentions`];
        }
    }
}