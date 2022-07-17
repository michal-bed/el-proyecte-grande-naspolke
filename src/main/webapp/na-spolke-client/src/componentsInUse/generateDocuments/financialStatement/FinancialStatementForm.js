import {useEffect} from "react";
import {Form, Formik, useField, useFormikContext} from "formik";
import {
    Box,
    Button,
    FormControlLabel,
    FormHelperText,
    InputLabel,
    MenuItem,
    Radio,
    Select,
    Stack,
    Switch
} from "@mui/material";
import TextField from "@mui/material/TextField";
import {validationSchema} from "./FinancialStatementFormLogic";
import {FinancialStatementProtocol} from "../../../classes/company/FinancialStatementProtocol";
import {saveFinancialStatement} from "../../../api/axiosPosts";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers";
import Card from "@mui/material/Card";
import styles from "./PartnersAbsents/PartnersAbsents.module.css";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";
import {FormControl} from "@chakra-ui/react";

export default function FinancialStatementForm({company, companyIdMac}) {
    const AntSwitch = styled(Switch)(({theme}) => ({
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
        '&:active': {
            '& .MuiSwitch-thumb': {
                width: 15,
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
                transform: 'translateX(9px)',
            },
        },
        '& .MuiSwitch-switchBase': {
            padding: 2,
            '&.Mui-checked': {
                transform: 'translateX(12px)',
                color: '#17dc8a',
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#17dc8a' : '#316348',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: 12,
            height: 12,
            borderRadius: 6,
            transition: theme.transitions.create(['width'], {
                duration: 200,
            }),
        },
        '& .MuiSwitch-track': {
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor:
                theme.palette.mode === 'dark' ? 'rgb(38,211,111)' : 'rgb(180,7,7)',
            boxSizing: 'border-box',
        },
    }));
    const MyRadio = ({label, ...props}) => {
        const [field] = useField(props);
        return (
            <FormControlLabel {...field} control={<Radio/>} label={label}/>
        )
    }
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
        president:""


    };
    if (company.partners.partnerCompanies !== null && partnerCompanies.length === 0) {
        for (let i = 0; i < company.partners.partnerCompanies.length; i++) {
            partnerCompanies.push({"id": company.partners.partnerCompanies[i].id, isPresent: true})
            initialValues[`partnerCompany${partnerCompanies[i].id}IsPresent`] = true;
            initialValues[`representative${partnerCompanies[i].id}name`] = company.partners.partnerCompanies.representativeFirstname;
            initialValues[`representative${partnerCompanies[i].id}lastname`] = company.partners.partnerCompanies.representativeFirstname;
        }
    }
    if (company.partners.individualPartners !== null && individualPartners.length === 0) {
        for (let i = 0; i < company.partners.individualPartners.length; i++) {
            individualPartners.push({"id": company.partners.individualPartners[i].id, isPresent: true})
            initialValues[`individualPartner${individualPartners[i].id}IsPresent`] = true;
        }
    }

    const MyTextFieldOptionalMeetingPlace = ({placeholder, ...props}) => {
        const {
            values: {meetingPlaceInHeadquarters, ...values},
            setFieldValue,
        } = useFormikContext();
        const [field, meta] = useField(props);
        const errorText = meta.error ? meta.error : "";

        useEffect(() => {
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
                    const financialStatement = new FinancialStatementProtocol(data);
                    if (data.meetingPlaceInHeadquarters === "true") {
                        financialStatement.meetingPlace = "siedzibie spółki";
                    }
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
                    <div style={{marginLeft: "2vh"}}>
                        <MyRadio name="meetingPlaceInHeadquarters" type="radio" value="true"
                                 onChange={(values => {
                                     setFieldValue("meetingPlaceInHeadquarters", null);
                                 })}
                                 label="w siedzibie spółki"/>
                        <MyRadio name="meetingPlaceInHeadquarters" type="radio" value="false"
                                 onChange={(values => {
                                     setFieldValue("meetingPlaceInHeadquarters", values);
                                 })}
                                 label="w innym miejscu"/>
                    </div>
                    <div style={{display: values.meetingPlaceInHeadquarters === "true" && "none"}}>
                        <MyTextFieldOptionalMeetingPlace label="Zgromadzenie odbyło się w:" name="meetingPlace"
                                                         placeholder="Kancelarii Notarialnej Ireny Kamińskiej"/>
                        <div><MyTextFieldOptionalMeetingPlace label="ulica" name="streetName"/>
                            <MyTextFieldOptionalMeetingPlace label="nr" name="streetNumber"/>
                            <MyTextFieldOptionalMeetingPlace label="nr lokalu" name="localNumber" type="number"
                                                             InputProps={{inputProps: {max: 10000, min: 1}}}/>
                            <MyTextFieldOptionalMeetingPlace label="miasto" name="city"/>
                            <MyTextFieldOptionalMeetingPlace label="kod pocztowy" name="zipCode" placeholder="xx-xxx"/>
                        </div>
                    </div>
                    <div>
                        {company.partners.individualPartners.length > 0 && company.partners.individualPartners.map((partner, index) => (
                            <Card key={`indCard${partner.id}`}>
                                <div className={styles[`Absent`]} key={`indDiv${partner.id}`}><p
                                    key={`indName${partner.id}`}>{partner.firstName + " " + partner.lastNameI}</p>
                                    <Stack direction="row" spacing={1} alignItems="center"
                                           key={`IndStack${partner.id}`}>
                                        <Typography key={`indNieobecny${partner.id}`}>Nieobecny</Typography>
                                        <AntSwitch name={`individualPartner${individualPartners[index].id}IsPresent`}
                                                   value={individualPartners[index].isPresent}
                                                   checked={individualPartners[index].isPresent === true}
                                                   onChange={(event) => {
                                                       setFieldValue(`individualPartner${individualPartners[index].id}IsPresent`,
                                                           individualPartners[index].isPresent ? individualPartners[index].isPresent = false : individualPartners[index].isPresent = true);
                                                   }}
                                                   key={`indSwitch${index}`}/>
                                        <Typography key={`indObecny${partner.id}`}>Obecny</Typography>
                                    </Stack>
                                </div>
                            </Card>))
                        }
                        {company.partners.partnerCompanies.length > 0 && company.partners.partnerCompanies.map((partner, index) => (
                            <Card key={`card${partner.id}`}>
                                <div className={styles[`Absent`]} key={`div${partner.id}`}><p
                                    key={`partnerName${partner.id}`}>{partner.name}</p>
                                    <Stack direction="row" spacing={1} alignItems="center" key={`stack${partner.id}`}>
                                        <Typography key={`nieobecny${partner.id}`}>Nieobecny</Typography>
                                        <AntSwitch name={`partnerCompanies${partnerCompanies[index].id}IsPresent`}
                                                   value={partnerCompanies[index].isPresent}
                                                   checked={partnerCompanies[index].isPresent === true}
                                                   onChange={(event) => {
                                                       setFieldValue(`partnerCompanies${partnerCompanies[index].id}IsPresent`,
                                                           partnerCompanies[index].isPresent ? partnerCompanies[index].isPresent = false : partnerCompanies[index].isPresent = true);
                                                   }}
                                                   key={index}/>
                                        <Typography key={`obecny${partner.id}`}>Obecny</Typography>
                                    </Stack>
                                    <MyTextField
                                        name={`representative${partner.id}name`}
                                        key={`representative${partner.id}name`}
                                        as={TextField}/>
                                    <MyTextField
                                        name={`representative${partner.id}lastName`}
                                        key={`representative${partner.id}lastName`}
                                        as={TextField}
                                        />
                                </div>
                            </Card>))
                        }
                    </div>
                    <Card>
                        <div className={styles[`Absent`]}><p>W jakim trybie zwołano Zgromadzenie Wspólników</p>
                            <Stack direction="row" spacing={3} alignItems="center">
                                <Typography>Bez formalnego zwołania (wszyscy wspólnicy muszą być obecni)</Typography>
                                <AntSwitch name={"formalConvening"}
                                           value={values.formalConvening}
                                           checked={values.formalConvening}
                                           onChange={(event) => {
                                               setFieldValue("formalConvening",
                                                   values.formalConvening ? values.formalConvening = false : values.formalConvening = true);
                                           }}
                                />
                                <Typography>Formalne zwołanie</Typography>
                            </Stack>
                        </div>
                    </Card>
                    <Card>
                        <p>Przewodniczący Zgromadzenia:</p>
                        <div>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-helper-label">Przewodniczący Zgromadzenia</InputLabel>
                                <Select
                                    name={"president"}
                                    value={values.president}
                                    label="Przewodniczący Zgromadzenia"
                                    onChange={handleChange}
                                >
                                    {company.partners.individualPartners.length > 0 && company.partners.individualPartners.map((partner, index) => (
                                        <MenuItem key={`select${index}`} value={`${partner.firstName} ${partner.lastNameI}`}>{partner.firstName+" "+partner.lastNameI}</MenuItem>))}
                                    {company.partners.partnerCompanies.length > 0 && company.partners.partnerCompanies.map((partner, index) => (
                                        <MenuItem key={`selectCompanyPartner${index}`} value={partner.representativeFirstname+" "+partner.representativeLastname}>{partner.representativeFirstname+" "+partner.representativeLastname}</MenuItem>))}
                                </Select>
                                <FormHelperText>Wybierz przewodniczącego</FormHelperText>
                            </FormControl>
                        </div>
                    </Card>
                    <Button type="submit" disabled={isSubmitting}> Zapisz</Button>
                    <pre>{JSON.stringify(values, null, 2)}</pre>
                </Form>
            )
            }

        </Formik>
    </Box>
}