export class ResolutionAgenda {
    resolutionTitle;
    votingType;
    unanimously;
    votesFor;
    votesAgainst;
    votesAbstentions;

    constructor(data, votingType, resolutionTitle, key) {
        this.resolutionTitle = resolutionTitle;
        this.votingType = votingType;
        this.unanimously = data.agendaUnanimously;
        if(this.unanimously===false){
            this.votesFor = data[`${key}VotingFor`];
            this.votesAgainst = data[`${key}VotingAgainst`];
            this.votesAbstentions = data[`${key}VotingAbstentions`];
        }
    }
}
