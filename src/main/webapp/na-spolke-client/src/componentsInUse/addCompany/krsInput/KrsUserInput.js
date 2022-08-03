import React from "react";
import {useState} from "react";
import styles from "./KrsUserInput.module.css";
import Axios from "axios";
import {TextField} from "@material-ui/core";
import ValidationKrsUserInput from "./ValidationKrsUserInput";
import axios from "../../../api/axios"

const KrsUserInput = (props)=>{
    const [krsNumber, setKrsNumber] = useState("");
    const [isValid, setIsValid] = useState(false);


    const krsNumberHandler = event => {
        const userKrsInput = event.target.value.trim();
        setKrsNumber(userKrsInput);
        const onlyNum = /^\d+$/.test(userKrsInput)
        if(userKrsInput.length === 10 && onlyNum){
            setIsValid(true);
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
        axios.get(`add-company/${krsNumber}`)
            .then((response)=> {
            props.addCompanyData(response);
            console.log(response.status)
        }).catch(error=>{
            console.log(error.response.data.companyName)
            if(error.response.status===422){
                props.addCompanyData(error.response.status, error.response.data.companyName);
            } else {
                props.addCompanyData(error.response.status);
            }
        });
    }


    return <div className={styles["krs-input-container"]}>
        <form onSubmit={formSubmitHandler}>
            <div><label>Podaj numer KRS spółki</label></div>
            <TextField
                type="tel"
                placeholder="0000123456"
                error={ValidationKrsUserInput(krsNumber).hasOwnProperty("krsNumber")}
                helperText={ValidationKrsUserInput(krsNumber).krsNumber}
                onChange={krsNumberHandler}/>
            <button type="submit" >Pobierz dane spółki</button>
        </form>
    </div>
}

export default KrsUserInput;