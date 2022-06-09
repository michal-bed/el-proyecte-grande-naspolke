import {PartnerCompany, PartnerPerson} from "../../../classes/persons/Partner";
import styles from "./Partners.module.css";
const Partners = (props) => {

    let counter = 0;

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
        if (partner instanceof PartnerPerson) {
            return <div><label>Nazwisko pierwszy człon</label>
                <input defaultValue={partner.LastNameI}/>
                {checkForSecondSurname(partner.LastNameII)}


                <label>Pierwsze Imię:</label>
                <input defaultValue={partner.FirstName}/>
                {checkForSecondName(partner.SecondName)}

            </div>
        } else if (partner instanceof PartnerCompany) {
            return <div>
                <label> Nazwa wspólnika:</label>
                <input defaultValue={partner.Name}/>
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