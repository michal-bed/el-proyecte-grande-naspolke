import styles from "./BaseInfo.module.css";
import {Button} from "@material-ui/core";
import {useState} from "react";
import validateBaseInfo from "./ValidateBaseInfo"
import {Box} from "@mui/material";
import AddressForm from "./addressCard/AddressForm";
import CompanyIdentifiersCard from "./CompanyIdentifiersCard";

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

    return <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 1,
        gridTemplateRows: 'auto',
        gridTemplateAreas: `"header header "`,
        margin: 'auto'
    }}>
        <CompanyIdentifiersCard value={companyName} onChange={event => handleChangeInput(event)} value1={nipInput}
                                value2={regonInput} baseInfo={props.baseInfo} value3={shareCapitalInput}/>
        <AddressForm address={props.address} changePage={props.changePage}
                     pageType={"address"}/>
        <Button disabled={props.prev}>Wstecz</Button>
        <Button disabled={props.next} onClick={switchPage}>Dalej</Button>
    </Box>
}
export default BaseInfo;
