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

export default function FinancialStatementForm({company, companyIdMac}) {

    let coverageOfLossPosibility = ["Z zysków lat przyszłych", "inne..."]
    let profitAllocation = ["Na kapitał zapasowy", "pokrycie straty z lat przeszłych", "Na kapitał zapasowy oraz na pokrycie starty z lat przeszłych", "wypłata dywidendy", "inne..."]
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
            initialValues[`boardWholeReportingPeriod${company.boardMembers[i].boardMemberId}`] = true;
            initialValues[`boardUnanimously${company.boardMembers[i].boardMemberId}`] = true;
        }
    }
    if (company.boardOfDirectors.length > 0){
        for (let i = 0; i < company.boardOfDirectors.length; i++) {
            initialValues[`directorWholeReportingPeriod${company.boardOfDirectors[i].boardOfDirectorId}`] = true;
            initialValues[`directorUnanimously${company.boardOfDirectors[i].boardOfDirectorId}`] = true;
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

                        <Box>
                            <p>Głosowanie nad absolutorium Zarządu</p>
                            <p>Wskaż wszystkich członków zarządu oraz okresy sprawowania przez nich funkcji</p>

                            {company.boardMembers.length > 0 && company.boardMembers.map((member, index) => {
                                if (values[`boardWholeReportingPeriod${member.boardMemberId}`] !== false) {
                                    return <Card>
                                        <FormControl>
                                        <p key={`displayedName${member.firstName}index`}>{member.firstName} {member.secondName} {member.lastNameI} {member.lastNameII}
                                            <span
                                                key={`${member.function}${index}`}>{member.function.toLowerCase()}</span>
                                        </p>
                                        <FormControlLabel
                                            control={<Checkbox key={`boardWholeReportingPeriod${member.boardMemberId}`} defaultChecked
                                                               name={`boardWholeReportingPeriod${member.boardMemberId}`}
                                                               onChange={handleChange}
                                                               value={true}/>}
                                            label="Cały okres sprawozdawczy"/>
                                    </FormControl>
                                        <div>
                                            <p>Głosowanie nad udzieleniem absolutorium</p>
                                            <div>
                                                <Checkbox aria-label={"jednogłośnie"}
                                                          name={`boardUnanimously${member.boardMemberId}`}
                                                          defaultChecked
                                                          value={values[`boardUnanimously${member.boardMemberId}`]}
                                                          onChange={handleChange}
                                                          color="secondary"/>
                                            </div>
                                            {values[`boardUnanimously${member.boardMemberId}`] === false &&
                                                <VotingNoUnanimously votingType={`board${member.boardMemberId}`} values={values}/> }
                                        </div>
                                    </Card>
                                } else if (values[`boardWholeReportingPeriod${member.boardMemberId}`] === false) {
                                    return <Card><FormControl>
                                        <p key={`displayedName${member.firstName}index`}>{member.firstName} {member.secondName} {member.lastNameI} {member.lastNameII}
                                            <span
                                                key={`${member.function}${member.boardMemberId}`}>{member.function.toLowerCase()}</span>
                                        </p>
                                        <FormControlLabel
                                            control={<Checkbox key={`boardWholeReportingPeriod${member.boardMemberId}`} defaultChecked
                                                               name={`boardWholeReportingPeriod${member.boardMemberId}`}
                                                               onChange={handleChange}
                                                               value={true}/>}
                                            label="Cały okres sprawozdawczy"/>
                                    </FormControl>
                                        <div>Początek sprawowania funkcji w roku sprawozdawczym</div>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="data początkowa..."
                                                name={`boardBeginning${member.boardMemberId}`}
                                                value={values[`boardBeginning${member.boardMemberId}`]}
                                                inputFormat="dd/MM/yyyy"
                                                onChange={(value => setFieldValue(`boardBeginning${member.boardMemberId}`, value))}
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                               helperText={params?.inputProps?.placeholder}/>
                                                )}
                                            />
                                        </LocalizationProvider>
                                        <div>Koniec sprawowania funkcji w roku sprawozdawczym</div>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="data końcowa..."
                                                name={`boardEnd${member.boardMemberId}`}
                                                value={values[`boardEnd${member.boardMemberId}`]}
                                                inputFormat="dd/MM/yyyy"
                                                onChange={(value => setFieldValue(`boardEnd${member.boardMemberId}`, value))}
                                                renderInput={(params) => (
                                                    <TextField {...params}
                                                               helperText={params?.inputProps?.placeholder}/>
                                                )}
                                            />
                                        </LocalizationProvider>
                                        <div>
                                            <p>Głosowanie nad udzieleniem absolutorium</p>
                                            <div>
                                                <Checkbox aria-label={"jednogłośnie"}
                                                          name={`boardUnanimously${member.boardMemberId}`}
                                                          defaultChecked
                                                          value={values[`boardUnanimously${member.boardMemberId}`]}
                                                          onChange={handleChange}
                                                          color="secondary"/>
                                            </div>
                                            {values[`boardUnanimously${member.boardMemberId}`] === false &&
                                                <VotingNoUnanimously votingType={`board${member.boardMemberId}`} values={values}/> }
                                        </div>
                                    </Card>
                                }
                            })}
                        </Box>
                        {company.boardOfDirectors.length > 0 && <Box>
                            <p>Głosowanie nad absolutorium członków Rady Nadzorczej</p>
                            <p>Wskaż wszystkich członków rady nadzorczej oraz okresy sprawowania przez nich funkcji</p>

                            {company.boardOfDirectors.length > 0 && company.boardOfDirectors.map((member, index) => {
                                return <Card>
                                        <FormControl>
                                            <p key={`displayedDirectorName${member.firstName}index`}>{member.firstName} {member.secondName} {member.lastNameI} {member.lastNameII}</p>
                                            <FormControlLabel
                                                control={<Checkbox key={`directorWholeReportingPeriod${member.boardOfDirectorId}`}
                                                                   defaultChecked
                                                                   name={`directorWholeReportingPeriod${member.boardOfDirectorId}`}
                                                                   onChange={handleChange}
                                                                   value={true}/>}
                                                label="Cały okres sprawozdawczy"/>
                                        </FormControl>
                                    { values[`directorWholeReportingPeriod${member.boardOfDirectorId}`] === false &&
                                        <div>
                                            <div>Początek sprawowania funkcji w roku sprawozdawczym</div>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    label="data początkowa..."
                                                    name={`directorBeginning${member.boardOfDirectorId}`}
                                                    value={values[`directorBeginning${member.boardOfDirectorId}`]}
                                                    inputFormat="dd/MM/yyyy"
                                                    onChange={(value => setFieldValue(`directorBeginning${member.boardOfDirectorId}`, value))}
                                                    renderInput={(params) => (
                                                        <TextField {...params}
                                                                   helperText={params?.inputProps?.placeholder}/>
                                                    )}
                                                />
                                            </LocalizationProvider>
                                            <div>Koniec sprawowania funkcji w roku sprawozdawczym</div>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    label="data końcowa..."
                                                    name={`directorEnd${member.boardOfDirectorId}`}
                                                    value={values[`directorEnd${member.boardOfDirectorId}`]}
                                                    inputFormat="dd/MM/yyyy"
                                                    onChange={(value => setFieldValue(`directorEnd${member.boardOfDirectorId}`, value))}
                                                    renderInput={(params) => (
                                                        <TextField {...params}
                                                                   helperText={params?.inputProps?.placeholder}/>
                                                    )}
                                                />
                                            </LocalizationProvider></div> }
                                            <p>Głosowanie nad udzieleniem absolutorium</p>
                                            <div>
                                                <Checkbox aria-label={"jednogłośnie"}
                                                          name={`directorUnanimously${member.boardOfDirectorId}`}
                                                          defaultChecked
                                                          value={values[`directorUnanimously${member.boardOfDirectorId}`]}
                                                          onChange={handleChange}
                                                          color="secondary"/>
                                            </div>
                                            { values[`directorUnanimously${member.boardOfDirectorId}`] === false &&
                                                <VotingNoUnanimously votingType={`director${member.boardOfDirectorId}`} values={values}/> }
                                    </Card>})}
                        </Box>}
                    <Button type="submit" disabled={isSubmitting}> Zapisz</Button>
                    <pre>{JSON.stringify(values, null, 2)}</pre>
                </Form>
            )}
        </Formik>
    </Box>
}
