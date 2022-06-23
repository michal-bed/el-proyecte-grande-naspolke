import styles from "./Partners.module.css";
import {Button} from "@material-ui/core";
import {useReducer} from "react";
import {populateList} from "../../../../../classes/company/Utils";
import {IndividualPartner, PartnerCompany} from "../../../../../classes/persons/Partners";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TextField from '@mui/material/TextField';
import validatePartners from "./ValidationCompanyOrgans";



const actionType = {
    DISPLAY_INDIVIDUAL_PARTNERS : "individuals",
    DISPLAY_COMPANY_PARTNERS : "companies",
    ADD_NEW_COMPANY_PARTNER : "addNewCompanyPartner",
    ADD_NEW_INDIVIDUAL_PARTNER : "addNewIndividualPartner",
    REMOVE_INDIVIDUAL_PARTNER: "removeIndividualPartner",
    REMOVE_COMPANY_PARTNER: "removeCompanyPartner",
    DUPLICATE_INDIVIDUAL_PARTNER: "duplicateIndividualPartner",
    DUPLICATE_COMPANY_PARTNER: "duplicateCompanyPartner",
}

function reducer(state, action){
    switch (action.actionType){
        case actionType.DISPLAY_INDIVIDUAL_PARTNERS:{
            let individualPartners = state.partners.individualPartners;
            individualPartners[action.index][action.event.target.name] = action.event.target.value;
            individualPartners = changeSharesInfo(action, individualPartners);
            return {...state, individualPartners: individualPartners};
        }
        case actionType.DISPLAY_COMPANY_PARTNERS:{
            let partnerCompanies = state.partners.partnerCompanies;
            partnerCompanies[action.index][action.event.target.name] = action.event.target.value;
            partnerCompanies = changeSharesInfo(action, partnerCompanies);
            return {...state, partnerCompanies: partnerCompanies};
        }
        case actionType.ADD_NEW_COMPANY_PARTNER:{
            let partnerCompanies = state.partners.partnerCompanies;
            partnerCompanies.push(action.newPartner);
            return {...state, partnerCompanies: partnerCompanies};
        }
        case actionType.ADD_NEW_INDIVIDUAL_PARTNER:{
            let partnerCompanies = state.partners.individualPartners;
            partnerCompanies.push(action.newPartner);
            return {...state, individualPartners: partnerCompanies};
        }
        case actionType.REMOVE_INDIVIDUAL_PARTNER:{
            let partnerCompanies = state.partners.individualPartners;
            partnerCompanies.splice(action.index, 1)
            return {...state, individualPartners: partnerCompanies};
        }
        case actionType.REMOVE_COMPANY_PARTNER: {
            let partnerCompanies = state.partners.partnerCompanies;
            partnerCompanies.splice(action.index, 1)
            return {...state, partnerCompanies: partnerCompanies};
        }
        case actionType.DUPLICATE_INDIVIDUAL_PARTNER: {
            let partnerCompanies = state.partners.individualPartners;
            const newDuplicatePartner = new IndividualPartner({
                firstName: "",
                secondName: "",
                lastNameI: "",
                lastNameII: "",
                sharesCount: partnerCompanies[action.index].sharesCount,
                sharesValue: partnerCompanies[action.index].sharesValue
            })
            partnerCompanies.splice(action.index+1,0,newDuplicatePartner);
            return {...state, individualPartners: partnerCompanies}
        }
        case actionType.DUPLICATE_COMPANY_PARTNER: {
            let partnerCompanies = state.partners.partnerCompanies;
            const newDuplicatePartner = new PartnerCompany({
                name: "",
                sharesCount: partnerCompanies[action.index].sharesCount,
                sharesValue: partnerCompanies[action.index].sharesValue
            })
            partnerCompanies.splice(action.index+1,0,newDuplicatePartner);
            return {...state, partnerCompanies: partnerCompanies}
        }
        default: return {...state}
    }
}


function changeSharesInfo(action, value){
    if (action.event.target.name==="sharesCount"){
        value[action.index]["sharesValue"] = action.event.target.value * action.shareValue
    } else if (action.event.target.name==="sharesValue") {
        value[action.index]["sharesCount"] = action.event.target.value / action.shareValue
    }
    return value;
}

