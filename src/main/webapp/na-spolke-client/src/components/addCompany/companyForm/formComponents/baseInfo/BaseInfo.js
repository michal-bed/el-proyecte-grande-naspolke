import styles from "./BaseInfo.module.css";
import {Button} from "@material-ui/core";
import {useContext, useEffect, useState} from "react";
import validateBaseInfo from "./ValidateBaseInfo"
import {Box} from "@mui/material";
import AddressForm from "./addressCard/AddressForm";
import CompanyIdentifiersCard from "./CompanyIdentifiersCard";
import {CompanyContext} from "../../CompanyContext";

const BaseInfo = (props) => {
    const companyData = useContext(CompanyContext)
    console.log(companyData)
    const [companyName, setCompanyName] = useState(companyData.state.company.companyName === null ? "" : companyData.state.company.companyName)
    const [nipInput, setNipInput] = useState(companyData.state.company.nip === null ? "" : companyData.state.company.nip)
    const [regonInput, setRegonInput] = useState(companyData.state.company.regon === null ? "" : companyData.state.company.regon.slice(0,9))
    const [shareCapitalInput, setShareCapitalInput] = useState(companyData.state.company.shareCapital === null ? 5000 : companyData.state.company.shareCapital)
    const [krsNumberInput, setKrsNumberInput] = useState(companyData.state.company.krsNumber === null ? "" : companyData.state.company.krsNumber)

    useEffect(()=> {
        let delay = setTimeout(()=> {
            const hasErrors = checkForErrors()
            const action = {
                pageType: props.pageType,
                companyName: companyName,
                nipInput: nipInput,
                regonInput: regonInput,
                shareCapitalInput: shareCapitalInput,
                hasErrors: hasErrors
            }
            companyData.passNewData(action)
        },1000)
        return ()=> {clearTimeout(delay)}
    }, [companyName, nipInput, regonInput, shareCapitalInput])


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

    // function switchPage(){
    //     const baseInfo = {companyName: companyName,
    //         krsNumber:props.baseInfo.krsNumber,
    //         nip: nipInput,
    //         regon: regonInput,
    //         shareCapital: shareCapitalInput}
    //     const isError = checkForErrors()
    //     props.changePage(baseInfo, props.pageType, 1, isError)
    // }

    function handleChangeInput(e){
        switch (e.target.name) {
            case "companyName":setCompanyName(e.target.value); break
            case "nip":setNipInput(e.target.value); break
            case "regon":setRegonInput(e.target.value); break
            case "shareCapital":setShareCapitalInput(e.target.value); break
            case "krsNumber" : setKrsNumberInput(e.target.value); break
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
        <CompanyIdentifiersCard companyName={companyName} onChange={event => handleChangeInput(event)} nipInput={nipInput}
                                regonInput={regonInput} shareCapitalInput={shareCapitalInput}/>
        <AddressForm pageType={"address"}/>
        {/*<Button disabled={props.prev}>Wstecz</Button>*/}
        {/*<Button disabled={props.next} onClick={switchPage}>Dalej</Button>*/}
    </Box>
}
export default BaseInfo;
