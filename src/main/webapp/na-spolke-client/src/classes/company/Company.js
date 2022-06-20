import {Address} from "./Address";
import {populateList} from "./Utils";
import {Partners} from "../persons/Partners";

export class Company {
    companyName;
    krsNumber;
    address;
    nip;
    regon;
    shareCapital;
    sharesCount;
    shareValue;
    boardMembers;
    boardOfDirectors;
    partners;
    manySharesAllowed;

    constructor(companyData) {
        this.companyName = companyData.companyName.includes("SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ")? companyData.companyName.split("SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ")[0] + " sp. z o.o." : companyData.companyName;
        this.krsNumber = companyData.krsNumber;
        this.nip = companyData.nip;
        this.regon = companyData.regon;
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