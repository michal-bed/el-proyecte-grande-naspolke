import {Address} from "../company/Address";
import {Resolution} from "./Resolution";

export class FinancialStatementProtocol {

    dateOfTheShareholdersMeeting;
    protocolNumber;
    meetingPlaceInHeadquarters;
    meetingPlace;
    address;
    formalConvening;
    listIdPresentIndividualPartners = []; //Id wspólników
    listIdPresentsCompanyPartners = []; //Id wspólników
    president; //imię, nazwisko, jednomyslnie, głosy
    recorder; //imię, nazwisko, jednomyslnie, głosy
    absolutoriaBM; //[id, jednomyslnie, głosy, kadencja poczatek + koniec]
    absolutoriaBoD; //[id, jednomyslnie, głosy, kadencja poczatek + koniec]


    constructor(data, company) {
        this.dateOfTheShareholdersMeeting = data.meetingDate;
        this.protocolNumber = data.protocolNumber;
        this.meetingPlaceInHeadquarters = data.meetingPlaceInHeadquarters;
        this.meetingPlace = data.meetingPlace;
        this.address = new Address({
            streetName: data.streetName,
            streetNumber: data.streetNumber,
            localNumber: data.localNumber,
            city: data.city,
            zipCode: data.zipCode
        })
        this.formalConvening = data.formalConvening;
        this.listIdPresentIndividualPartners = this.setPresentPartners(data, company.partners.individualPartners, "individualPartner")
        this.listIdPresentsCompanyPartners = this.setPresentPartners(data, company.partners.partnerCompanies, "partnerCompany")
        this.president = new Resolution(data, "president", "secret")
        this.recorder = new Resolution(data, "recorder", "secret")
    }

    setPresentPartners(data, partner, listType) {
        let partnersPresent = [];
        if (partner.length > 0) {
            for (let i = 0; i < partner.length; i++) {
                if (data[`${listType}${partner[i].id}IsPresent`] === true) {
                    partnersPresent.push(partner[i].id)
                }
            }
            return partnersPresent;
        }
    }
}