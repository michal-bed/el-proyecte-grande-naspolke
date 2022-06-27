
export class Address{
    streetName = null;
    streetNumber = null;
    localNumber = null;
    city = null;
    zipCode = null;
    postOffice = null;
    constructor(addressData) {
        if (addressData) {
            this.streetName = addressData.streetName;
            this.streetNumber = addressData.streetNumber;
            this.localNumber = addressData.localNumber;
            this.city = addressData.city;
            this.zipCode = addressData.zipCode;
            this.postOffice = addressData.postOffice;
        }
    }
}