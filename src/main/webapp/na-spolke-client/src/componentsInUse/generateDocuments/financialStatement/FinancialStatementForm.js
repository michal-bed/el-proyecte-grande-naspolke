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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {BoardOfDirector} from "../../../classes/persons/BoardOfDirector";
import {Button} from "@material-ui/core";
import {useNow} from "@mui/x-date-pickers/internals/hooks/useUtils";
import {VotingNoUnanimously} from "./VotingNoUnanimously";
import style from "./AttendanceList.module.css"
import {MeetingPlace} from "./MeetingPlace";
import {PartnersAttendanceList} from "./PartnersAttendanceList";
import {SwitchComponent} from "./SwitchComponent";
import {AttendanceList} from "./AttendanceList";

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
        president: "",
        presidentUnanimously: true,
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
            if (initialValues.president === ""){
                initialValues.president = `${company.partners.individualPartners[i].firstName} ${company.partners.individualPartners[i].lastNameI}`
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
            if (initialValues.president === ""){
                initialValues.president = `${company.partners.partnerCompanies.representativeFirstname} ${company.partners.partnerCompanies.representativeFirstname}`
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
                    <Card>
                        <p>Przewodniczący Zgromadzenia:</p>
                        <div>
                            <FormControl sx={{m: 1, minWidth: 120}}>
                                <InputLabel id="demo-simple-select-helper-label">Przewodniczący
                                    Zgromadzenia</InputLabel>
                                <Select
                                    name={"president"}
                                    value={values.president}
                                    label="Przewodniczący Zgromadzenia"
                                    onChange={handleChange}
                                >
                                    {company.partners.individualPartners.length > 0 && company.partners.individualPartners.map(partner => (
                                        <MenuItem key={`select${partner.id}`}
                                                  value={`${partner.firstName} ${partner.lastNameI}`}>{partner.firstName + " " + partner.lastNameI}</MenuItem>))}
                                    {company.partners.partnerCompanies.length > 0 && company.partners.partnerCompanies.map(partner => (
                                        <MenuItem key={`selectCompanyPartner${partner.id}`}
                                                  value={partner.representativeFirstname + " " + partner.representativeLastname}>{partner.representativeFirstname + " " + partner.representativeLastname}</MenuItem>))}
                                </Select>
                                <FormHelperText>Wybierz przewodniczącego</FormHelperText>
                            </FormControl>
                            <div>
                                <p>Głosowanie</p>
                                <div>
                                    <Checkbox aria-label={"jednogłośnie"} name={"presidentUnanimously"} defaultChecked
                                              value={values.presidentUnanimously} onChange={handleChange}
                                              color="secondary"/>
                                </div>
                                {values.presidentUnanimously === false &&
                                <VotingNoUnanimously votingType={"president"} values={values}/>
                                }
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <p>Uchwała w sprawie wyboru protokolanta:</p>
                        <div>
                            <FormControl sx={{m: 1, minWidth: 120}}>
                                <InputLabel id="demo-simple-select-helper-label">Protokolant</InputLabel>
                                <Select
                                    name={"recorder"}
                                    value={values.recorder}
                                    label="Protokolant"
                                    onChange={handleChange}
                                >
                                    {company.partners.individualPartners.length > 0 && company.partners.individualPartners.map((partner, index) => (
                                        <MenuItem key={`selectRecorder${index}`}
                                                  value={`${partner.firstName} ${partner.lastNameI}`}>{partner.firstName + " " + partner.lastNameI}</MenuItem>))}
                                    {company.partners.partnerCompanies.length > 0 && company.partners.partnerCompanies.map((partner, index) => (
                                        <MenuItem key={`selectRecorderCompanyPartner${index}`}
                                                  value={partner.representativeFirstname + " " + partner.representativeLastname}>{partner.representativeFirstname + " " + partner.representativeLastname}</MenuItem>))}
                                </Select>
                            </FormControl>
                            <div>
                                <p>Głosowanie</p>
                                <div>
                                    <Checkbox aria-label={"jednogłośnie"} name={"recorderUnanimously"} defaultChecked
                                              value={values.recorderUnanimously} onChange={handleChange}
                                              color="secondary"/>
                                </div>
                                {values.recorderUnanimously === false &&
                                    <VotingNoUnanimously votingType={"recorder"} values={values}/> }
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div><p>Porządek obrad:</p>
                            <ol>
                                <li>otwarcie Zwyczajnego Zgromadzenia;</li>
                                <li>wybór Przewodniczącego Zgromadzenia i Protokolanta;</li>
                                <li>stwierdzenie prawidłowości zwołania Zgromadzenia;</li>
                                <li>podjęcie uchwały w przedmiocie rozpatrzenia i zatwierdzenie sprawozdania finansowego
                                    Spółki oraz sprawozdania Zarządu;
                                </li>
                                {values.amountProfitOrLoss > 0 && <li>podjęcie uchwały w przedmiocie sposobu podziału zysku;</li>}
                                {values.amountProfitOrLoss < 0 && <li>podjęcie uchwały w przedmiocie sposobu pokrycia straty;</li>}
                                <li>podjęcie uchwały w przedmiocie udzielenia absolutorium organom spółki;</li>
                                <li>wolne głosy i wnioski;</li>
                                <li>zamknięcie obrad Zgromadzenia;</li>
                            </ol>
                            <div>
                                <p>Głosowanie nad przyjęciem porządku obrad</p>
                                <div>
                                    <Checkbox aria-label={"jednogłośnie"} name={"agendaUnanimously"} defaultChecked
                                              value={values.agendaUnanimously} onChange={handleChange}
                                              color="secondary"/>
                                </div>
                                {values.agendaUnanimously === false &&
                                    <VotingNoUnanimously votingType={"agenda"} values={values}/> }
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <p>Sprawozdanie finansowe</p>
                        <p>Początek rozliczanego okresu sprawozdawczego</p>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Początek okresu sprawozdawczego"
                                name="beginningReportingPeriodNo1"
                                value={values.beginningReportingPeriodNo1}
                                inputFormat="dd/MM/yyyy"
                                openTo="year"
                                onChange={(value => setFieldValue("beginningReportingPeriodNo1", value))}
                                renderInput={(params) => (
                                    <TextField {...params} helperText={params?.inputProps?.placeholder}/>
                                )}
                            />
                        </LocalizationProvider>
                        <p>Koniec rozliczanego okresu sprawozdawczego</p>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="koniec okresu sprawozdawczego"
                                name="endReportingPeriodNo1"
                                value={values.endReportingPeriodNo1}
                                inputFormat="dd-MM-yyyy"
                                openTo="year"
                                onChange={(value => setFieldValue("endReportingPeriodNo1", value))}
                                renderInput={(params) => (
                                    <TextField {...params} helperText={params?.inputProps?.placeholder}/>
                                )}
                            />
                        </LocalizationProvider>
                        <p>Kwota którą wykazuje bilans po stronie aktywów i pasywów</p>
                        <MyTextField
                            name={"sumOfAssetsAndLiabilities"}
                            type="number"
                            value={values.sumOfAssetsAndLiabilities}
                            onChange={handleChange}
                            label="wysokość aktywów i pasywów (w PLN)"
                            as={TextField}
                        />
                        <div>
                            <p>Głosowanie nad przyjęciem sprawozdania finansowego i sprawozdania zarządu</p>
                            <div>
                                <Checkbox aria-label={"jednogłośnie"} name={"financialStatementUnanimously"}
                                          defaultChecked
                                          value={values.financialStatementUnanimously} onChange={handleChange}
                                          color="secondary"/>
                            </div>
                            {values.financialStatementUnanimously === false &&
                                <VotingNoUnanimously votingType={"financialStatement"} values={values}/> }
                        </div>
                        <p>Wysokość zysku lub straty netto którą wykazuje rachunek zysków i strat</p>
                        <MyTextField
                            name={"amountProfitOrLoss"}
                            type="number"
                            value={values.amountProfitOrLoss}
                            onChange={handleChange}
                            label="Wysokość zysku lub straty (w PLN)"
                            as={TextField}
                        />
                        {values.amountProfitOrLoss !== 0 && <FormControl sx={{m: 1, minWidth: 120}}>
                            <InputLabel
                                id="demo-simple-select-helper-label">{values.amountProfitOrLoss > 0 ? "Przeznaczenie zysku" : "Sposób pokrycia straty"}</InputLabel>
                            <Select
                                name={"coverageOfLossOrProfitAllocation"}
                                value={values.coverageOfLossOrProfitAllocation}
                                onChange={handleChange}
                            >
                                {values.amountProfitOrLoss > 0 && profitAllocation.map((possibility, index) => (
                                    <MenuItem key={possibility}
                                              value={possibility}>{possibility}</MenuItem>))}
                                {values.amountProfitOrLoss < 0 && coverageOfLossPosibility.map((possibility, index) => (
                                    <MenuItem key={possibility}
                                              value={possibility}>{possibility}</MenuItem>))}
                            </Select>
                        </FormControl>}
                        {values.coverageOfLossOrProfitAllocation === "inne..." &&
                            <MyTextField
                                name={"coverageOfLossOrProfitAllocationDifferentWay"}
                                value={values.coverageOfLossOrProfitAllocationDifferentWay}
                                onChange={handleChange}
                                label={values.amountProfitOrLoss > 0 ? "Zgromadzenie Wspólników postanawia przeznaczyć zysk w następujący sposób:" : "Zgromadzenie Wspólników postanawia pokryć stratę w następujący sposób:"}
                                as={TextField}
                            />}
                    </Card>
                    <div>
                        <p>{values.amountProfitOrLoss > 0 && "Głosowanie nad przeznaczeniem zysku"}</p>
                        <p>{values.amountProfitOrLoss < 0 && "Głosowanie nad sposobem pokryciem straty"}</p>
                        <div>
                            {values.amountProfitOrLoss !== 0 &&
                                <Checkbox aria-label={"jednogłośnie"} name={"amountProfitOrLossUnanimously"}
                                          defaultChecked
                                          value={values.amountProfitOrLossUnanimously} onChange={handleChange}
                                          color="secondary"/>}
                        </div>
                        {values.amountProfitOrLossUnanimously === false &&
                            <VotingNoUnanimously votingType={"amountProfitOrLoss"} values={values}/> }

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
                    </div>
                    <Button type="submit" disabled={isSubmitting}> Zapisz</Button>
                    <pre>{JSON.stringify(values, null, 2)}</pre>
                </Form>
            )}
        </Formik>
    </Box>
}
