import {Person} from "./Person";

export class BoardMember{
    firstName = " ";
    secondName = " ";
    lastNameI = " ";
    lastNameII = " ";
    gender = "m";
    function = "Członek Zarządu";

    constructor(memberData) {
        if (memberData) {
            this.firstName = memberData.firstName;
            this.secondName = memberData.secondName;
            this.lastNameI = memberData.lastNameI;
            this.lastNameII = memberData.lastNameII;
            this.function = memberData.function;
            this.gender = memberData.hasOwnProperty("gender")? memberData.gender : "m";
        }
    }
}