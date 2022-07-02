import {getCompanyFromDb} from "../../../api/axios"
import {useState} from "react";
import Card from "@mui/material/Card";
import {CardGroup} from "react-bootstrap";
import {Box, Button, Stack} from "@mui/material";
import {Formik} from "formik";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers";
import {saveFinancialStatement} from "../../../api/axiosPosts";
import {FinancialStatementProtocol} from "../../../classes/company/FinancialStatementProtocol";


export default function FinancialStatement() {
    const [company, setCompany] = useState("")
    const [values, setValue] = useState({protocolNumber: 1, meetingDate: new Date()});

    if (!!!company) {
        getCompanyFromDb("sadad", setCompany)
    }

    return <Box>
        <Formik initialValues={{protocolNumber : 1, meetingDate:new Date()}} onSubmit={(data, {setSubmitting}) => {
            setSubmitting(true);
            const financialStatement = new FinancialStatementProtocol(data);
            saveFinancialStatement(financialStatement, "b884c2a9-5e4a-4f7c-bae0-5f5a98d67508");
            setSubmitting(false)}}>
            {({values, isSubmitting, handleChange, handleBlur, handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="protocolNumber"
                        value={values.protocolNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="number"/>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Data posiedzenia"
                            value={values.meetingDate}
                            inputFormat="dd/MM/yyyy"
                            onChange={(newValue) => {
                                values.meetingDate = newValue
                                setValue(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} helperText={params?.inputProps?.placeholder} />
                            )}
                        />
                    </LocalizationProvider>

                    <Button type="submit" disabled={isSubmitting}> Zapisz</Button>
                    <pre>{JSON.stringify(values, null, 2)}</pre>
                </form>
            )
            }
        </Formik>
    </Box>
}