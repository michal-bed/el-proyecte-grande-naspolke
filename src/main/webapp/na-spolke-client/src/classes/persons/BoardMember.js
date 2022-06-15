import {Person} from "./Person";

export class BoardMember{
    firstName;
    secondName;
    lastNameI;
    lastNameII;
    function;
    constructor(memberData) {
        this.firstName = memberData.firstName;
        this.secondName = memberData.secondName;
        this.lastNameI = memberData.lastNameI;
        this.lastNameII = memberData.lastNameII;
        this.function = memberData.function;
    }
}