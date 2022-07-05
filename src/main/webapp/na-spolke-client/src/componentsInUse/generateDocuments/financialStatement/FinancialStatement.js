import {getCompanyFromDb} from "../../../api/axios"
import {useEffect, useState} from "react";
import {Box, Button, FormControlLabel, Radio} from "@mui/material";
import {Form, Formik, useField, useFormikContext} from "formik";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers";
import {saveFinancialStatement} from "../../../api/axiosPosts";
import {FinancialStatementProtocol} from "../../../classes/company/FinancialStatementProtocol";
import {validationSchema} from "./FinancialStatementFormLogic";



export default function FinancialStatement() {

    const [company, setCompany] = useState("")

    if (!!!company) {
        getCompanyFromDb("sadad", setCompany)
    }


    const MyRadio = ({label, ...props}) => {
      const [field] = useField(props);
      return         (
          <FormControlLabel {...field} control={<Radio />} label={label} />
      )
    }

    const MyTextFieldOptionalMeetingPlace = ({placeholder, ...props}) => {
        const {
            values: { meetingPlaceInHeadquarters , ...values },
            setFieldValue,
        } = useFormikContext();
        const [field, meta] = useField(props);
        const errorText = meta.error ? meta.error : "";

        useEffect(()=>{
                setFieldValue(props.name, "")
                }, [meetingPlaceInHeadquarters])

        return (
            <TextField
                placeholder={placeholder}
                {...field}
                label={props.label}
                helperText={errorText}
                error={!!errorText}
                type={props.type}
            />
        );
    }

    const MyTextField = ({ placeholder, ...props }) => {
        const [field, meta] = useField(props);
        const errorText = meta.error && meta.touched ? meta.error : "";

        return (
            <TextField
                placeholder={placeholder}
                {...field}
                label={props.label}
                helperText={errorText}
                error={!!errorText}
                type={props.type}
            />
        );
    };


    return <Box>
        <Formik initialValues={{
            protocolNumber:1,
            meetingDate: new Date(),
            meetingPlaceInHeadquarters: "true",
            meetingPlace:"",
            streetName:"",
            streetNumber:"",
            localNumber:"",
            city:"",
            zipCode:"",
        }}
                validationSchema={validationSchema}
            onSubmit={(data, {setSubmitting}) => {
            setSubmitting(true);
            const financialStatement = new FinancialStatementProtocol(data);
            if (data.meetingPlaceInHeadquarters==="true") {
                financialStatement.meetingPlace = "siedzibie spółki";
            }
            saveFinancialStatement(financialStatement, "b884c2a9-5e4a-4f7c-bae0-5f5a98d67508");
            setSubmitting(false)}}>
            {({values, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue}) => (
                <Form>
                    <MyTextField
                        name="protocolNumber"
                        type="number"
                        as={TextField}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Data posiedzenia"
                            name="meetingDate"
                            value={values.meetingDate}
                            inputFormat="dd/MM/yyyy"
                            onChange={(value => setFieldValue("meetingDate", value))}
                            renderInput={(params) => (
                                <TextField {...params} helperText={params?.inputProps?.placeholder} />
                            )}
                        />
                    </LocalizationProvider>
                    <div style={{marginLeft:"2vh" }}>
                        <MyRadio name="meetingPlaceInHeadquarters" type="radio" value="true"
                                  onChange = {(values=> { setFieldValue("meetingPlaceInHeadquarters", null); })}
                                  label="w siedzibie spółki"/>
                        <MyRadio name="meetingPlaceInHeadquarters" type="radio" value="false"
                                 onChange = {(values=> { setFieldValue("meetingPlaceInHeadquarters", values); })}
                                 label="w innym miejscu"/>
                    </div>
                    <div style={{display: values.meetingPlaceInHeadquarters==="true" && "none"}}>
                        <MyTextFieldOptionalMeetingPlace label="Zgromadzenie odbyło się w:" name="meetingPlace" placeholder="Kancelarii Notarialnej Ireny Kamińskiej"/>
                        <div><MyTextFieldOptionalMeetingPlace label="ulica" name="streetName" />
                            <MyTextFieldOptionalMeetingPlace label="nr" name="streetNumber" />
                            <MyTextFieldOptionalMeetingPlace label="nr lokalu" name="localNumber" type="number" InputProps={{ inputProps: { max: 10000, min: 1} }} />
                            <MyTextFieldOptionalMeetingPlace label="miasto" name="city" />
                            <MyTextFieldOptionalMeetingPlace label="kod pocztowy" name="zipCode" placeholder="xx-xxx" />
                        </div>
                    </div>
                    <Button type="submit" disabled={isSubmitting}> Zapisz</Button>
                    <pre>{JSON.stringify(values, null, 2)}</pre>
                </Form>
            )
            }
        </Formik>
    </Box>
}
