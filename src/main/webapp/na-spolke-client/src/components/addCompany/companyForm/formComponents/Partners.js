import {IndividualPartner, PartnerCompany,} from "../../../../classes/persons/Partners";
import styles from "./Partners.module.css";
import {Button, TextField} from "@material-ui/core";
import {useState} from "react";
import {populateList} from "../../../../classes/company/Utils";
const Partners = (props) => {

    const [individualPartnersList, setIndividualPartnersList] = useState(props.partners.individualPartners)
    const [companyPartnersList, setCompanyPartnersList] = useState(props.partners.partnerCompanies)


    let counter = 1;
    if (props.partners===null || props.partners.length === 0) {
        return <div>
            <div>Brak danych wspólników!</div>
            <button onClick={addPartnersToForm}>Dodaj wspólnika </button>
        </div>
        //TODO przemyśleć sytuacje braku zarządu
    }

    function handleChangeInput(index, event, list, updateListFunction){
        const value = [...list];
        value[index][event.target.name] = event.target.value;
        updateListFunction(value);
    }

    function addPartnersToForm(){

    }

    function partnerSharesInfo(index, partner) {
        return <div>
            <TextField
                label="ilość udziałów"
                name="sharesCount"
                variant="filled"
                defaultValue={partner.sharesCount}
                onChange={event => handleChangeInput(index, event)}
            />
            <TextField
                label="wartość udziałów (w PLN)"
                name="sharesValue"
                variant="filled"
                defaultValue={partner.sharesValue}
                onChange={event => handleChangeInput(index, event)}
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
        const newIndividualPartnerList =  populateList(individualPartnersList, "individuals");
        const newCompanyPartnerList =  populateList(companyPartnersList, "companies");
        const allIndividualSharesValue = countAllSharesValue(newIndividualPartnerList)
        const allCompanySharesValue = countAllSharesValue(newCompanyPartnerList)
        const newPartners = {individualPartners: newIndividualPartnerList, partnerCompanies: newCompanyPartnerList,
            allSharesValue : allIndividualSharesValue + allCompanySharesValue}
        props.changePage(newPartners, props.pageType, -1)
    }

    return <div>
        {props.partners.individualPartners!==null && props.partners.individualPartners.map((partner, index) => (
            <div key={index}>
                <div className={styles["partner-separator"]}>Wspólnik {counter++}</div>
                <div>
                    <TextField
                        label="Pierwszy człon nazwiska"
                        name="lastNameI"
                        variant="filled"
                        defaultValue={partner.lastNameI}
                        onChange={event => handleChangeInput(index, event, individualPartnersList, setIndividualPartnersList)}
                    />
                    <TextField
                        label="Drugi człon nazwiska"
                        name="lastNameII"
                        variant="filled"
                        defaultValue={partner.lastNameII}
                        onChange={event => handleChangeInput(index, event, individualPartnersList, setIndividualPartnersList)}
                    />
                    <TextField
                        label="Pierwsze imię"
                        name="firstName"
                        variant="filled"
                        defaultValue={partner.firstName}
                        onChange={event => handleChangeInput(index, event, individualPartnersList, setIndividualPartnersList)}
                    />
                    <TextField
                        label="Drugie imię"
                        name="secondName"
                        variant="filled"
                        defaultValue={partner.secondName}
                        onChange={event => handleChangeInput(index, event, individualPartnersList, setIndividualPartnersList)}
                    />
                </div>
                {partnerSharesInfo(index, partner, individualPartnersList, setIndividualPartnersList)}
            </div>
        ))
        }
        {props.partners.partnerCompanies!==null && props.partners.partnerCompanies.map((partner, index) => (
            <div key={index}>
                <div className={styles["partner-separator"]}>Wspólnik {counter++}</div>
                <div>
                    <TextField
                        label="Nazwa wspólnika"
                        name="name"
                        variant="filled"
                        defaultValue={partner.name}
                        onChange={event => handleChangeInput(index, event, companyPartnersList, setCompanyPartnersList)}
                    />
                </div>
                {partnerSharesInfo(index, partner, companyPartnersList, setCompanyPartnersList)}
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