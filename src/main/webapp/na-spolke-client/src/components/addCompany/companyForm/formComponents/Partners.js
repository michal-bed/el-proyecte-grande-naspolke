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
                <input defaultValue={partner.lastNameI}/>
                {checkForSecondSurname(partner.lastNameII)}
                <label>Pierwsze Imię:</label>
                <input defaultValue={partner.firstName}/>
                {checkForSecondName(partner.secondName)}

            </div>
        } else if (partner instanceof PartnerCompany) {
            return <div>
                <label> Nazwa wspólnika:</label>
                <input defaultValue={partner.name}/>
            </div>
        }
    }

    return <div>
        {props.partners.map(partner => (
            <div key={counter++}>
                <div className={styles["partner-separator"]}>Wspólnik {counter + 1}</div>
                {checkForPartnerType(partner)}
                <label>ilość udziałów</label>
                <input defaultValue={partner.sharesCount}/>
                <label>wartość udziałów</label>
                <input defaultValue={partner.sharesValue}/>
            </div>
        ))
        }
    </div>
}
export default Partners;