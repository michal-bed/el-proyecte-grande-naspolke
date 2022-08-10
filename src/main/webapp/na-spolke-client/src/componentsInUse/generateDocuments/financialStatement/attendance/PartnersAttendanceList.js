import Card from "@mui/material/Card";
import {SwitchComponent} from "../formUtils/SwitchComponent";
import {Box, CardContent} from "@mui/material";


export function PartnersAttendanceList({values, partner, type, setFieldValue}) {

    return <Card key={`cardFor${partner.id}`} sx={{marginBottom:'2%', ':hover': {
            boxShadow: 20,}}}>
        <CardContent key={`indDiv${partner.id}`}>
            <Box key={`${type}Name${partner.id}`}>{type==="individual"? partner.firstName + " " + partner.lastNameI : partner.name}</Box>
            <SwitchComponent setFieldValue={setFieldValue} values={values} name={`${type}${partner.id}IsPresent`}
                             switchFalseText={"Nieobecny"} switchTrueText={"Obecny"} title={""} spacing={1}/>
        </CardContent>
    </Card>
}