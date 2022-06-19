import {Person} from "./Person";
import {BoardMember} from "./BoardMember";
import {BoardOfDirector} from "./BoardOfDirector";
import {populateList} from "../company/Utils";

export class Partners {
    individualPartners;
    partnerCompanies;
    allSharesValue;
    allSharesCount;

    constructor(partnerData) {
        this.individualPartners = populateList(partnerData.individualPartners, "individuals");
        this.partnerCompanies = populateList(partnerData.partnerCompanies, "companies");
        this.allSharesValue = partnerData.allSharesValue;
        this.allSharesCount = partnerData.sharesCount;
    }
}

export class IndividualPartner{
    firstName;
    secondName;
    lastNameI;
    lastNameII;
    sharesCount;
    sharesValue;

    constructor(partnerData) {
        this.firstName = partnerData.firstName;
        this.secondName = partnerData.secondName;
        this.lastNameI = partnerData.lastNameI;
        this.lastNameII = partnerData.lastNameII;
        this.sharesCount = partnerData.sharesCount;
        this.sharesValue = partnerData.sharesValue;
    }
}

export class PartnerCompany {
    name;
    sharesCount;
    sharesValue;

    constructor(partnerData) {
        this.name = partnerData.name;
        this.sharesCount = partnerData.sharesCount;
        this.sharesValue =  partnerData.sharesValue;
    }
}