const Partners = (props) => {
    const [state, dispatch] = useReducer(reducer, { partners: props.partners })

    let counter = 1;
    if (props.partners===null || props.partners.length === 0) {
        return <div>
            <div>Brak danych wspólników!</div>
            <button onClick={addEmptyPartnerCompanyToForm}>Dodaj wspólnika </button>
        </div>
    }

    function checkForErrors(){
        for (let i = 0; i < state.partners.individualPartners.length; i++) {
            let errors = validatePartners(state.partners.individualPartners[i])
            if (Object.keys(errors).length > 2){
                return true;
            }
        }
        for (let i = 0; i < state.partners.partnerCompanies.length; i++) {
            let errors = validatePartners(state.partners.partnerCompanies[i])
            if (Object.keys(errors).length > 3){
                return true;
            }
        }
        return false;
    }

    function handleChangeInput(index, event, list){
        const action = {
            actionType: list,
            index: index,
            event: event,
            shareValue: props.shareValue
        }
        dispatch(action)
    }

    function addEmptyPartnerCompanyToForm(){
        let newCompanyPartner = new PartnerCompany({name:"",
            sharesValue : parseInt(props.shareCapital) - countAllSharesValues(),
            sharesCount : (parseInt(props.shareCapital) / parseInt(props.shareValue)) - countAllSharesCount()})
        const action = {
            actionType : actionType.ADD_NEW_COMPANY_PARTNER,
            newPartner : newCompanyPartner
            }
        dispatch(action);
    }
    function addEmptyIndividualToForm(){
        let newCompanyPartner = new PartnerCompany({
            firstname:"",
            secondName:"",
            lastNameI:"",
            lastNameII:"",
            sharesValue : parseInt(props.shareCapital) - countAllSharesValues(),
            sharesCount : (parseInt(props.shareCapital) / parseInt(props.shareValue)) - countAllSharesCount()})
        const action = {
            actionType : actionType.ADD_NEW_INDIVIDUAL_PARTNER,
            newPartner : newCompanyPartner
        }
        dispatch(action);
    }

       function countAllSharesCount(){
        let sharesCount = 0;
        for (let i = 0; i < state.partners.individualPartners.length; i++) {
            sharesCount += parseInt(state.partners.individualPartners[i].sharesCount);
        }
        for (let i = 0; i < state.partners.partnerCompanies.length; i++) {
            sharesCount += parseInt(state.partners.partnerCompanies[i].sharesCount);
        }
        return sharesCount;
    }

    function countAllSharesValues(){
        return parseInt(countPartnersListSharesValue(state.partners.individualPartners)) + parseInt(countPartnersListSharesValue(state.partners.partnerCompanies))
    }

    function countPartnersListSharesValue(newIndividualPartnerList) {
        let sharesValue = 0;
        for (let i = 0; i < newIndividualPartnerList.length; i++) {
            sharesValue += parseInt(newIndividualPartnerList[i].sharesValue);
        }
        return sharesValue;
    }

    function setNewPartnersData() {
        const newIndividualPartnerList = populateList(state.partners.individualPartners, "individuals");
        const newCompanyPartnerList = populateList(state.partners.partnerCompanies, "companies");
        const allIndividualSharesValue = countPartnersListSharesValue(newIndividualPartnerList)
        const allCompanySharesValue = countPartnersListSharesValue(newCompanyPartnerList)
        const allSharesCount = countAllSharesCount()
        return {
            individualPartners: newIndividualPartnerList, partnerCompanies: newCompanyPartnerList,
            allSharesValue: allIndividualSharesValue + allCompanySharesValue, allSharesCount: allSharesCount
        };
    }

    function switchPrevPage(){
        const newPartners = setNewPartnersData();
        const hasErrors = checkForErrors();
        props.changePage(newPartners, props.pageType, -1, hasErrors)
    }

    function saveCompanyData(){
        const newPartners = setNewPartnersData();
        const hasErrors = checkForErrors();
        props.saveCompanyData(newPartners, hasErrors);
    }

    function handlePartnersList(index, actionType){
        dispatch({index:index, actionType:actionType})
    }

    function partnerSharesInfo(index, partner, listType) {
        return <div>
            <TextField
                label="ilość udziałów"
                name="sharesCount"
                variant="filled"
                type="number"
                value={partner.sharesCount}
                error={validatePartners({sharesCount : partner.sharesCount}).hasOwnProperty("sharesCount")}
                helperText={validatePartners({sharesCount : partner.sharesCount}).sharesCount}
                onChange={event => handleChangeInput(index, event, listType)}
            />
            <TextField
                label="wartość udziałów (w PLN)"
                name="sharesValue"
                variant="filled"
                type="number"
                value={partner.sharesValue}
                error={validatePartners({sharesValue : partner.sharesValue}).hasOwnProperty("sharesValue")}
                helperText={validatePartners({sharesValue : partner.sharesValue}).sharesValue}
                onChange={event => handleChangeInput(index, event, listType)}
            />
        </div>
    }


    return <div>
        {state.partners.individualPartners!==null && state.partners.individualPartners.map((partner, index) => (
            <div key={index}>
                <div className={styles["partner-separator"]}>Wspólnik {counter++}</div>
                <div>
                    <TextField
                        label="Pierwszy człon nazwiska"
                        name="lastNameI"
                        variant="filled"
                        value={partner.lastNameI}
                        error={validatePartners({lastNameI: partner.lastNameI}).hasOwnProperty("lastNameI")}
                        helperText={validatePartners({lastNameI: partner.lastNameI}).lastNameI}
                        onChange={event => handleChangeInput(index, event, actionType.DISPLAY_INDIVIDUAL_PARTNERS)}
                    />
                    <TextField
                        label="Drugi człon nazwiska"
                        name="lastNameII"
                        variant="filled"
                        value={partner.lastNameII}
                        error={validatePartners({lastNameII: partner.lastNameII}).hasOwnProperty("lastNameII")}
                        helperText={validatePartners({lastNameII: partner.lastNameII}).lastNameII}
                        onChange={event => handleChangeInput(index, event, actionType.DISPLAY_INDIVIDUAL_PARTNERS)}
                    />
                    <TextField
                        label="Pierwsze imię"
                        name="firstName"
                        variant="filled"
                        value={partner.firstName}
                        error={validatePartners({firstName : partner.firstName}).hasOwnProperty("firstName")}
                        helperText={validatePartners({firstName : partner.firstName}).firstName}
                        onChange={event => handleChangeInput(index, event, actionType.DISPLAY_INDIVIDUAL_PARTNERS)}
                    />
                    <TextField
                        label="Drugie imię"
                        name="secondName"
                        variant="filled"
                        value={partner.secondName}
                        error={validatePartners({secondName : partner.secondName}).hasOwnProperty("secondName")}
                        helperText={validatePartners({secondName : partner.secondName}).secondName}
                        onChange={event => handleChangeInput(index, event, actionType.DISPLAY_INDIVIDUAL_PARTNERS)}
                    />
                </div>
                {partnerSharesInfo(index, partner, actionType.DISPLAY_INDIVIDUAL_PARTNERS)}
                <div>
                    <Button variant="outlined" startIcon={<PersonRemoveIcon />} onClick={()=> handlePartnersList(index, actionType.REMOVE_INDIVIDUAL_PARTNER) }>Usuń</Button>
                    <Button variant="outlined" startIcon={<PersonAddIcon /> } onClick={()=>handlePartnersList(index, actionType.DUPLICATE_INDIVIDUAL_PARTNER)}>Powiel</Button>
                </div>
            </div>
        ))
        }
        {state.partners.partnerCompanies!==null && state.partners.partnerCompanies.map((partner, index) => (
            <div key={index}>
                <div className={styles["partner-separator"]}>Wspólnik {counter++}</div>
                <div>
                    <TextField
                        fullWidth
                        label="Nazwa wspólnika *"
                        name="name"
                        variant="filled"
                        value={partner.name}
                        error={validatePartners({name : partner.name}).hasOwnProperty("name")}
                        helperText={validatePartners({name : partner.name}).name}
                        onChange={event => handleChangeInput(index, event, actionType.DISPLAY_COMPANY_PARTNERS)}
                    />
                </div>
                {partnerSharesInfo(index, partner, actionType.DISPLAY_COMPANY_PARTNERS)}
                <div>
                    <Button variant="outlined" startIcon={<PersonRemoveIcon />} onClick={()=> {
                        handlePartnersList(index, actionType.REMOVE_COMPANY_PARTNER) }} >Usuń</Button>
                    <Button variant="outlined" startIcon={<PersonAddIcon />} onClick={()=>handlePartnersList(index, actionType.DUPLICATE_COMPANY_PARTNER)}>Powiel</Button>
                </div>
            </div>
        ))
        }
        <div>Podsumowanie:</div>
        <div>
            <TextField
                error={parseInt(props.shareCapital) / parseInt(props.shareValue) !== countAllSharesCount()}
                helperText={"liczba udziałów jest nieprawidłowa"}
                label="wpisana ilość udziałów"
                name="allSharesCount"
                variant="filled"
                value={countAllSharesCount()}
                disabled={true}
            />
            <TextField
                error={props.shareCapital !== countAllSharesValues()}
                label="łączna wartość udziałów"
                helperText={"wartosć udziałów jest nieprawidłowa"}
                name="sharesCapital"
                variant="filled"
                value={`${countAllSharesValues()} zł`}
                disabled={true}
            />
        </div>
        <div>
            <TextField
                label="łączna ilość udziałów"
                name="allSharesCount"
                variant="filled"
                defaultValue={parseInt(props.shareCapital) / parseInt(props.shareValue)}
                disabled={true}
            />
            <TextField
                label="kapitał zakładowy"
                name="sharesCapital"
                variant="filled"
                value={`${props.shareCapital} zł`}
                disabled={true}
            />
            <TextField
                label="jeden udział:"
                name="allSharesValue"
                variant="filled"
                value={`${props.shareValue} zł`}
                disabled={true}
            />
        </div>
        <div>
            <div>
                <div>Dodaj wspólnika:</div>
                <Button onClick={addEmptyPartnerCompanyToForm}>osoba prawna</Button><Button onClick={addEmptyIndividualToForm}>osoba fizyczna</Button>
            </div>
        </div>
        <div>
            <Button disabled={props.prev} onClick={switchPrevPage}>Wstecz</Button>
            <Button disabled={props.next}>Dalej</Button>
            <Button onClick={saveCompanyData}>Zapisz</Button>
        </div>
    </div>
}
export default Partners;