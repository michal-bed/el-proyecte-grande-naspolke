import {Address} from "./Address";
import {populateList} from "./Utils";
import {BoardMember} from "../persons/BoardMember";
import {BoardOfDirector} from "../persons/BoardOfDirector";
import {PartnerCompany, PartnerPerson, Partners} from "../persons/Partners";

export class Company {
    name;
    krsNumber;
    address;
    nip;
    regon;
    shareCapital;
    boardMembers;
    boardOfDirectors;
    partners;

    constructor(companyData) {
        if (companyData) {
            this.name = companyData.name.split("SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ")[0] + " sp. z o.o.";
            this.krsNumber = companyData.krsNumber;
            this.nip = companyData.nip;
            this.regon = companyData.regon;
            this.shareCapital = companyData.shareCapital;
            this.address = new Address(companyData.address);
            this.boardMembers = populateList(companyData.boardMembers, "boardMembers")
            this.boardOfDirectors = populateList(companyData.boardOfDirectors, "boardOfDirectors")
            this.partners = new Partners(companyData.partners)
        } else {
            this.name = null;
            this.krsNumber = null;
            this.nip = null;
            this.regon = null;
            this.shareCapital = null;
            this.address = null;
            this.boardMembers = null;
            this.boardOfDirectors = null;
            this.partners = null;
        }
    }
}