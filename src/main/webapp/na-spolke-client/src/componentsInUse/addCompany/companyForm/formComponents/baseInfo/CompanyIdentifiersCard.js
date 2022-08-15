import {Box, Card, CardContent, Typography} from "@mui/material";
import {TextField} from "@mui/material";
import validateBaseInfo from "./ValidateBaseInfo";
import * as PropTypes from "prop-types";
import {useContext} from "react";
import {CompanyContext} from "../../CompanyContext";

export default function CompanyIdentifiersCard(props) {
    const companyData = useContext(CompanyContext)



    return <Card sx={{minWidth: 275, width: "100%", margin: "auto", height: "100%"}}>
        <CardContent sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1,
            gridTemplateRows: "auto",
            gridTemplateAreas: `"header header "
            "main1 main2 "
            "main3 main4 "`,
            margin: "auto"
        }}>
            <Box sx={{width: "auto", gridArea: "header"}} color="text.secondary" gutterBottom align="center">
                <TextField
                    label="Nazwa spółki"
                    name="companyName"
                    fullWidth
                    variant="filled"
                    value={props.companyName}
                    error={validateBaseInfo({companyName: props.companyName}).hasOwnProperty("companyName")}
                    helperText={validateBaseInfo({companyName: props.companyName}).companyName}
                    onChange={props.onChange}
                />
            </Box>
            <Box sx={{width: "85%", gridArea: "main1"}}><TextField
                label="NIP"
                name="nip"
                variant="filled"
                type="number"
                value={props.nipInput}
                error={validateBaseInfo({nipInput: props.nipInput}).hasOwnProperty("nipInput")}
                helperText={validateBaseInfo({nipInput: props.nipInput}).nipInput}
                onChange={props.onChange}
            /></Box>
            <Box sx={{width: "auto", gridArea: "main2", marginLeft: "-15%"}}><TextField
                label="REGON"
                name="regon"
                variant="filled"
                type="number"
                value={props.regonInput}
                error={validateBaseInfo({regonInput: props.regonInput}).hasOwnProperty("regonInput")}
                helperText={validateBaseInfo({regonInput: props.regonInput}).regonInput}
                onChange={props.onChange}
            /></Box>
            <Box sx={{width: "85%", gridArea: "main3"}}><TextField
                label="Numer KRS"
                name="krsNumber"
                variant="filled"
                type="number"
                defaultValue={companyData.state.company.krsNumber}
                onChange={props.onChange}
                // onDoubleClick={this.readonly}
                //TODO poprawić double click
            /></Box>
            <Box sx={{width: "auto", gridArea: "main4", marginLeft: "-15%"}}><TextField
                label="Kapitał zakładowy (w PLN)"
                name="shareCapital"
                variant="filled"
                type="number"
                defaultValue={companyData.state.company.shareCapital}
                error={parseInt(companyData.state.company.shareCapital)<5000}
                helperText={"kapitał zakładowy powinien wynosić conajmniej 5000 zł"}
                onChange={props.onChange}
            /></Box></CardContent>
    </Card>
}

CompanyIdentifiersCard.propTypes = {
    companyName: PropTypes.any,
    onChange: PropTypes.func,
    nipInput: PropTypes.any,
    regonInput: PropTypes.any,
    shareCapitalInput: PropTypes.any
};