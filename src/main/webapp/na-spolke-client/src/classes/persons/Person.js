
export class Person{
    id = " ";
    firstName = " ";
    secondName = " ";
    lastNameI = " ";
    lastNameII = " ";
    gender = "m";
    constructor(personData) {
        if (personData) {
            this.firstName = personData.firstName;
            this.secondName = personData.secondName;
            this.lastNameI = personData.lastNameI;
            this.lastNameII = personData.lastNameII;
            this.gender = personData.hasOwnProperty("gender")? personData.gender : "m";
            this.id = personData.hasOwnProperty("id")? personData.id : null;

        }
    }
}