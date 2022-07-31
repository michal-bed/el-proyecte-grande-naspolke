import Card from "@mui/material/Card";
import {AccountingPeriod} from "./AccountingPeriod";
import {SumOfAssetsAndLiabilities} from "./SumOfAssetsAndLiabilities";
import {AmountProfitOrLoss} from "./AmountProfitOrLoss";


export function FinancialStatementInfo({values, setFieldValue, handleChange }) {
    return <Card>
        <p>Sprawozdanie finansowe</p>

        <AccountingPeriod values={values} setFieldValue={setFieldValue}/>

        <SumOfAssetsAndLiabilities resolutionHeader={"Kwota którą wykazuje bilans po stronie aktywów i pasywów"} values={values}
                                   handleChange={handleChange} valueName={"sumOfAssetsAndLiabilities"}
                                   label={"wysokość aktywów i pasywów (w PLN)"}/>

        <AmountProfitOrLoss handleChange={handleChange} valueName={"amountProfitOrLoss"} values={values}
                            resolutionHeader={"Wysokość zysku lub straty netto którą wykazuje rachunek zysków i strat"}/>

    </Card>
}