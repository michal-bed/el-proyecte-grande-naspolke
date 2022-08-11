import {Resolution} from "./Resolution";

export class ResolutionProfitLoss extends Resolution{

    profitOrLossValue;
    coverageOfLossOrProfitAllocation;
    coverageOfLossOrProfitAllocationDifferentWay;

    constructor(data, votingType, resolutionTitle, key) {
        super(data, votingType, resolutionTitle, key)
        this.profitOrLossValue = data.amountProfitOrLoss;
        this.coverageOfLossOrProfitAllocation = data.coverageOfLossOrProfitAllocation;
        if (this.coverageOfLossOrProfitAllocation === "inne..."){
            this.coverageOfLossOrProfitAllocationDifferentWay = data.coverageOfLossOrProfitAllocationDifferentWay;
        }
    }
}