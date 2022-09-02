import {Resolution} from "./Resolution";

export class ResolutionFinancialStatement extends Resolution{
    beginningReportingPeriod;
    endReportingPeriod;
    sumOfAssetsAndLiabilities;

    constructor(data, votingType, resolutionTitle, key) {
        super(data, votingType,resolutionTitle, key)
        this.beginningReportingPeriod = data.beginningReportingPeriodNo1;
        this.endReportingPeriod = data.endReportingPeriodNo1;
        this.sumOfAssetsAndLiabilities = data.sumOfAssetsAndLiabilities;
    }
}