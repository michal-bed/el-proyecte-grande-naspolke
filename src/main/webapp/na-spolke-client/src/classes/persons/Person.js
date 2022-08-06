
export class Person{
    firstName = " ";
    secondName = " ";
    lastNameI = " ";
    lastNameII = " ";
    gender = "male";
    constructor(personData) {
        if (personData) {
            this.firstName = personData.firstName;
            this.secondName = personData.secondName;
            this.lastNameI = personData.lastNameI;
            this.lastNameII = personData.lastNameII;
            this.gender = personData.hasOwnProperty("gender")? personData.gender : "male";
        }
    }
}