
export class FinancialStatementProtocol{

    dateOfTheShareholdersMeeting;
    protocolNumber;

    constructor(data) {
        this.dateOfTheShareholdersMeeting = data.meetingDate;
        this.protocolNumber = data.protocolNumber;
    }

}