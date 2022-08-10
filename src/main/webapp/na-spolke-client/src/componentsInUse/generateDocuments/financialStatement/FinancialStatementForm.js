import {Field, Form, Formik, useField, useFormikContext} from "formik";
import {Box, CardContent} from "@mui/material";
import TextField from "@mui/material/TextField";
import {checkIfAnyoneIsPresent, validationSchema} from "./formUtils/FinancialStatementFormLogic";
import {FinancialStatementProtocol} from "../../../classes/financialStatementProtocol/FinancialStatementProtocol";
import {saveFinancialStatement} from "../../../api/axiosPosts";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers";
import Card from "@mui/material/Card";
import Button from '@mui/material/Button';
import {MeetingPlace} from "./meetingPlace/MeetingPlace";
import {SwitchComponent} from "./formUtils/SwitchComponent";
import {AttendanceList} from "./attendance/AttendanceList";
import {MeetingOrganElection} from "./meetingOrganElection/MeetingOrganElection";
import {MeetingAgenda} from "./agenda/MeetingAgenda";
import {FinancialStatementInfo} from "./financialStatementInfo/FinancialStatementInfo";
import {ApprovalBodyMemberSection} from "./approvalBodyMember/ApprovalBodyMemberSection";
import {SetupInitialFormValues} from "./formUtils/SetupInitialFormValues";
import styles from "./FinancialStatementForm.module.css"
import Typography from "@mui/material/Typography";

export default function FinancialStatementForm({company, companyIdMac}) {

    const {initialValues} = SetupInitialFormValues(company)

    const MyTextField = ({placeholder, ...props}) => {
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
        <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(data, {setSubmitting}) => {
                    setSubmitting(true);
                    const financialStatement = new FinancialStatementProtocol(data, company);
                    if (data.meetingPlaceInHeadquarters === "true") {
                        financialStatement.meetingPlace = "siedzibie spółki";
                    }
                    console.log(financialStatement)
                    saveFinancialStatement(financialStatement, companyIdMac);
                    setSubmitting(false)
                }}>
            {({values, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue}) => (
                <Form>
                    <Box>
                        <Box sx={{marginBottom:'2%'}} alignContent={"center"}>
                            <Typography sx={{ fontSize: 35, marginBottom: 2 }} color="text.secondary" gutterBottom align={"center"}>
                            Generowanie Protokołu zatwierdzajacego sprawozdanie finansowe
                        </Typography></Box>
                        <Card sx={{minWidth: 275, width: '39%', height: '100%', margin: "auto", marginBottom:'2%',
                            ':hover': { boxShadow: 20,}}}>
                            <CardContent>
                                <Typography sx={{ fontSize: 26, marginBottom: 2 }} color="text.secondary" gutterBottom align={"center"}>
                                    Data i miejsce odbycia Zgromadzenia Wspólników
                                </Typography>

                                <MyTextField
                                name="protocolNumber"
                                type="number"
                                label="Numer protokołu"
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
                                            <TextField {...params} helperText={params?.inputProps?.placeholder}/>
                                        )}
                                    />
                                </LocalizationProvider>

                                <MeetingPlace values={values} handleChange={handleChange}/>
                            </CardContent>
                        </Card>

                        <Box sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: 1,
                            gridTemplateRows: "auto",
                            gridTemplateAreas: `"main1 main2 "
                                            "main3 main4 "`,
                            margin: "auto",
                            // width: '80%'
                        }}>
                            <AttendanceList values={values} company={company} setFieldValue={setFieldValue} />

                            <Card sx={{
                                minWidth: 275, width: '80%', height: '100%', marginBottom: '2%',margin:'auto',
                                borderColor: 'text.primary',
                                ':hover': {boxShadow: 20,}
                            }}>
                                <CardContent>
                                    <Card sx={{
                                        minWidth: 275, width: '100%', marginBottom: '2%',
                                        ':hover': {boxShadow: 20},
                                    }}><SwitchComponent values={values}
                                                        switchTrueText={"Formalne zwołanie"}
                                                        switchFalseText={"Bez formalnego zwołania"}
                                                        title={"Tryb zwołania Zgromadzenie Wspólników"}
                                                        name={"formalConvening"}
                                                        setFieldValue={setFieldValue}
                                                        company={company}/></Card>
                                    <MeetingOrganElection values={values} company={company} type={"chairperson"}
                                                          setFieldValue={setFieldValue}
                                                          headerText={"Wybór Przewodniczącego"}
                                                          helperText={"Wybierz przewodniczącego spośród obecnych osób"}
                                                          handleChange={handleChange}/>

                                    <MeetingOrganElection values={values} company={company} type={"recorder"}
                                                          setFieldValue={setFieldValue}
                                                          headerText={"Wybór Protokolanta"}
                                                          helperText={"Wybierz protokolanta spośród obecnych osób\n"}
                                                          handleChange={handleChange}/></CardContent>
                            </Card>

                        <MeetingAgenda values={values} handleChange={handleChange}/>

                    <FinancialStatementInfo setFieldValue={setFieldValue} values={values} handleChange={handleChange}/>

                    <ApprovalBodyMemberSection values={values} handleChange={handleChange} setFieldValue={setFieldValue}
                                               company={company} />
                    </Box >
                        <Box sx={{minWidth: 275, width: '20%', marginBottom: '2%', margin:'auto'}} >
                            <Button Button variant="contained" type="submit"
                                     disabled={isSubmitting || !values.someoneIsPresent}> <Typography color="common.white" >Wygeneruj dokument</Typography></Button></Box>
                    </Box>
                    <pre>{JSON.stringify(values, null, 2)}</pre>
                </Form>
            )}
        </Formik>
    </Box>
}
