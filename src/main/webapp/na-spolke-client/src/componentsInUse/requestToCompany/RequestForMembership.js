import React, {useState} from "react";
import styles from './RequestToCompany.module.css';
import CompanyInfo from "./CompanyInfo";
import ModalTop from "../modal/ModalTop";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {Grid, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";

const RequestForMembership = () => {

    const axiosPrivate = useAxiosPrivate();

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
        axiosPrivate.get(`/find-company-to-membership-request/${krsNumber}`)
            .then(response => {
            if (response.status === 200) {
                setCompanyData(response.data);
                setShowMembershipComponent(true);
            } else {
                setCompanyNotFound(true);
                setTimeout(backToPreviousState, 4000);
                throw new Error("Can't find company");
            }
        }).catch((error) => console.log(error));
    }

    return (
        <div className="request-form-container"><hr/>
            <Typography className="request-form-container">
                <div className={styles.requestFormBox}>
                    <form onSubmit={findCompany}>
                        <h3 className="form-label">Podaj numer KRS spółki:</h3><hr/>
                        <Grid style={{display: "flex"}}>
                            <TextField id="outlined-number" label="Number" type="number" InputLabelProps={{shrink: true}}
                                       className="form-input" value={krsNumber} required={true}
                                onChange={(e) => setKrsNumber(e.target.value)}/>
                            <Button type="submit">Znajdź spółkę</Button>
                        </Grid>
                    </form>
                </div>
            </Typography><hr/>
            <Typography className="company-info-container">
                <div className="request-form-modal">
                    {showMembershipComponent && <CompanyInfo companyData={companyData} krsNumber={krsNumber}/>}
                    {companyNotFound && <ModalTop info={successfullyRequestMessage}/>}
                </div>
            </Typography>
        </div>
    )
}

export default RequestForMembership
