import styles from "./Partners.module.css";
import {Button, TextField} from "@material-ui/core";
import {useReducer, useEffect } from "react";
import {populateList} from "../../../../classes/company/Utils";


const listType = {
    INDIVIDUAL_PARTNERS : "individuals",
    COMPANY_PARTNERS : "companies"
}

function reducer(state, action){
    switch (action.listType){
        case listType.INDIVIDUAL_PARTNERS:{
            let individualPartners = state.partners.individualPartners;
            individualPartners[action.index][action.event.target.name] = action.event.target.value;
            individualPartners = changeSharesInfo(action, individualPartners)
            return {...state, individualPartners: individualPartners}
        }
        case listType.COMPANY_PARTNERS:{
            let partnerCompanies = state.partners.partnerCompanies;
            partnerCompanies[action.index][action.event.target.name] = action.event.target.value;
            partnerCompanies = changeSharesInfo(action, partnerCompanies)
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
            <button onClick={addPartnersToForm}>Dodaj wspólnika </button>
        </div>
        //TODO przemyśleć sytuacje braku zarządu
    }


    function handleChangeInput(index, event, list){
        const action = {
            listType: list,
            index: index,
            event: event,
            shareValue: props.shareValue
        }
        dispatch(action)
    }

    function addPartnersToForm(){

    }

    function partnerSharesInfo(index, partner, listType) {
        return <div>
            <TextField
                label="ilość udziałów"
                name="sharesCount"
                variant="filled"
                type="number"
                value={partner.sharesCount}
                onChange={event => handleChangeInput(index, event, listType)}
            />
            <TextField
                label="wartość udziałów (w PLN)"
                name="sharesValue"
                variant="filled"
                type="number"
                value={partner.sharesValue}
                onChange={event => handleChangeInput(index, event, listType)}
            />
        </div>
    }

    function countAllSharesValue(newIndividualPartnerList) {
        let sharesValue = 0;
        for (let i = 0; i < newIndividualPartnerList.length; i++) {
            sharesValue += newIndividualPartnerList[i].sharesValue;
        }
        return sharesValue;
    }

    function switchPrevPage(){
        const newIndividualPartnerList =  populateList(state.partners.individualPartners, "individuals");
        const newCompanyPartnerList =  populateList(state.partners.partnerCompanies, "companies");
        const allIndividualSharesValue = countAllSharesValue(newIndividualPartnerList)
        const allCompanySharesValue = countAllSharesValue(newCompanyPartnerList)
        const newPartners = {individualPartners: newIndividualPartnerList, partnerCompanies: newCompanyPartnerList,
            allSharesValue : allIndividualSharesValue + allCompanySharesValue}
        props.changePage(newPartners, props.pageType, -1)
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
                        onChange={event => handleChangeInput(index, event, listType.INDIVIDUAL_PARTNERS)}
                    />
                    <TextField
                        label="Drugi człon nazwiska"
                        name="lastNameII"
                        variant="filled"
                        value={partner.lastNameII}
                        onChange={event => handleChangeInput(index, event, listType.INDIVIDUAL_PARTNERS)}
                    />
                    <TextField
                        label="Pierwsze imię"
                        name="firstName"
                        variant="filled"
                        value={partner.firstName}
                        onChange={event => handleChangeInput(index, event, listType.INDIVIDUAL_PARTNERS)}
                    />
                    <TextField
                        label="Drugie imię"
                        name="secondName"
                        variant="filled"
                        value={partner.secondName}
                        onChange={event => handleChangeInput(index, event, listType.INDIVIDUAL_PARTNERS)}
                    />
                </div>
                {partnerSharesInfo(index, partner, listType.INDIVIDUAL_PARTNERS)}
            </div>
        ))
        }
        {state.partners.partnerCompanies!==null && state.partners.partnerCompanies.map((partner, index) => (
            <div key={index}>
                <div className={styles["partner-separator"]}>Wspólnik {counter++}</div>
                <div>
                    <TextField
                        label="Nazwa wspólnika"
                        name="name"
                        variant="filled"
                        value={partner.name}
                        onChange={event => handleChangeInput(index, event, listType.COMPANY_PARTNERS)}
                    />
                </div>
                {partnerSharesInfo(index, partner, listType.COMPANY_PARTNERS)}
            </div>
        ))
        }
        <div>
            <Button disabled={props.prev} onClick={switchPrevPage}>Wstecz</Button>
            <Button disabled={props.next}>Dalej</Button>
            <Button >Zapisz</Button>
        </div>
    </div>
}
export default Partners;