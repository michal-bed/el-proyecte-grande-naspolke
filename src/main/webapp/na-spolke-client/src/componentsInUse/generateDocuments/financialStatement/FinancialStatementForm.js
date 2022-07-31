import {useEffect} from "react";
import {Field, Form, Formik, useField, useFormikContext} from "formik";
import {Box, FormControlLabel, FormHelperText, InputLabel, MenuItem, Radio, Select, Stack, Switch } from "@mui/material";
import TextField from "@mui/material/TextField";
import {validationSchema} from "./FinancialStatementFormLogic";
import {FinancialStatementProtocol} from "../../../classes/financialStatementProtocol/FinancialStatementProtocol";
import {saveFinancialStatement} from "../../../api/axiosPosts";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker, DesktopDatePicker} from "@mui/x-date-pickers";
import Card from "@mui/material/Card";
import styles from "./PartnersAbsents/PartnersAbsents.module.css";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";
import {FormControl} from "@chakra-ui/react";
import {Checkbox} from "@material-ui/core";
import {Button} from "@material-ui/core";
import {VotingNoUnanimously} from "./VotingNoUnanimously";
import {MeetingPlace} from "./MeetingPlace";
import {SwitchComponent} from "./SwitchComponent";
import {AttendanceList} from "./AttendanceList";
import {MeetingOrganElection} from "./MeetingOrganElection";
import {MeetingAgenda} from "./MeetingAgenda";
import {FinancialStatementInfo} from "./financialStatementInfo/FinancialStatementInfo";
import {ApprovalBodyMember} from "./ApprovalBodyMember";
import {ApprovalBodyMemberSection} from "./ApprovalBodyMemberSection";

export default function FinancialStatementForm({company, companyIdMac}) {

    let individualPartners = [];
    let partnerCompanies = [];
    let initialValues = {
        protocolNumber: 1,
        meetingDate: new Date(),
        meetingPlaceInHeadquarters: "true",
        meetingPlace: "",
        streetName: "",
        streetNumber: "",
        localNumber: "",
        city: "",
        zipCode: "",
        formalConvening: false,
        chairperson: "",
        chairpersonUnanimously: true,
        recorder: "",
        recorderUnanimously : true,
        amountProfitOrLoss: 0,
        agendaUnanimously: true,
        beginningReportingPeriodNo1: new Date(`${new Date().getFullYear()-1}-01-01`),
        endReportingPeriodNo1: new Date(`${new Date().getFullYear()-1}-12-31`),
        amountProfitOrLossUnanimously: true,
        sumOfAssetsAndLiabilities: 0,
        financialStatementUnanimously: true,
    };
    if (company.partners.individualPartners !== null && individualPartners.length === 0) {
        for (let i = 0; i < company.partners.individualPartners.length; i++) {
            individualPartners.push({"id": company.partners.individualPartners[i].id, isPresent: true})
            initialValues[`individual${individualPartners[i].id}IsPresent`] = true;
            if (initialValues.chairperson === ""){
                initialValues.chairperson = `${company.partners.individualPartners[i].firstName} ${company.partners.individualPartners[i].lastNameI}`
                initialValues.recorder = `${company.partners.individualPartners[i].firstName} ${company.partners.individualPartners[i].lastNameI}`
            }
        }
    }
    if (company.partners.partnerCompanies !== null && partnerCompanies.length === 0) {
        for (let i = 0; i < company.partners.partnerCompanies.length; i++) {
            partnerCompanies.push({"id": company.partners.partnerCompanies[i].id, isPresent: true})
            initialValues[`company${partnerCompanies[i].id}IsPresent`] = true;
            initialValues[`representative${partnerCompanies[i].id}name`] = company.partners.partnerCompanies.representativeFirstname;
            initialValues[`representative${partnerCompanies[i].id}lastname`] = company.partners.partnerCompanies.representativeFirstname;
            if (initialValues.chairperson === ""){
                initialValues.chairperson = `${company.partners.partnerCompanies.representativeFirstname} ${company.partners.partnerCompanies.representativeFirstname}`
                initialValues.recorder = `${company.partners.partnerCompanies.representativeFirstname} ${company.partners.partnerCompanies.representativeFirstname}`
            }
        }
    }

    if (company.boardMembers.length > 0){
        for (let i = 0; i < company.boardMembers.length; i++) {
            initialValues[`board${company.boardMembers[i].boardMemberId}WholeReportingPeriod`] = true;
            initialValues[`board${company.boardMembers[i].boardMemberId}Unanimously`] = true;
        }
    }
    if (company.boardOfDirectors.length > 0){
        for (let i = 0; i < company.boardOfDirectors.length; i++) {
            initialValues[`director${company.boardOfDirectors[i].boardOfDirectorId}WholeReportingPeriod`] = true;
            initialValues[`director${company.boardOfDirectors[i].boardOfDirectorId}Unanimously`] = true;
        }
    }

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
                                         switchTrueText={"Bez formalnego zwołania (wszyscy wspólnicy muszą być obecni)"}
                                         switchFalseText={"Formalne zwołanie"}
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
