import {DatePickerComponent} from "../formUtils/DatePickerComponent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

export function AccountingPeriod({values, setFieldValue}) {

    return <Card sx={{minWidth: 275, width: '96%', marginBottom:'2%', marginLeft:'2%', marginRight:'2%',
        ':hover': { boxShadow: 20,}}}>
        <Typography sx={{ fontSize: 20, marginBottom: 2 }} color="text.primary" gutterBottom>
            Początek rozliczanego okresu sprawozdawczego        </Typography>
        <DatePickerComponent values={values} setFieldValue={setFieldValue}
                             label={"Początek okresu sprawozdawczego"}
                             valuesName={"beginningReportingPeriodNo1"}/>


        <Typography sx={{ fontSize: 20, marginBottom: 2 }} color="text.primary" gutterBottom>
            Koniec rozliczanego okresu sprawozdawczego</Typography>

        <DatePickerComponent values={values} setFieldValue={setFieldValue}
                             label={"Koniec okresu sprawozdawczego"}
                             valuesName={"endReportingPeriodNo1"}/>
        </Card>
}