import styles from "./BaseInfo.module.css";
import {Button, TextField} from "@material-ui/core";
import {useState} from "react";
import validateBaseInfo from "./ValidateBaseInfo"

const inputType = {
    COMPANY_NAME : "companyName",
    NIP_NUMBER : "nipNumber",
    REGON_NUMBER : "regonNumber",
    SHARE_CAPITAL_INPUT : "shareCapitalInput"
}

const BaseInfo = (props) => {
    const [companyName, setCompanyName] = useState(props.baseInfo === null ? "" : props.baseInfo.companyName)
    const [nipInput, setNipInput] = useState(props.baseInfo === null ? "" : props.baseInfo.nip)
    const [regonInput, setRegonInput] = useState(props.baseInfo === null ? "" : props.baseInfo.regon.slice(0,9))
    const [shareCapitalInput, setShareCapitalInput] = useState(props.baseInfo === null ? "" : props.baseInfo.shareCapital)

    function checkForErrors() {
        const dataToCheck = [{"companyName": companyName}, {"nipInput": nipInput}, {"regonInput": regonInput}, {"shareCapitalInput": shareCapitalInput}]
        const keysToCheck = ["companyName", "nipInput", "regonInput", "shareCapitalInput"]
        for (let i = 0; i < dataToCheck.length; i++) {
            const errors = validateBaseInfo(dataToCheck[i])
            if (Object.keys(errors).includes(keysToCheck[i])) {
                return true
            }
        }
        return false;
    }

    function switchPage(){
        const baseInfo = {companyName: companyName,
            krsNumber:props.baseInfo.krsNumber,
            nip: nipInput,
            regon: regonInput,
            shareCapital: shareCapitalInput}
        const isError = checkForErrors()
        props.changePage(baseInfo, props.pageType, 1, isError)
    }

    function handleChangeInput(e){
        switch (e.target.name) {
            case "companyName":setCompanyName(e.target.value); break
            case "nip":setNipInput(e.target.value); break
            case "regon":setRegonInput(e.target.value); break
            case "shareCapital":setShareCapitalInput(e.target.value); break
        }
    }

    return <div className={"base-info"}>
        <div>
            <TextField
            label="Nazwa spółki"
            name="companyName"
            variant="filled"
            value={companyName}
            error={validateBaseInfo({companyName}).hasOwnProperty("companyName")}
            helperText={validateBaseInfo({companyName}).companyName}
            onChange={event => handleChangeInput(event)}
            />
        </div>
        <TextField
            label="NIP"
            name="nip"
            variant="filled"
            value={nipInput}
            error={validateBaseInfo({nipInput}).hasOwnProperty("nipInput")}
            helperText={validateBaseInfo({nipInput}).nipInput}
            onChange={event => handleChangeInput(event)}
        />
        <TextField
            label="REGON"
            name="regon"
            variant="filled"
            value={regonInput}
            error={validateBaseInfo({regonInput}).hasOwnProperty("regonInput")}
            helperText={validateBaseInfo({regonInput}).regonInput}
            onChange={event => handleChangeInput(event)}
        />
        <TextField
            label="Kapitał zakładowy (w PLN)"
            name="shareCapital"
            variant="filled"
            value={shareCapitalInput}
            error={validateBaseInfo({shareCapitalInput}).hasOwnProperty("shareCapitalInput")}
            helperText={validateBaseInfo({shareCapitalInput}).shareCapitalInput}
            onChange={event => handleChangeInput(event)}
        />
        <div>
            <Button disabled={props.prev} >Wstecz</Button>
            <Button disabled={props.next} onClick={switchPage}>Dalej</Button>
        </div>
    </div>
}
export default BaseInfo;
