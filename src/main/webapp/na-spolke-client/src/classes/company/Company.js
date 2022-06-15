import {Address} from "./Address";
import {populateList} from "./Utils";
import {BoardMember} from "../persons/BoardMember";
import {BoardOfDirector} from "../persons/BoardOfDirector";
import {PartnerCompany, PartnerPerson, Partners} from "../persons/Partners";

export class Company {
    Name;
    KRSNumber;
    Address;
    NIP;
    REGON;
    ShareCapital;
    BoardMembers;
    BoardOfDirectors;
    Partners;

    constructor(companyData) {
        this.Name = companyData.name.split("SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ")[0] + " sp. z o.o.";
        this.KRSNumber = companyData.krsNumber;
        this.NIP = companyData.nip;
        this.REGON = companyData.regon;
        this.ShareCapital = companyData.shareCapital;
        this.Address = new Address(companyData.address);
        this.BoardMembers = populateList(companyData.boardMembers, "boardMembers")
        this.BoardOfDirectors = populateList(companyData.boardOfDirectors, "boardOfDirectors")
        this.Partners = new Partners(companyData.partners)

    }
}