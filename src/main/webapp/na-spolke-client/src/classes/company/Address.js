
export class Address{
    StreetName;
    StreetNumber;
    LocalNumber;
    City;
    ZipCode;
    PostOffice;
    constructor(addressData) {
        this.StreetName = addressData.ulica;
        this.StreetNumber = addressData.nrDomu;
        this.LocalNumber = addressData.nrLokalu
            ? addressData.nrLokalu
            : null;
        this.City = addressData.miejscowosc;
        this.ZipCode = addressData.kodPocztowy;
        this.PostOffice = addressData.poczta;
    }
}