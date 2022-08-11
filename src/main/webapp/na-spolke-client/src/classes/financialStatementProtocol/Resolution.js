export class Resolution {
    votingType;
    unanimously;
    votesFor;
    votesAgainst;
    votesAbstentions;
    resolutionTitle;

    constructor(data, votingType, resolutionTitle, key, id="") {
        this.resolutionTitle = resolutionTitle;
        this.votingType = votingType;
        this.unanimously = data[`${key}${id}Unanimously`];
        if(this.unanimously===false){
            this.votesFor = data[`${key}${id}VotingFor`];
            this.votesAgainst = data[`${key}${id}VotingAgainst`];
            this.votesAbstentions = data[`${key}${id}VotingAbstentions`];
        }
    }
}