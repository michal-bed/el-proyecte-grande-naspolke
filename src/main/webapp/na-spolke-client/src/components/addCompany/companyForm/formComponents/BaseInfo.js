import styles from "./BaseInfo.module.css";
import {Button, TextField} from "@material-ui/core";
import {useState} from "react";

const BaseInfo = (props) => {
    const [companyName, setCompanyName] = useState(props.baseInfo === null ? "" : props.baseInfo.companyName)
    const [nipInput, setNipInput] = useState(props.baseInfo === null ? "" : props.baseInfo.nip)
    const [regonInput, setRegonInput] = useState(props.baseInfo === null ? "" : props.baseInfo.regon)
    const [shareCapitalInput, setShareCapitalInput] = useState(props.baseInfo === null ? "" : props.baseInfo.shareCapital)

    function switchPage(){
        const baseInfo = {companyName: companyName,
            krsNumber:props.baseInfo.krsNumber,
            nip: nipInput,
            regon: regonInput,
            shareCapital: shareCapitalInput}
        props.changePage(baseInfo, props.pageType, 1)
    }

    function handleChangeInput(e){
        switch (e.target.name) {
            case "name":setCompanyName(e.target.value); break
            case "nip":setNipInput(e.target.value); break
            case "regon":setRegonInput(e.target.value); break
            case "shareCapital":setShareCapitalInput(e.target.value); break
        }
    }

    return <div className={"base-info"}>
        <TextField
            label="Nazwa spółki"
            name="name"
            variant="filled"
            defaultValue={companyName}
            onChange={event => handleChangeInput(event)}
        />
        <TextField
            label="NIP"
            name="nip"
            variant="filled"
            defaultValue={nipInput}
            onChange={event => handleChangeInput(event)}
        />
        <TextField
            label="REGON"
            name="regon"
            variant="filled"
            defaultValue={regonInput}
            onChange={event => handleChangeInput(event)}
        />
        <TextField
            label="Kapitał zakładowy (w PLN)"
            name="shareCapital"
            variant="filled"
            defaultValue={shareCapitalInput}
            onChange={event => handleChangeInput(event)}
        />
        <div>
            <Button disabled={props.prev} >Wstecz</Button>
            <Button disabled={props.next} onClick={switchPage}>Dalej</Button>
        </div>
    </div>
}
export default BaseInfo;
