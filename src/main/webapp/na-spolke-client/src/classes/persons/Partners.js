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
    id = null;
    firstName = null;
    secondName = null;
    lastNameI = null;
    lastNameII = null;
    sharesCount = null;
    sharesValue = null;
    gender = "m";

    constructor(partnerData) {
        console.log(partnerData);
        if (partnerData) {
            this.firstName = partnerData.firstName;
            this.secondName = partnerData.secondName;
            this.lastNameI = partnerData.lastNameI;
            this.lastNameII = partnerData.lastNameII;
            this.sharesCount = partnerData.sharesCount;
            this.sharesValue = partnerData.sharesValue;
            this.gender = partnerData.hasOwnProperty("gender") && partnerData.gender!=="\u0000"? partnerData.gender : "m";
            this.id = partnerData.hasOwnProperty("id") && partnerData.id!=="\u0000"? partnerData.id : null;
        }
    }
}

export class PartnerCompany {
    id = null;
    name = null;
    sharesCount = null;
    sharesValue = null;
    representativeFirstname = null;
    representativeLastname = null;
    representativeGender = null;


    constructor(partnerData) {
        if (partnerData) {
            this.name = partnerData.name;
            this.sharesCount = partnerData.sharesCount;
            this.sharesValue = partnerData.sharesValue;
            this.representativeFirstname = partnerData.representativeFirstname;
            this.representativeLastname = partnerData.representativeLastname;
            this.representativeGender = partnerData.hasOwnProperty("representativeGender") && partnerData.representativeGender!=="\u0000"?partnerData.representativeGender : "m";
            this.id = partnerData.hasOwnProperty("id") && partnerData.id!=="\u0000" ?partnerData.id : null;
        }
    }
}