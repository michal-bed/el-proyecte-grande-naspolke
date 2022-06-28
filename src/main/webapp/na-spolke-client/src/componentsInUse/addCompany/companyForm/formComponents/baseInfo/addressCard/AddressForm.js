import {useContext, useEffect, useState} from "react";
import {Address} from "../../../../../../classes/company/Address";
import validateAddress from "./ValidationAddress"
import {Box, Card, CardContent, Grid, TextField} from "@mui/material";
import {CompanyContext} from "../../../CompanyContext";




const AddressForm = (props) => {

    const companyData = useContext(CompanyContext);
    const [streetNameInput, setStreetNameInput] = useState(companyData.state.company.address.streetName === null ? "" : companyData.state.company.address.streetName)
    const [streetNumberInput, setStreetNumberInput] = useState(companyData.state.company.address.streetNumber === null ? "" : companyData.state.company.address.streetNumber)
    const [localNumberInput, setLocalNumberInput] = useState(companyData.state.company.address.localNumber === null ? "" : companyData.state.company.address.localNumber)
    const [cityInput, setCityInput] = useState(companyData.state.company.address.city === null ? "" : companyData.state.company.address.city)
    const [zipCodeInput, setZipCodeInput] = useState(companyData.state.company.address.zipCode === null ? "" : companyData.state.company.address.zipCode)
    const [postOfficeInput, setPostOfficeInput] = useState(companyData.state.company.address.postOffice === null ? "" : companyData.state.company.address.postOffice)

    useEffect(()=> {
        let delay = setTimeout(()=> {
            const hasErrors = checkForErrors()
            const address = new Address({
                streetName: streetNameInput,
                streetNumber: streetNumberInput,
                localNumber: localNumberInput,
                city: cityInput,
                zipCode: zipCodeInput,
                postOffice: postOfficeInput})
            const action = {
                address: address,
                pageType: props.pageType,
                hasErrors: hasErrors
            }
            companyData.passNewData(action)
        },1000)
        return ()=> {clearTimeout(delay)}
    }, [streetNameInput,streetNumberInput,localNumberInput,cityInput,zipCodeInput,postOfficeInput])


    function handleChangeInput(e){
        switch (e.target.name) {
            case "streetName":setStreetNameInput(e.target.value); break
            case "streetNumber":setStreetNumberInput(e.target.value); break
            case "localNumber":setLocalNumberInput(e.target.value); break
            case "city":setCityInput(e.target.value); break
            case "zipCode":setZipCodeInput(e.target.value); break
            case "postOffice":setPostOfficeInput(e.target.value); break
        }
    }

    function checkForErrors(){
        let dataToCheck = [{"streetNameInput": streetNameInput}, {"streetNumberInput": streetNumberInput}, {"localNumberInput": localNumberInput}, {"cityInput": cityInput}, {"zipCodeInput": zipCodeInput}, {"postOfficeInput": postOfficeInput}]
        let keysToCheck = ["streetNameInput", "streetNumberInput", "localNumberInput", "cityInput", "zipCodeInput", "postOfficeInput"]
        for (let i = 0; i < dataToCheck.length; i++) {
            const errors = validateAddress(dataToCheck[i])
            if (Object.keys(errors).includes(keysToCheck[i])) {
                return true
            }
        }
        return false;
    }

    return <Card sx={{minWidth: 275, width: '95%', height: '100%', margin: "auto" }}>
        <CardContent>
        <Grid sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            gridTemplateRows: 'auto',
            gridTemplateAreas: `"header header header"
        "main main2 main4"
        "header2 header2 header2"
        "footer footer footer"`,
        }}>
            <Box sx={{gridArea: 'header'}}>
                <TextField
                    label="ulica"
                    name="streetName"
                    variant="filled"
                    defaultValue={streetNameInput}
                    fullWidth
                    error={validateAddress({streetNameInput}).hasOwnProperty("streetNameInput")}
                    helperText={validateAddress({streetNameInput}).streetNameInput}
                    onChange={event => handleChangeInput(event)}
                /></Box>
            <Box sx={{gridArea: 'main'}}><TextField
                label="nr"
                name="streetNumber"
                variant="filled"
                defaultValue={streetNumberInput}
                error={validateAddress({streetNumberInput}).hasOwnProperty("streetNumberInput")}
                helperText={validateAddress({streetNumberInput}).streetNumberInput}
                onChange={event => handleChangeInput(event)}
            /></Box>
            <Box sx={{gridArea: 'main2'}}><TextField
                label="nr lokalu"
                name="localNumber"
                variant="filled"
                defaultValue={localNumberInput}
                error={validateAddress({localNumberInput}).hasOwnProperty("localNumberInput")}
                helperText={validateAddress({localNumberInput}).localNumberInput}
                onChange={event => handleChangeInput(event)}
            /></Box>
            <Box sx={{gridArea: 'header2', display: 'inline-grid'}}><TextField
                label="miasto"
                name="city"
                variant="filled"
                defaultValue={cityInput}
                error={validateAddress({cityInput}).hasOwnProperty("cityInput")}
                helperText={validateAddress({cityInput}).cityInput}
                onChange={event => handleChangeInput(event)}
            /></Box>
            <Box sx={{gridArea: 'main4'}}><TextField
                label="kod pocztowy"
                name="zipCode"
                variant="filled"
                defaultValue={zipCodeInput}
                placeholder={"xx-xxx"}
                error={validateAddress({zipCodeInput}).hasOwnProperty("zipCodeInput")}
                helperText={validateAddress({zipCodeInput}).zipCodeInput}
                onChange={event => handleChangeInput(event)}
            /></Box>
            <Box sx={{gridArea: 'footer', display: 'inline-grid'}}><TextField
                label="poczta"
                name="postOffice"
                variant="filled"
                defaultValue={postOfficeInput}
                error={validateAddress({postOfficeInput}).hasOwnProperty("postOfficeInput")}
                helperText={validateAddress({postOfficeInput}).postOfficeInput}
                onChange={event => handleChangeInput(event)}
            /></Box></Grid>
    </CardContent></Card>
}

export default AddressForm;