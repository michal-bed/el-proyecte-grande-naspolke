
export function SetupInitialFormValues(company) {

    let individualPartners = [];
    let partnerCompanies = [];
    let initialValues = {
        protocolNumber: 1,
        meetingDate: new Date(),
        meetingPlaceInHeadquarters: "true",
        meetingPlace: "",
        streetName: "",
        streetNumber: "",
        localNumber: "",
        city: "",
        zipCode: "",
        formalConvening: false,
        chairperson: "",
        chairpersonUnanimously: true,
        recorder: "",
        recorderUnanimously : true,
        amountProfitOrLoss: 0,
        agendaUnanimously: true,
        beginningReportingPeriodNo1: new Date(`${new Date().getFullYear()-1}-01-01`),
        endReportingPeriodNo1: new Date(`${new Date().getFullYear()-1}-12-31`),
        amountProfitOrLossUnanimously: true,
        sumOfAssetsAndLiabilities: 0,
        financialStatementUnanimously: true,
    };
    if (company.partners.individualPartners !== null && individualPartners.length === 0) {
        for (let i = 0; i < company.partners.individualPartners.length; i++) {
            individualPartners.push({"id": company.partners.individualPartners[i].id, isPresent: true})
            initialValues[`individual${individualPartners[i].id}IsPresent`] = true;
            if (initialValues.chairperson === ""){
                initialValues.chairperson = `${company.partners.individualPartners[i].firstName} ${company.partners.individualPartners[i].lastNameI}`
                initialValues.recorder = `${company.partners.individualPartners[i].firstName} ${company.partners.individualPartners[i].lastNameI}`
            }
        }
    }
    if (company.partners.partnerCompanies !== null && partnerCompanies.length === 0) {
        for (let i = 0; i < company.partners.partnerCompanies.length; i++) {
            partnerCompanies.push({"id": company.partners.partnerCompanies[i].id, isPresent: true})
            initialValues[`company${partnerCompanies[i].id}IsPresent`] = true;
            initialValues[`representative${partnerCompanies[i].id}name`] = company.partners.partnerCompanies.representativeFirstname;
            initialValues[`representative${partnerCompanies[i].id}lastname`] = company.partners.partnerCompanies.representativeFirstname;
            if (initialValues.chairperson === ""){
                initialValues.chairperson = `${company.partners.partnerCompanies.representativeFirstname} ${company.partners.partnerCompanies.representativeFirstname}`
                initialValues.recorder = `${company.partners.partnerCompanies.representativeFirstname} ${company.partners.partnerCompanies.representativeFirstname}`
            }
        }
    }

    if (company.boardMembers.length > 0){
        for (let i = 0; i < company.boardMembers.length; i++) {
            initialValues[`board${company.boardMembers[i].boardMemberId}WholeReportingPeriod`] = true;
            initialValues[`board${company.boardMembers[i].boardMemberId}Unanimously`] = true;
        }
    }
    if (company.boardOfDirectors.length > 0){
        for (let i = 0; i < company.boardOfDirectors.length; i++) {
            initialValues[`director${company.boardOfDirectors[i].boardOfDirectorId}WholeReportingPeriod`] = true;
            initialValues[`director${company.boardOfDirectors[i].boardOfDirectorId}Unanimously`] = true;
        }
    }
    return {initialValues, individualPartners, partnerCompanies}
}