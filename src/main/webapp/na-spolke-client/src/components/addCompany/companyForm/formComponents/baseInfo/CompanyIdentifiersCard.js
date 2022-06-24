import {Box, Card, CardContent, Typography} from "@mui/material";
import {TextField} from "@material-ui/core";
import validateBaseInfo from "./ValidateBaseInfo";
import * as PropTypes from "prop-types";

export default function CompanyIdentifiersCard(props) {
    return <Card sx={{minWidth: 275, width: "95%", margin: "auto", height: "100%"}}>
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
            <Typography sx={{width: "auto", gridArea: "header"}} color="text.secondary" gutterBottom align="center">
                <TextField
                    label="Nazwa spółki"
                    name="companyName"
                    fullWidth="true"
                    variant="filled"
                    value={props.value}
                    error={validateBaseInfo({companyName: props.value}).hasOwnProperty("companyName")}
                    helperText={validateBaseInfo({companyName: props.value}).companyName}
                    onChange={props.onChange}
                />
            </Typography>
            <Box sx={{width: "85%", gridArea: "main1"}}><TextField
                label="NIP"
                name="nip"
                variant="filled"
                value={props.value1}
                error={validateBaseInfo({nipInput: props.value1}).hasOwnProperty("nipInput")}
                helperText={validateBaseInfo({nipInput: props.value1}).nipInput}
                onChange={props.onChange}
            /></Box>
            <Box sx={{width: "auto", gridArea: "main2", marginLeft: "-15%"}}><TextField
                label="REGON"
                name="regon"
                variant="filled"
                value={props.value2}
                error={validateBaseInfo({regonInput: props.value2}).hasOwnProperty("regonInput")}
                helperText={validateBaseInfo({regonInput: props.value2}).regonInput}
                onChange={props.onChange}
            /></Box>
            <Box sx={{width: "85%", gridArea: "main3"}}><TextField
                label="Numer KRS"
                name="shareCapital"
                variant="filled"
                defaultValue={props.baseInfo.krsNumber}
                disabled="true"
                onChange={props.onChange}
            /></Box>
            <Box sx={{width: "auto", gridArea: "main4", marginLeft: "-15%"}}><TextField
                label="Kapitał zakładowy (w PLN)"
                name="shareCapital"
                variant="filled"
                value={props.value3}
                error={validateBaseInfo({shareCapitalInput: props.value3}).hasOwnProperty("shareCapitalInput")}
                helperText={validateBaseInfo({shareCapitalInput: props.value3}).shareCapitalInput}
                onChange={props.onChange}
            /></Box></CardContent>
    </Card>;
}

CompanyIdentifiersCard.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    value1: PropTypes.any,
    value2: PropTypes.any,
    baseInfo: PropTypes.any,
    value3: PropTypes.any
};