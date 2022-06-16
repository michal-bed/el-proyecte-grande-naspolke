import {IndividualPartner, PartnerCompany,} from "../../../classes/persons/Partners";
import {checkForDataToDisplay} from "../../../classes/company/Utils";
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

    function checkForSecondSurname(SecondSurname) {
        if (SecondSurname) {
            return <div>
                <label>Drugi Człon:</label>
                <input defaultValue={SecondSurname}/>
            </div>
        }
    }

    function checkForSecondName(SecondName) {
        if (SecondName) {
            return <div>
                <label>Drugie Imię:</label>
                <input defaultValue={SecondName}/>
            </div>
        }
    }

    function checkForPartnerType(partner) {
        if (partner instanceof IndividualPartner) {
            return <div><label>Nazwisko pierwszy człon</label>
                <input defaultValue={checkForDataToDisplay(partner.lastNameI)}/>
                {checkForSecondSurname(checkForDataToDisplay(partner.lastNameII))}


                <label>Pierwsze Imię:</label>
                <input defaultValue={checkForDataToDisplay(partner.firstName)}/>
                {checkForSecondName(checkForDataToDisplay(partner.secondName))}

            </div>
        } else if (partner instanceof PartnerCompany) {
            return <div>
                <label> Nazwa wspólnika:</label>
                <input defaultValue={checkForDataToDisplay(partner.name)}/>
            </div>
        }
    }

    return <div>
        {props.partners.map(partner => (
            <div key={counter++}>
                <div className={styles["partner-separator"]}>Wspólnik {counter + 1}</div>
                {checkForPartnerType(partner)}
                <label>ilość udziałów</label>
                <input defaultValue={checkForDataToDisplay(partner.sharesCount)}/>
                <label>wartość udziałów</label>
                <input defaultValue={checkForDataToDisplay(partner.sharesValue)}/>
            </div>
        ))
        }
    </div>
}
export default Partners;