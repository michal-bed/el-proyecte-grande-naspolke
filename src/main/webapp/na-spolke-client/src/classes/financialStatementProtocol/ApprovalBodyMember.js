import {Resolution} from "./Resolution";

export class ApprovalBodyMember extends Resolution{
    bodyType;
    bodyMemberId;
    wholeReportingPeriod;
    beginningOfReportingPeriod;
    endOfReportingPeriod;

    constructor(data,bodyType, votingType, resolutionTitle, key, id) {
        super(data, votingType, resolutionTitle, key, id);
        this.bodyType = key;
        this.bodyMemberId = id;
        this.wholeReportingPeriod = data[`${key}WholeReportingPeriod${id}`]
        this.beginningOfReportingPeriod = data[`${key}Beginning${id}`]
        this.endOfReportingPeriod = data[`${key}End${id}`]
    }
}