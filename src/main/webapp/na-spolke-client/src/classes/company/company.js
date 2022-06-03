import {Address} from "./Address";
import {BoardMember} from "../persons/BoardMember";
import {BoardOfDirector} from "../persons/BoardOfDirector";
import {PartnerCompany, PartnerPerson} from "../persons/Partner";

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
        this.Name = companyData.data.odpis.dane.dzial1.danePodmiotu.nazwa.split("SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ")[0] + " sp. z o.o.";
        this.KRSNumber = companyData.data.odpis.naglowekA.numerKRS;
        this.NIP = companyData.data.odpis.dane.dzial1.danePodmiotu.identyfikatory.nip;
        this.REGON = companyData.data.odpis.dane.dzial1.danePodmiotu.identyfikatory.regon;
        this.ShareCapital = companyData.data.odpis.dane.dzial1.kapital.wysokoscKapitaluZakladowego.wartosc;
        this.Address = new Address(companyData.data.odpis.dane.dzial1.siedzibaIAdres.adres);
        this.BoardMembers = this.#populateList(companyData.data.odpis.dane.dzial2.reprezentacja.sklad, "BoardMembers")
        this.BoardOfDirectors = this.#populateBoardOfDirectors(companyData.data.odpis.dane.dzial2.organNadzoru)
        this.Partners = this.#populateList(companyData.data.odpis.dane.dzial1.wspolnicySpzoo, "Partner")

    }

    #populateList = (members, type) => {
        const result = [];
        members.forEach(member => {
            switch (type) {
                case "BoardMembers":
                    result.push(new BoardMember(member));
                    break
                case "Partner":
                    result.push(member.nazwa
                        ? new PartnerCompany(member)
                        : new PartnerPerson(member));
                    break
            }

        })
        return result;
    }

    #populateBoardOfDirectors(members) {
        const result = [];
        if (members) {
            members[0].sklad.forEach(member => {
                result.push(new BoardOfDirector(member));
            })
        }
        return result;
    }
}