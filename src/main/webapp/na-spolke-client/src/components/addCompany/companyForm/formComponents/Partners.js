import {IndividualPartner, PartnerCompany,} from "../../../../classes/persons/Partners";
import styles from "./Partners.module.css";
import {Button, TextField} from "@material-ui/core";
const Partners = (props) => {

    let counter = 0;
    if (props.partners===null || props.partners.length === 0) {
        return <div>
            <div>Brak danych wspólników!</div>
            <button onClick={addPartnersToForm}>Dodaj wspólnika </button>
        </div>
        //TODO przemyśleć sytuacje braku zarządu
    }

    function addPartnersToForm(){

    }

    function checkForData(additionalData, label) {
        return <div>
            <label>{label}</label>
            <input defaultValue={additionalData===null ? "" : additionalData}/>
        </div>

    }


    function checkForPartnerType(partner) {
        if (partner.hasOwnProperty("lastNameI")) {
            return <div>
                <TextField
                    label="Pierwszy człon nazwiska"
                    name="lastNameI"
                    variant="filled"
                    defaultValue={partner.lastNameI === null ? "" : partner.lastNameI}
                />
                <TextField
                    label="Drugi człon nazwiska"
                    name="lastNameII"
                    variant="filled"
                    defaultValue={partner.lastNameII!== null ? partner.lastNameII : null}
                />
                <TextField
                    label="Pierwsze imię"
                    name="firstName"
                    variant="filled"
                    defaultValue={partner.firstName}
                />
                <TextField
                    label="Drugie imię"
                    name="secondName"
                    variant="filled"
                    defaultValue={partner.secondName!== null ? partner.secondName : null}
                />
            </div>
        } else {
            return <div>
                <TextField
                    label="Nazwa wspólnika"
                    name="name"
                    variant="filled"
                    defaultValue={partner.name}
                />
            </div>
        }
    }

    function switchPrevPage(){
        props.changePage(null, props.pageType, -1)
    }

    return <div>
        {props.partners.individualPartners!==null && props.partners.individualPartners.map(partner => (
            <div key={counter++}>
                <div className={styles["partner-separator"]}>Wspólnik {counter + 1}</div>
                {checkForPartnerType(partner)}
                <TextField
                    label="ilość udziałów"
                    name="sharesCount"
                    variant="filled"
                    defaultValue={partner.sharesCount}
                />
                <TextField
                    label="wartość udziałów (w PLN)"
                    name="sharesValue"
                    variant="filled"
                    defaultValue={partner.sharesValue}
                />
            </div>
        ))
        }
        {props.partners.partnerCompanies!==null && props.partners.partnerCompanies.map(partner => (
            <div key={counter++}>
                <div className={styles["partner-separator"]}>Wspólnik {counter + 1}</div>
                {checkForPartnerType(partner)}
                <TextField
                    label="ilość udziałów"
                    name="sharesCount"
                    variant="filled"
                    defaultValue={partner.sharesCount}
                />
                <TextField
                    label="wartość udziałów (w PLN)"
                    name="sharesValue"
                    variant="filled"
                    defaultValue={partner.sharesValue}
                />
            </div>
        ))
        }
        <div>
            <Button disabled={props.prev} onClick={switchPrevPage}>Wstecz</Button>
            <Button disabled={props.next}>Dalej</Button>
            <Button>Zapisz</Button>
        </div>
    </div>
}
export default Partners;