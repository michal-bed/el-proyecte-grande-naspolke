import {DatePickerComponent} from "../formUtils/DatePickerComponent";

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