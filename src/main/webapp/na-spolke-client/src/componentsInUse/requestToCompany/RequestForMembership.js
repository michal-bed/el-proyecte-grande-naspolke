import React, {useState} from "react";
import styles from './RequestToCompany.module.css';
import CompanyInfo from "./CompanyInfo";
import ModalTop from "../modal/ModalTop";

const RequestForMembership = () => {

    const successfullyRequestMessage = {
        title: "Nie znaleziono spółki",
        text: "Spółka o podanym przez Ciebie numerze KRS nie figuruje w naszej bazie danych."
    }

    const [companyNotFound, setCompanyNotFound] = useState(false);
    const backToPreviousState = () => setCompanyNotFound(false);

    const [krsNumber, setKrsNumber] = useState("");
    const [companyData, setCompanyData] = useState("");
    const [showMembershipComponent, setShowMembershipComponent] = useState(false);

    const findCompany = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/find-company-to-membership-request/${krsNumber}`)
            .then(response => {
            if (response.status === 200) {
                response.json()
                    .then(data => {setCompanyData(data);
                    console.log(data)})
                setShowMembershipComponent(true);
            } else {
                setCompanyNotFound(true);
                setTimeout(backToPreviousState, 4000);
                throw new Error("Can't find company");
            }
        }).catch(() => console.log("Error!"));
    }

    return (
        <div className="request-form-container">
            <h3 className={styles.requestFormHeadline}>Dołącz do spółki</h3>
                <div className={styles.requestFormBox}>
                    <form onSubmit={findCompany}>
                        <label className="form-label">Podaj numer KRS spółki:</label>
                            <input className="form-input" type="text" value={krsNumber} required={true}
                              onChange={(e) => setKrsNumber(e.target.value)}/>
                        <button type="submit" className="btn btn-success">Znajdź spółkę</button>
                    </form>
                </div>
            <div className="request-form-modal">
                {showMembershipComponent && <CompanyInfo companyData={companyData} krsNumber={krsNumber}/>}
                {companyNotFound && <ModalTop info={successfullyRequestMessage}/>}
            </div>
        </div>
    )
}

export default RequestForMembership