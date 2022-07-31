import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import {DatePickerComponent} from "../DatePickerComponent";

export function AccountingPeriod({values, setFieldValue}) {

    return <div>
        <p>Początek rozliczanego okresu sprawozdawczego</p>
        <DatePickerComponent values={values} setFieldValue={setFieldValue}
                             label={"Początek okresu sprawozdawczego"}
                             valuesName={"beginningReportingPeriodNo1"}/>


        <p>Koniec rozliczanego okresu sprawozdawczego</p>

        <DatePickerComponent values={values} setFieldValue={setFieldValue}
                             label={"Koniec okresu sprawozdawczego"}
                             valuesName={"endReportingPeriodNo1"}/>
        </div>
}