import {Resolution} from "./Resolution";
import {IndividualPartner, PartnerCompany} from "../persons/Partners";

export class ResolutionElection extends Resolution{
    individual;
    company;
    meetingFunction;
    constructor(data, meetingFunction,resolutionTitle, votingType) {
        super(data, votingType, resolutionTitle, meetingFunction)
        this.meetingFunction = meetingFunction;
        if(data[`${meetingFunction}`].charAt(0)==="i"){
            this.individual = new IndividualPartner(JSON.parse(data[`${meetingFunction}`].substring(1)));
        } else if (data[`${meetingFunction}`].charAt(0)==="c"){
            this.company = new PartnerCompany(JSON.parse(data[`${meetingFunction}`].substring(1)))
        }
    }
}