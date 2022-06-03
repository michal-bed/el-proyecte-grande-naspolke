import {Person} from "./Person";

export class BoardMember extends Person{
    MemberFunction;
    constructor(memberData) {
        super(memberData);
        this.MemberFunction = memberData.funkcjaWOrganie;
    }
}