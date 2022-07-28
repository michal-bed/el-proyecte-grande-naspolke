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
        this.unanimously = data[`${key}Unanimously${id}`];
        if(this.unanimously===false){
            this.votesFor = data[`${key}VotingFor`];
            this.votesAgainst = data[`${key}${id}VotingAgainst`];
            this.votesAbstentions = data[`${key}${id}VotingAbstentions`];
        }
    }
}