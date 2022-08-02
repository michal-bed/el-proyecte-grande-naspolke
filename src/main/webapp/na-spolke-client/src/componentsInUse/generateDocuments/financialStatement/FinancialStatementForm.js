import {Field, Form, Formik, useField, useFormikContext} from "formik";
import {Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import {validationSchema} from "./formUtils/FinancialStatementFormLogic";
import {FinancialStatementProtocol} from "../../../classes/financialStatementProtocol/FinancialStatementProtocol";
import {saveFinancialStatement} from "../../../api/axiosPosts";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers";
import Card from "@mui/material/Card";
import {Button} from "@material-ui/core";
import {MeetingPlace} from "./meetingPlace/MeetingPlace";
import {SwitchComponent} from "./formUtils/SwitchComponent";
import {AttendanceList} from "./attendance/AttendanceList";
import {MeetingOrganElection} from "./meetingOrganElection/MeetingOrganElection";
import {MeetingAgenda} from "./agenda/MeetingAgenda";
import {FinancialStatementInfo} from "./financialStatementInfo/FinancialStatementInfo";
import {ApprovalBodyMemberSection} from "./approvalBodyMember/ApprovalBodyMemberSection";
import {SetupInitialFormValues} from "./formUtils/SetupInitialFormValues";

export default function FinancialStatementForm({company, companyIdMac}) {

    const {initialValues, individualPartners, partnerCompanies} = SetupInitialFormValues(company)

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
                                <TextField {...params} helperText={params?.inputProps?.placeholder}/>
                            )}
                        />
                    </LocalizationProvider>

                    <MeetingPlace values={values} handleChange={handleChange}/>

                    <AttendanceList values={values} company={company} setFieldValue={setFieldValue}/>

                    <Card>
                        <SwitchComponent values={values}
                                         switchTrueText={"Formalne zwołanie"}
                                         switchFalseText={"Bez formalnego zwołania (wszyscy wspólnicy muszą być obecni)"}
                                         title={"Tryb zwołania Zgromadzenie Wspólników"}
                                         name={"formalConvening"}
                                         setFieldValue={setFieldValue}/>
                    </Card>

                    <MeetingOrganElection values={values} company={company} type={"chairperson"}
                                          setFieldValue={setFieldValue}
                                          headerText={"Wybór Przewodniczącego"}
                                          helperText={"Wybierz przewodniczącego"}
                                          handleChange={handleChange}/>

                    <MeetingOrganElection values={values} company={company} type={"recorder"}
                                          setFieldValue={setFieldValue}
                                          headerText={"Wybór Protokolanta"}
                                          helperText={"Wybierz protokolanta"}
                                          handleChange={handleChange}/>

                    <MeetingAgenda values={values} handleChange={handleChange}/>

                    <FinancialStatementInfo setFieldValue={setFieldValue} values={values} handleChange={handleChange}/>

                    <ApprovalBodyMemberSection values={values} handleChange={handleChange} setFieldValue={setFieldValue}
                                               company={company} />

                    <Button type="submit" disabled={isSubmitting}> Zapisz</Button>
                    <pre>{JSON.stringify(values, null, 2)}</pre>
                </Form>
            )}
        </Formik>
    </Box>
}
