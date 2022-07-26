import styles from "./Partners.module.css";
import {Button} from "@material-ui/core";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {useContext, useEffect, useReducer} from "react";
import {populateList} from "../../../../../classes/company/Utils";
import {IndividualPartner, PartnerCompany} from "../../../../../classes/persons/Partners";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import TextField from '@mui/material/TextField';
import validatePartners from "./ValidationCompanyOrgans";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid, Radio,
    RadioGroup
} from "@mui/material";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import {CompanyContext} from "../../CompanyContext";

const actionType = {
    DISPLAY_INDIVIDUAL_PARTNERS: "individuals",
    DISPLAY_COMPANY_PARTNERS: "companies",
    ADD_NEW_COMPANY_PARTNER: "addNewCompanyPartner",
    ADD_NEW_INDIVIDUAL_PARTNER: "addNewIndividualPartner",
    REMOVE_INDIVIDUAL_PARTNER: "removeIndividualPartner",
    REMOVE_COMPANY_PARTNER: "removeCompanyPartner",
    DUPLICATE_INDIVIDUAL_PARTNER: "duplicateIndividualPartner",
    DUPLICATE_COMPANY_PARTNER: "duplicateCompanyPartner",
    SET_SHARE_VALUE: "setShareValue",
    SET_MANY_SHARES_ALLOWED: "setManySharesAllowed"
}

function reducer(state, action) {
    let newState = {...state};
    switch (action.actionType) {
        case actionType.DISPLAY_INDIVIDUAL_PARTNERS: {
            let individualPartners = state.partners.individualPartners;
            individualPartners[action.index][action.event.target.name] = action.event.target.value;
            individualPartners = changeSharesInfo(action, individualPartners);
            newState.partners.individualPartners = individualPartners;
            return {...newState};
        }
        case actionType.DISPLAY_COMPANY_PARTNERS: {
            let partnerCompanies = state.partners.partnerCompanies;
            partnerCompanies[action.index][action.event.target.name] = action.event.target.value;
            partnerCompanies = changeSharesInfo(action, partnerCompanies);
            newState.partners.partnerCompanies = partnerCompanies;
            return {...newState};
        }
        case actionType.ADD_NEW_COMPANY_PARTNER: {
            if (state.partners.partnerCompanies) {
                let partnerCompanies = state.partners.partnerCompanies;
                if (!partnerCompanies.includes(action.newPartner)) {
                    partnerCompanies.push(action.newPartner);
                    newState.partners.partnerCompanies = partnerCompanies;
                    return {...newState};
                } else return state;
            } else {
                let partnerCompanies = [];
                partnerCompanies.push(action.newPartner);
                newState.partners.partnerCompanies = partnerCompanies;
                return {...newState};
            }
        }
        case actionType.ADD_NEW_INDIVIDUAL_PARTNER: {
            if(state.partners.individualPartners) {
                let individualPartners = state.partners.individualPartners;
                if (!individualPartners.includes(action.newPartner)) {
                    individualPartners.push(action.newPartner);
                    newState.partners.individualPartners = individualPartners;
                    return {...newState};
                } else return state;
            } else {
                let individualPartners = [];
                individualPartners.push(action.newPartner);
                newState.partners.individualPartners = individualPartners;
                return {...newState};
            }
        }
        case actionType.REMOVE_INDIVIDUAL_PARTNER: {
            let individualPartners = state.partners.individualPartners;
            if (individualPartners.length >= action.index+1 && individualPartners[action.index] === action.newPartner) {
                individualPartners.splice(action.index, 1)
                newState.partners.individualPartners = individualPartners;
                return {...newState};
            } else return state;
        }
        case actionType.REMOVE_COMPANY_PARTNER: {
            let partnerCompanies = state.partners.partnerCompanies;
            if (partnerCompanies.length >= action.index+1 && partnerCompanies[action.index] === action.newPartner) {
                partnerCompanies.splice(action.index, 1)
                newState.partners.partnerCompanies = partnerCompanies;
                return {...newState};
            } else return state
        }
        case actionType.DUPLICATE_INDIVIDUAL_PARTNER: {
            let partnerCompanies = state.partners.individualPartners;
            if (!partnerCompanies.includes(action.newPartner)) {
                partnerCompanies.splice(action.index + 1, 0, action.newPartner);
                newState.partners.individualPartners = partnerCompanies;
                return {...newState};
            } else return state;
        }
        case actionType.DUPLICATE_COMPANY_PARTNER: {
            let partnerCompanies = state.partners.partnerCompanies;
            if (!partnerCompanies.includes(action.newPartner)) {
                partnerCompanies.splice(action.index + 1, 0, action.newPartner);
                newState.partners.partnerCompanies = partnerCompanies;
                return {...newState}
            } else return state;
        }
        case actionType.SET_SHARE_VALUE: {
            newState.shareValue = action.shareValue;
            return {...newState}
        }
        case actionType.SET_MANY_SHARES_ALLOWED: {
            newState.manySharesAllowed = action.manySharesAllowed;
            return {...newState}
        }
        default:
            return {...state}
    }
}


