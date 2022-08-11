import Card from "@mui/material/Card";
import {AccountingPeriod} from "./AccountingPeriod";
import {SumOfAssetsAndLiabilities} from "./SumOfAssetsAndLiabilities";
import {AmountProfitOrLoss} from "./AmountProfitOrLoss";
import Typography from "@mui/material/Typography";


export function FinancialStatementInfo({values, setFieldValue, handleChange }) {
    return <Card sx={{minWidth: 275, width: '80%', height: '100%', margin:'auto', marginBottom:'2%',
        ':hover': { boxShadow: 20,}}} >
        <Typography sx={{ fontSize: 26, marginBottom: "8%", marginTop:'4%' }} color="text.secondary" gutterBottom align={"center"}>
            Sprawozdanie finansowe
        </Typography>

        <AccountingPeriod values={values} setFieldValue={setFieldValue}/>

        <SumOfAssetsAndLiabilities resolutionHeader={"Kwota którą wykazuje bilans po stronie aktywów i pasywów"} values={values}
                                   handleChange={handleChange} valueName={"sumOfAssetsAndLiabilities"}
                                   label={"wysokość aktywów i pasywów (w PLN)"}/>

        <AmountProfitOrLoss handleChange={handleChange} valueName={"amountProfitOrLoss"} values={values}
                            resolutionHeader={"Wysokość zysku lub straty netto którą wykazuje rachunek zysków i strat"}/>

    </Card>
}