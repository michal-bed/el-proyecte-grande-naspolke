import {Resolution} from "./Resolution";

export class ResolutionApprovalBodyMember extends Resolution{
    bodyType;
    boardMember;
    director;
    wholeReportingPeriod;
    beginningOfReportingPeriod;
    endOfReportingPeriod;


    constructor(data,votingType, resolutionTitle, key, member) {
        super(data, votingType, resolutionTitle, key, member[key==="board" ? "boardMemberId" : "boardOfDirectorId"]);
        this.bodyType = key;
        if(this.bodyType==="board"){
            this.boardMember = member;
        } else {
            this.director = member;
        }
        this.wholeReportingPeriod = data[`${key}${member[key==="board" ? "boardMemberId" : "boardOfDirectorId"]}WholeReportingPeriod`]
        if(this.wholeReportingPeriod===false) {
            this.beginningOfReportingPeriod = data[`${key}${member[key==="board" ? "boardMemberId" : "boardOfDirectorId"]}Beginning`]
            this.endOfReportingPeriod = data[`${key}${member[key==="board" ? "boardMemberId" : "boardOfDirectorId"]}End`]
        }
    }
}

//[bodyType==="board" ? "boardMemberId" : "boardOfDirectorId"]