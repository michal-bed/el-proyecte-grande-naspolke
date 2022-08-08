import {Address} from "../company/Address";
import {ResolutionElection} from "./ResolutionElection";
import {ResolutionAgenda} from "./ResolutionAgenda";
import {ResolutionProfitLoss} from "./ResolutionProfitOrLoss";
import {ResolutionFinancialStatement} from "./ResolutionFinancialStatement";
import {ResolutionApprovalBodyMember} from "./ResolutionApprovalBodyMember";

export class FinancialStatementProtocol {

    dateOfTheShareholdersMeeting;
    protocolNumber;
    meetingPlaceInHeadquarters;
    meetingPlace;
    address;
    formalConvening;
    listPresentIndividualPartners = [];
    listPresentsCompanyPartners = [];
    chairperson;
    recorder;
    agenda;
    profitOrLoss;
    financialStatementResolution;
    boardMembersApproval;
    directorsMembersApproval;

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
        this.listPresentIndividualPartners = this.setPresentPartners(data, company.partners.individualPartners, "individual");
        this.listPresentsCompanyPartners = this.setPresentPartners(data, company.partners.partnerCompanies, "company");
        this.chairperson = new ResolutionElection(data, "chairperson","wyboru Przewodniczącego Zgromadzenia", "secret");
        this.recorder = new ResolutionElection(data, "recorder", "wyboru Protokolanta", "secret");
        this.agenda = new ResolutionAgenda(data, "public", "agenda", "agenda");
        this.profitOrLoss = new ResolutionProfitLoss(data, "public", "ProfitLoss", "amountProfitOrLoss");
        this.financialStatementResolution = new ResolutionFinancialStatement(data, "public", "financial statement", "financialStatement");
        this.boardMembersApproval = this.ApprovalResolutions(data, company.boardMembers, "board");
        this.directorsMembersApproval = this.ApprovalResolutions(data, company.boardOfDirectors, "director");
    }

    setPresentPartners(data, partner, listType) {
        let partnersPresent = [];
        if (partner.length > 0) {
            for (let i = 0; i < partner.length; i++) {
                if (data[`${listType}${partner[i].id}IsPresent`] === true) {
                    partnersPresent.push(partner[i])
                }
            }
            return partnersPresent;
        }
    }

    ApprovalResolutions(data, bodyMemberList, bodyType) {
        let resolutions = [];
        for (let i = 0; i < bodyMemberList.length; i++) {
            const resolution = new ResolutionApprovalBodyMember(data, "secret",
                "board approval", bodyType, bodyMemberList[i])
            resolutions.push(resolution);
        }
        return resolutions;
    }
}