import {Person} from "./Person";

export class PartnerPerson extends Person{
    sharesCount;
    sharesValue;
    constructor(partnerData) {
        super(partnerData);
        const shareInfo = partnerData.posiadaneUdzialy.split("UDZIAŁÓW O ŁĄCZNEJ WARTOŚCI ");
        this.sharesCount =  shareInfo[0];
        this.sharesValue =  shareInfo[1];
    }
}

export class PartnerCompany {
    Name;
    sharesCount;
    sharesValue;
    constructor(partnerData) {
        this.Name = partnerData.nazwa;
        const shareInfo = partnerData.posiadaneUdzialy.split("UDZIAŁÓW O ŁĄCZNEJ WARTOŚCI ");
        this.sharesCount =  shareInfo[0];
        this.sharesValue =  shareInfo[1];
    }
}