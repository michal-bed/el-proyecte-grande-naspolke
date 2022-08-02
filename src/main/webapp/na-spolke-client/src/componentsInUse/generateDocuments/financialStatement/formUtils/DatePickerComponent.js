import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";

export function DatePickerComponent({values, valuesName, label, setFieldValue}) {
    return <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
            label={label}
            name={valuesName}
            value={values[valuesName]}
            inputFormat="dd/MM/yyyy"
            openTo="year"
            onChange={(value => setFieldValue(valuesName, value))}
            renderInput={(params) => (
                <TextField {...params} helperText={params?.inputProps?.placeholder}/>
            )}
        />
    </LocalizationProvider>
}