
export class Person{
    firstName = " ";
    secondName = " ";
    lastNameI = " ";
    lastNameII = " ";
    constructor(personData) {
        if (personData) {
            this.firstName = personData.firstName;
            this.secondName = personData.secondName;
            this.lastNameI = personData.lastNameI;
            this.lastNameII = personData.lastNameII;
        }
    }
}