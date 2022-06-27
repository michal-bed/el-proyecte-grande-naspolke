import {Address} from "./Address";
import {populateList} from "./Utils";
import {Partners} from "../persons/Partners";

export class Company {
    companyName = null;
    krsNumber = null;
    address = new Address(null);
    nip = null;
    regon = null;
    shareCapital = 5000;
    sharesCount = null;
    shareValue = 50;
    boardMembers = null;
    boardOfDirectors = null;
    partners = new Partners(null);
    manySharesAllowed = null;

    constructor(companyData) {
        if (companyData) {
            this.companyName = companyData.companyName.includes("SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ") ? companyData.companyName.split("SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ")[0] + " sp. z o.o." : companyData.companyName;
            this.krsNumber = companyData.krsNumber;
            this.nip = companyData.nip;
            this.regon = companyData.regon.slice(0, 9);
            this.shareCapital = companyData.shareCapital;
            this.shareValue = companyData.shareValue;
            this.address = new Address(companyData.address);
            this.boardMembers = populateList(companyData.boardMembers, "boardMembers")
            this.boardOfDirectors = populateList(companyData.boardOfDirectors, "boardOfDirectors")
            this.partners = new Partners(companyData.partners)
            this.sharesCount = companyData.sharesCount;
            this.manySharesAllowed = companyData.manySharesAllowed
        }
    }
}