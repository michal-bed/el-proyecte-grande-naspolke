import {Address} from "./Address";

export class FinancialStatementProtocol{

    dateOfTheShareholdersMeeting;
    protocolNumber;
    meetingPlaceInHeadquarters;
    meetingPlace;
    address;

    constructor(data) {
        this.dateOfTheShareholdersMeeting = data.meetingDate;
        this.protocolNumber = data.protocolNumber;
        this.meetingPlaceInHeadquarters = data.meetingPlaceInHeadquarters;
        this.meetingPlace = data.meetingPlace;
        this.address = new Address({streetName:data.streetName,
                streetNumber:data.streetNumber,
                localNumber: data.localNumber,
                city:data.city,
                zipCode:data.zipCode
            })
    }

}