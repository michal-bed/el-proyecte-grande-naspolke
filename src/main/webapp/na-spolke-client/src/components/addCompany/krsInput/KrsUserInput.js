import React from "react";
import {useState} from "react";
import styles from "./KrsUserInput.module.css";
import Axios from "axios";

const KrsUserInput = (props)=>{
    const [krsNumber, setKrsNumber] = useState("");
    const [isValid, setIsValid] = useState(false);


    const krsNumberHandler = event => {
        const userKrsInput = event.target.value.trim();
        const onlyNum = /^\d+$/.test(userKrsInput)
        if(userKrsInput.length === 10 && onlyNum){
            setIsValid(true);
            setKrsNumber(userKrsInput);
        } else {
            setIsValid(false);
        }
    }

    const formSubmitHandler = (event) => {
      event.preventDefault();
      if(isValid){
          getDataFromKrsAPI()
      }
    }

    const getDataFromKrsAPI = () => {
        Axios.get(`https://api-krs.ms.gov.pl/api/krs/OdpisAktualny/${krsNumber}?rejestr=p&format=json`)
            .then((response)=> {
            props.addCompanyData(response);
        }).catch(error=>{
            console.log(error.message)
        });
    }


    return <div className={styles["krs-input-container"]}>
        <form onSubmit={formSubmitHandler}>
            <div><label>Podaj numer KRS spółki</label></div>
            <input type="text"
                   placeholder="0000123456"
                   className={`${styles["krs-input-field"]} ${isValid ? "correct" : "incorrect"}`}
                   onChange={krsNumberHandler}/>
            <button type="submit">Pobierz dane spółki</button>
        </form>
    </div>
}

export default KrsUserInput;