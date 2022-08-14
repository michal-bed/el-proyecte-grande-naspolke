import {Person} from "./Person";

export class BoardMember{
    id;
    firstName = " ";
    secondName = " ";
    lastNameI = " ";
    lastNameII = " ";
    gender = "m";
    function = "Członek Zarządu";

    constructor(memberData) {
        if (memberData) {
            if(memberData.hasOwnProperty("id") && memberData.id!=="\u0000"){
                this.id = memberData.id;
            }
            this.firstName = memberData.firstName;
            this.secondName = memberData.secondName;
            this.lastNameI = memberData.lastNameI;
            this.lastNameII = memberData.lastNameII;
            this.function = memberData.function;
            this.gender = memberData.hasOwnProperty("gender") && memberData.gender!=="\u0000"? memberData.gender : "m";
        }
    }
}