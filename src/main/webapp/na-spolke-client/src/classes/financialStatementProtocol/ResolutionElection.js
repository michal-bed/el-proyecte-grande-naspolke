import {Resolution} from "./Resolution";

export class ResolutionElection extends Resolution{
    firstName;
    lastName;
    meetingFunction;
    constructor(data, meetingFunction,resolutionTitle, votingType) {
        super(data, votingType, resolutionTitle, meetingFunction)
        const nameAndSurname = data[`${meetingFunction}`].split(" ");
        this.firstName = nameAndSurname[0];
        this.lastName = nameAndSurname[1];
        this.meetingFunction = meetingFunction;
    }
}