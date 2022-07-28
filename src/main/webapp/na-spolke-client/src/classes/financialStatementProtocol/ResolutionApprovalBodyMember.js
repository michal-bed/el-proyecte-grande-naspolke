import {Resolution} from "./Resolution";

export class ResolutionApprovalBodyMember extends Resolution{
    bodyType;
    bodyMemberId;
    wholeReportingPeriod;
    beginningOfReportingPeriod;
    endOfReportingPeriod;

    constructor(data,votingType, resolutionTitle, key, id) {
        super(data, votingType, resolutionTitle, key, id);
        this.bodyType = key;
        this.bodyMemberId = id;
        this.wholeReportingPeriod = data[`${key}WholeReportingPeriod${id}`]
        this.beginningOfReportingPeriod = data[`${key}Beginning${id}`]
        this.endOfReportingPeriod = data[`${key}End${id}`]
    }
}