import {useState} from "react";
import styles from "./KrsUserInput.module.css";
import Axios from "axios";
import {TextField} from "@material-ui/core";
import validatePartners from "../companyForm/formComponents/companyOrgans/ValidationCompanyOrgans";
import ValidationKrsUserInput from "./ValidationKrsUserInput";

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
        Axios.get(`http://localhost:8080/add-company/${krsNumber}`)
            .then((response)=> {
            props.addCompanyData(response);
        }).catch(error=>{
            props.addCompanyData(error.response.status);
        });
    }


    return <div className={styles["krs-input-container"]}>
        <form onSubmit={formSubmitHandler}>
            <div><label>Podaj numer KRS spółki</label></div>
            <TextField type="text"
                   placeholder="0000123456"
                   error={ValidationKrsUserInput(krsNumber).hasOwnProperty("krsNumber")}
                   helperText={ValidationKrsUserInput(krsNumber).krsNumber}
                   onChange={krsNumberHandler}/>
            <button type="submit">Pobierz dane spółki</button>
        </form>
    </div>
}

export default KrsUserInput;