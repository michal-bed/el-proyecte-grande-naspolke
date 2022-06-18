import {IndividualPartner, PartnerCompany,} from "../../../../classes/persons/Partners";
import styles from "./Partners.module.css";
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
            return <div><label>Pierwszy człon nazwiska:</label>
                <input defaultValue={partner.lastNameI}/>
                {checkForData(partner.lastNameII, "Drugi człon nazwiska:")}
                <label>Pierwsze imię:</label>
                <input defaultValue={partner.firstName}/>
                {checkForData(partner.secondName, "Drugie imię:")}
            </div>
        } else {
            return <div>
                <label> Nazwa wspólnika:</label>
                <input defaultValue={partner.name}/>
            </div>
        }
    }

    return <div>
        {props.partners.individualPartners!==null && props.partners.individualPartners.map(partner => (
            <div key={counter++}>
                <div className={styles["partner-separator"]}>Wspólnik {counter + 1}</div>
                {checkForPartnerType(partner)}
                <label>ilość udziałów:</label>
                <input defaultValue={partner.sharesCount}/>
                <label>wartość udziałów (w PLN):</label>
                <input defaultValue={partner.sharesValue}/>
            </div>
        ))
        }
        {props.partners.partnerCompanies!==null && props.partners.partnerCompanies.map(partner => (
            <div key={counter++}>
                <div className={styles["partner-separator"]}>Wspólnik {counter + 1}</div>
                {checkForPartnerType(partner)}
                <label>ilość udziałów:</label>
                <input defaultValue={partner.sharesCount}/>
                <label>wartość udziałów (w PLN):</label>
                <input defaultValue={partner.sharesValue}/>
            </div>
        ))
        }
    </div>
}
export default Partners;