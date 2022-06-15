
export class Address{
    streetName;
    streetNumber;
    localNumber;
    city;
    zipCode;
    postOffice;
    constructor(addressData) {
        this.streetName = addressData.streetName;
        this.streetNumber = addressData.streetNumber;
        this.localNumber = addressData.localNumber;
        this.city = addressData.city;
        this.zipCode = addressData.zipCode;
        this.postOffice = addressData.postOffice;
    }
}