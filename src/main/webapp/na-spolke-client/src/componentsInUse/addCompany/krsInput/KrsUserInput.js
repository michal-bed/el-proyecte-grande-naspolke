import React, {useLayoutEffect} from "react";
import {useState} from "react";
import styles from "./KrsUserInput.module.css";
import Axios from "axios";
import {TextField} from "@material-ui/core";
import ValidationKrsUserInput from "./ValidationKrsUserInput";
import {CircularProgress, Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";

const KrsUserInput = (props)=>{
    const [krsNumber, setKrsNumber] = useState("");
    const [isValid, setIsValid] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    useLayoutEffect(() => {
        let registrationForm = document.getElementById("input-krs-number");
        if (isLoading) {
            registrationForm.style.opacity = "0.5";
        }
        if (!isLoading) {
            registrationForm.style.opacity = "1";
        }
    }, [isLoading]);

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
        setIsLoading(true);
        Axios.get(`http://localhost:8080/add-company/${krsNumber}`)
            .then((response)=> {
                setIsLoading(false);
                props.addCompanyData(response);
        }).catch(error=>{
            setIsLoading(false);
            props.addCompanyData(error.response.status);
        });
    }

    // return (
    //     <div id="input-krs-number" className={styles["krs-input-container"]}>
    //         <form onSubmit={formSubmitHandler}>
    //             <div><label>Podaj numer KRS spółki</label></div>
    //             <TextField type="number"
    //                    placeholder="0000123456"
    //                    error={ValidationKrsUserInput(krsNumber).hasOwnProperty("krsNumber")}
    //                    helperText={ValidationKrsUserInput(krsNumber).krsNumber}
    //                    onChange={krsNumberHandler}/>
    //             <button type="submit" >Pobierz dane spółki</button>
    //         </form>
    //     </div>
    // )
    return (
        <Typography className="form-label-container">
            <div id="input-krs-number" className={styles["krs-input-container"]}>
                <form onSubmit={formSubmitHandler}>
                    <h2>Podaj numer KRS spółki:</h2>
                    <Grid style={{display: "flex"}}><hr/>
                        <TextField type="number"
                                   label="Numer KRS"
                                   placeholder="0000123456"
                                   error={ValidationKrsUserInput(krsNumber).hasOwnProperty("krsNumber")}
                                   helperText={ValidationKrsUserInput(krsNumber).krsNumber}
                                   onChange={krsNumberHandler}/>
                        {isLoading ?
                            <CircularProgress style={{position: 'absolute', top: '45%', left: '58%'}} color="black"/> :
                            <Button type="submit">Pobierz dane spółki</Button>
                        }
                    </Grid>
                </form>
            </div>
        </Typography>
    )
}

export default KrsUserInput;
