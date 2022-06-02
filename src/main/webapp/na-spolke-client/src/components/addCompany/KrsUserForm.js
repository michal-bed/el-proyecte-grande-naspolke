import {useState} from "react";

const KrsUserForm = ()=>{
    const [krsNumber, setKrsNumber] = useState("");
    const [isValid, setIsValid] = useState(true);

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
        console.log(krsNumber + "\n" + isValid);
    }

    return <form onSubmit={formSubmitHandler}>
        <div><label>Podaj numer KRS spółki</label></div>
        <input type="text"
               placeholder="0000123456"
               onChange={krsNumberHandler}/>
        <button type="submit">Pobierz dane spółki</button>
    </form>

}

export default KrsUserForm;