function changeSharesInfo(action, value) {
    if (action.event.target.name === "sharesCount") {
        value[action.index]["sharesValue"] = parseInt(action.event.target.value) * action.shareValue
    } else if (action.event.target.name === "sharesValue") {
        value[action.index]["sharesCount"] = parseInt(action.event.target.value) / action.shareValue
    }
    return value;
}

const Partners = (props) => {
    const companyData = useContext(CompanyContext)
    const [state, dispatch] = useReducer(reducer, companyData.state.company)
    useEffect(()=>{
        const delay = setTimeout(()=>{
            const hasErrors = checkForErrors();
            const partners = setNewPartnersData()
            const action = {
                pageType: props.pageType,
                partners: partners,
                allPartnersDisplayed: companyData.state.company.shareCapital === countAllSharesValues(),
                manySharesAllowed: state.manySharesAllowed,
                shareValue: state.shareValue,
                hasErrors: hasErrors
            }
            companyData.passNewData(action)
        },1000)
        return () => {clearTimeout(delay)}
        }, [state])
    let counter = 1;

    function checkForErrors() {
        if (state.partners.individualPartners) {
            for (let i = 0; i < state.partners.individualPartners.length; i++) {
                let errors = validatePartners(state.partners.individualPartners[i])
                if (Object.keys(errors).length > 2) {
                    return true;
                }
            }
        }
        if (state.partners.partnerCompanies) {
            for (let i = 0; i < state.partners.partnerCompanies.length; i++) {
                let errors = validatePartners(state.partners.partnerCompanies[i])
                if (Object.keys(errors).length > 3) {
                    return true;
                }
            }
        return false;
        }
        return true;
    }

    function handleChangeInput(index, event, list) {
        const action = {
            actionType: list,
            index: index,
            event: event,
            shareValue: state.shareValue,
        }
        dispatch(action)
    }

    function addEmptyPartnerCompanyToForm() {
        let newCompanyPartner = new PartnerCompany({
            name: "",
            sharesValue: companyData.state.company.shareCapital? parseInt(companyData.state.company.shareCapital) - countAllSharesValues() : 0,
            sharesCount:companyData.state.company.shareCapital? (parseInt(companyData.state.company.shareCapital) / parseInt(companyData.state.company.shareValue)) - countAllSharesCount() :0
        })
        const action = {
            actionType: actionType.ADD_NEW_COMPANY_PARTNER,
            newPartner: newCompanyPartner
        }
        dispatch(action);
    }

    function addEmptyIndividualToForm() {
        let newCompanyPartner = new IndividualPartner({
            firstname: "",
            secondName: "",
            lastNameI: "",
            lastNameII: "",
            sharesValue: companyData.state.company.shareCapital? parseInt(companyData.state.company.shareCapital) - countAllSharesValues(): 0,
            sharesCount: companyData.state.company.shareCapital ? (parseInt(companyData.state.company.shareCapital) / parseInt(companyData.state.company.shareValue)) - countAllSharesCount() : 0
        })
        const action = {
            actionType: actionType.ADD_NEW_INDIVIDUAL_PARTNER,
            newPartner: newCompanyPartner,
            shareValue: state.shareValue

        }
        dispatch(action);

    }

    const handleChange = (event) => {
        const action ={
            actionType: actionType.SET_MANY_SHARES_ALLOWED,
            manySharesAllowed: event.target.value,
            shareValue: state.shareValue

        };
        dispatch(action)
    };

    const handleChangeShareValue = (event) => {
        const action = {
            actionType: actionType.SET_SHARE_VALUE,
            shareValue: event.target.value,
        }
        dispatch(action)
    }

    function countAllSharesCount() {
        let sharesCount = 0;
        if (state.partners.individualPartners) {
            for (let i = 0; i < state.partners.individualPartners.length; i++) {
                sharesCount += parseInt(state.partners.individualPartners[i].sharesCount);
            }
        }
        if (state.partners.partnerCompanies) {
            for (let i = 0; i < state.partners.partnerCompanies.length; i++) {
                sharesCount += parseInt(state.partners.partnerCompanies[i].sharesCount);
            }
        }
        return sharesCount;
    }

    function countAllSharesValues() {
        return countPartnersListSharesValue(state.partners.partnerCompanies) + countPartnersListSharesValue(state.partners.individualPartners)
    }

    function countPartnersListSharesValue(newIndividualPartnerList) {
        let sharesValue = 0;
        if (newIndividualPartnerList) {
            for (let i = 0; i < newIndividualPartnerList.length; i++) {
                sharesValue += parseInt(newIndividualPartnerList[i].sharesValue);
            }
        }
        return sharesValue;
    }

    function setNewPartnersData() {
        const newIndividualPartnerList = state.partners.individualPartners && populateList(state.partners.individualPartners, "individuals");
        const newCompanyPartnerList = state.partners.partnerCompanies && populateList(state.partners.partnerCompanies, "companies");
        const allIndividualSharesValue = countPartnersListSharesValue(newIndividualPartnerList)
        const allCompanySharesValue = countPartnersListSharesValue(newCompanyPartnerList)
        const allSharesCount = countAllSharesCount()
        return {
            individualPartners: newIndividualPartnerList, partnerCompanies: newCompanyPartnerList,
            allSharesValue: allIndividualSharesValue + allCompanySharesValue, allSharesCount: allSharesCount
        };
    }

    function partnerToHandle(action, partner) {
        if (action === actionType.DUPLICATE_INDIVIDUAL_PARTNER || action === actionType.REMOVE_INDIVIDUAL_PARTNER) {
            return action === actionType.DUPLICATE_INDIVIDUAL_PARTNER ? new IndividualPartner({
                firstName: "",
                secondName: "",
                lastNameI: "",
                lastNameII: "",
                sharesCount: partner.sharesCount,
                sharesValue: partner.sharesValue
            }) : partner;
        } else {
            return action === actionType.DUPLICATE_COMPANY_PARTNER ? new PartnerCompany({
                name: "",
                sharesValue: partner.sharesValue,
                sharesCount: partner.sharesCount
            }) : partner
        }
    }

    function handlePartnersList(index, actionType, partner) {
        const newPartner = partnerToHandle(actionType, partner);
        const action = {
            index:index,
            actionType:actionType,
            newPartner: newPartner
        }
        dispatch(action)
    }

    function partnerSharesInfo(index, partner, listType) {
        return <>
            <Box sx={{gridArea: "sharesCount"}} className={styles["Box"]}><TextField
                label="ilość udziałów"
                name="sharesCount"
                variant="filled"
                type="number"
                value={partner.sharesCount}
                error={validatePartners({sharesCount: partner.sharesCount}).hasOwnProperty("sharesCount")}
                helperText={validatePartners({sharesCount: partner.sharesCount}).sharesCount}
                onChange={(event) => handleChangeInput(index, event, listType)}
            /></Box>
            <Box sx={{width: "auto", gridArea: "sharesValue"}} className={styles["Box"]}><TextField
                label="wartość udziałów (w PLN)"
                name="sharesValue"
                variant="filled"
                type="number"
                value={partner.sharesValue}
                error={validatePartners({sharesValue: partner.sharesValue}).hasOwnProperty("sharesValue")}
                helperText={validatePartners({sharesValue: partner.sharesValue}).sharesValue}
                onChange={(event) => handleChangeInput(index, event, listType)}
            /></Box>
        </>
    }

    return <div>
        <Grid sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1,
            gridTemplateRows: "auto",
            margin: "auto",
        }} className={styles["card-grid-container"]}>
        <Card  sx={{minWidth: 275, width: "95%", margin: "auto", height: "100%"}}>
            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Wspólnik może posiadać:</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={state.manySharesAllowed ? state.manySharesAllowed : true}
                    onChange={(event)=>handleChange(event)}
                >
                    <FormControlLabel value={false} control={<Radio />} label="tylko jeden udział" />
                    <FormControlLabel value={true} control={<Radio />} label="więcej niż jeden udział" />
                </RadioGroup>
            </FormControl>
        </Card>
        <Card  sx={{minWidth: 275, width: "95%", margin: "auto", height: "100%"}}>
            <CardContent>
                    <TextField
                label="Wartość jednego udziału (w PLN)"
                name="shareValue"
                variant="filled"
                type="number"
                defaultValue={state.shareValue? state.shareValue : 0}
                error={state.shareValue? state.shareValue < 50 : true}
                helperText={"Wartość jednego udziału musi być większa niż 50 zł"}
                onChange={(event) => handleChangeShareValue(event)}
            /></CardContent>
        </Card>
            {state.partners.individualPartners !== null && state.partners.individualPartners.map((partner, index) => (
                <div key={index}>
                    <Card sx={{minWidth: 275, width: "95%", margin: "auto", height: "100%"}}>
                        <Box className={styles["partner-separator"]}> Wspólnik {counter++}</Box>
                        <CardContent sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: 1,
                            gridTemplateRows: "auto",
                            gridTemplateAreas: `"lastNameI lastNameII "
                        "firstName secondName "
                        "sharesCount sharesValue "`,
                            margin: "0"
                        }}>
                            <Box sx={{gridArea: "lastNameI"}} className={styles["Box"]}><TextField
                                label="Nazwisko"
                                name="lastNameI"
                                variant="filled"
                                value={partner.lastNameI}
                                error={validatePartners({lastNameI: partner.lastNameI}).hasOwnProperty("lastNameI")}
                                helperText={validatePartners({lastNameI: partner.lastNameI}).lastNameI}
                                onChange={event => handleChangeInput(index, event, actionType.DISPLAY_INDIVIDUAL_PARTNERS)}
                            /></Box>
                            <Box sx={{gridArea: "lastNameII"}} className={styles["Box"]}><TextField
                                label="Drugi człon nazwiska"
                                name="lastNameII"
                                variant="filled"
                                value={partner.lastNameII}
                                error={validatePartners({lastNameII: partner.lastNameII}).hasOwnProperty("lastNameII")}
                                helperText={validatePartners({lastNameII: partner.lastNameII}).lastNameII}
                                onChange={event => handleChangeInput(index, event, actionType.DISPLAY_INDIVIDUAL_PARTNERS)}
                            /></Box>
                            <Box sx={{gridArea: "firstName"}} className={styles["Box"]}><TextField
                                label="Pierwsze imię"
                                name="firstName"
                                variant="filled"
                                value={partner.firstName}
                                error={validatePartners({firstName: partner.firstName}).hasOwnProperty("firstName")}
                                helperText={validatePartners({firstName: partner.firstName}).firstName}
                                onChange={event => handleChangeInput(index, event, actionType.DISPLAY_INDIVIDUAL_PARTNERS)}
                            /></Box>
                            <Box sx={{gridArea: "secondName"}} className={styles["Box"]}><TextField
                                label="Drugie imię"
                                name="secondName"
                                variant="filled"
                                value={partner.secondName}
                                error={validatePartners({secondName: partner.secondName}).hasOwnProperty("secondName")}
                                helperText={validatePartners({secondName: partner.secondName}).secondName}
                                onChange={event => handleChangeInput(index, event, actionType.DISPLAY_INDIVIDUAL_PARTNERS)}
                            /></Box>
                            {partnerSharesInfo(index, partner, actionType.DISPLAY_INDIVIDUAL_PARTNERS)}</CardContent>
                        <CardActions>
                            <div>
                                <Button variant="outlined" startIcon={<PersonRemoveIcon/>}
                                        onClick={() => handlePartnersList(index, actionType.REMOVE_INDIVIDUAL_PARTNER, partner)}>Usuń</Button>
                                <Button variant="outlined" startIcon={<PersonAddIcon/>}
                                        onClick={() => handlePartnersList(index, actionType.DUPLICATE_INDIVIDUAL_PARTNER, partner)}>Powiel</Button>
                            </div>
                        </CardActions>
                    </Card>
                </div>
            ))
            }
            {state.partners.partnerCompanies !== null && state.partners.partnerCompanies.map((partner, index) => (
                <div key={index}>
                    <Card sx={{minWidth: 275, width: "95%", margin: "auto", height: "100%"}}>
                        <Box className={styles["partner-separator"]}>Wspólnik {counter++}</Box>
                        <CardContent sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: 1,
                            gridTemplateRows: "auto",
                            gridTemplateAreas: `"name name "
                        "sharesCount sharesValue "`,
                            margin: "auto"
                        }}>
                            <Box sx={{gridArea: "name"}} className={styles["Box"]}><TextField
                                fullWidth
                                label="Nazwa wspólnika *"
                                name="name"
                                variant="filled"
                                value={partner.name}
                                error={validatePartners({name: partner.name}).hasOwnProperty("name")}
                                helperText={validatePartners({name: partner.name}).name}
                                onChange={event => handleChangeInput(index, event, actionType.DISPLAY_COMPANY_PARTNERS)}
                            /></Box>
                            {partnerSharesInfo(index, partner, actionType.DISPLAY_COMPANY_PARTNERS)}</CardContent>
                        <div>
                            <Button variant="outlined" startIcon={<PersonRemoveIcon/>} onClick={() => {
                                handlePartnersList(index, actionType.REMOVE_COMPANY_PARTNER, partner)
                            }}>Usuń</Button>
                            <Button variant="outlined" startIcon={<PersonAddIcon/>}
                                    onClick={() => handlePartnersList(index, actionType.DUPLICATE_COMPANY_PARTNER, partner)}>Powiel</Button>
                        </div>
                    </Card>
                </div>
            ))
            }
        <Card sx={{minWidth: 275, width: "95%", margin: "auto", height: "30vh"}}>
            <div className={styles["add-partner-container"]} >
                <div className={styles["add-partner-title"]}>Nowy wspólnik:</div>
                <div className={styles["add-partner-buttons"]}>
                    <Button onClick={()=>addEmptyPartnerCompanyToForm()} endIcon={<AddBusinessIcon/>}>osoba prawna</Button>
                </div>
                <div className={styles["add-partner-buttons"]}>
                    <Button onClick={()=>addEmptyIndividualToForm()} endIcon={<PersonAddIcon/>}>osoba fizyczna</Button>
                </div>
            </div>
        </Card>
        </Grid>
        <div className={styles["summary-container"]}>
            <div className={styles["summary-title"]}>Podsumowanie:</div>
            <div className={styles["summary-user-inputs"]}>
                <TextField
                    error={parseInt(companyData.state.company.shareCapital) / parseInt(companyData.state.company.shareValue) !== countAllSharesCount()}
                    helperText={parseInt(companyData.state.company.shareCapital) / parseInt(companyData.state.company.shareValue) < countAllSharesCount() ? "liczba udziałów jest za wysoka" :
                        parseInt(companyData.state.company.shareCapital) / parseInt(companyData.state.company.shareValue) > countAllSharesCount() ? "liczba udziałów jest za niska" : ""}
                    label="wpisano udziałów"
                    name="allSharesCount"
                    variant="filled"
                    value={countAllSharesCount()}
                    disabled={true}
                />
                <TextField
                    error={parseInt(companyData.state.company.shareCapital) !== countAllSharesValues()}
                    label="wartość"
                    helperText={parseInt(companyData.state.company.shareCapital) < countAllSharesValues() ? "wartosć udziałów jest za wysoka" :
                        parseInt(companyData.state.company.shareCapital) > countAllSharesValues() ? "wartosć udziałów jest za mała" : ""}
                    name="sharesCapital"
                    variant="filled"
                    value={`${countAllSharesValues() } zł`}
                    disabled={true}
                />
            </div>
            <div className={styles["summary-company-data"]}>
                <TextField
                    label="liczba udziałów"
                    name="allSharesCount"
                    variant="filled"
                    defaultValue={parseInt(companyData.state.company.shareCapital) / parseInt(companyData.state.company.shareValue)}
                    disabled={true}
                />
                <TextField
                    label="kapitał zakładowy"
                    name="sharesCapital"
                    variant="filled"
                    value={`${companyData.state.company.shareCapital} zł`}
                    disabled={true}
                />
                <TextField
                    label="jeden udział:"
                    name="allSharesValue"
                    variant="filled"
                    value={`${companyData.state.company.shareValue} zł`}
                    disabled={true}
                />
            </div>
        </div>
    </div>
}
export default Partners;
