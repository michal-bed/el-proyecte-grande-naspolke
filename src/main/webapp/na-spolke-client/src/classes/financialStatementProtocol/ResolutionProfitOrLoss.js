export class ResolutionProfitLoss extends Resolution{

    profitOrLossValue;
    coverageOfLossOrProfitAllocation;
    coverageOfLossOrProfitAllocationDifferentWay;

    constructor(data, votingType, resolutionTitle, key) {
        super(data, votingType, resolutionTitle, key)
        this.profitOrLossValue = data.amountProfitOrLoss;
        if (this.coverageOfLossOrProfitAllocation === "inne..."){
            this.coverageOfLossOrProfitAllocationDifferentWay = data.coverageOfLossOrProfitAllocationDifferentWay;
        }
    }
}