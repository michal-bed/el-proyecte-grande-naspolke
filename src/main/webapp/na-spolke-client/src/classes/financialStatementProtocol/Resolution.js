
export class Resolution {

    firstName;
    lastName;
    meetingFunction;
    votingType;
    unanimously;
    votesFor;
    votesAgainst;
    votesAbstentions;

    constructor(data, meetingFunction, votingType) {
        const nameAndSurname = data[`${meetingFunction}`].split(" ");
        this.firstname = nameAndSurname[0];
        this.lastName = nameAndSurname[1];
        this.meetingFunction = meetingFunction;
        this.votingType = votingType;
        this.unanimously = data[`${meetingFunction}Unanimously`]
        if(this.unanimously===false){
            this.votesFor = data[`${meetingFunction}VotingFor`];
            this.votesAgainst = data[`${meetingFunction}VotingAgainst`];
            this.votesAbstentions = data[`${meetingFunction}VotingAbstentions`];
        }
    }
}