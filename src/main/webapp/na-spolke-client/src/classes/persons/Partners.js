import {populateList} from "../company/Utils";

export class Partners {
    individualPartners = null;
    partnerCompanies = null;
    allSharesValue = null;
    allSharesCount = null;

    constructor(partnerData) {
        if (partnerData) {
            this.individualPartners = partnerData.individualPartners && populateList(partnerData.individualPartners, "individuals");
            this.partnerCompanies = partnerData.partnerCompanies && populateList(partnerData.partnerCompanies, "companies");
            this.allSharesValue = partnerData.allSharesValue;
            this.allSharesCount = partnerData.sharesCount;
        }
    }
}

export class IndividualPartner{
    firstName = null;
    secondName = null;
    lastNameI = null;
    lastNameII = null;
    sharesCount = null;
    sharesValue = null;

    constructor(partnerData) {
        if (partnerData) {
            this.firstName = partnerData.firstName;
            this.secondName = partnerData.secondName;
            this.lastNameI = partnerData.lastNameI;
            this.lastNameII = partnerData.lastNameII;
            this.sharesCount = partnerData.sharesCount;
            this.sharesValue = partnerData.sharesValue;
        }
    }
}

export class PartnerCompany {
    name = null;
    sharesCount = null;
    sharesValue = null;
    representativeFirstname = null;
    representativeLastname = null;


    constructor(partnerData) {
        if (partnerData) {
            this.name = partnerData.name;
            this.sharesCount = partnerData.sharesCount;
            this.sharesValue = partnerData.sharesValue;
            this.representativeFirstname = partnerData.representativeFirstname;
            this.representativeLastname = partnerData.representativeLastname;
        }
    }
}