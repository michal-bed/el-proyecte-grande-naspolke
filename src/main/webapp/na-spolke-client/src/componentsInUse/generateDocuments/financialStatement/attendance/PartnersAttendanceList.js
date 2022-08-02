import Card from "@mui/material/Card";
import {SwitchComponent} from "../formUtils/SwitchComponent";


export function PartnersAttendanceList({values, partner, type, setFieldValue}) {

    return <Card key={`cardFor${partner.id}`}>
        <div key={`indDiv${partner.id}`}>
            <p key={`${type}Name${partner.id}`}>{type==="individual"? partner.firstName + " " + partner.lastNameI : partner.name}</p>
            <SwitchComponent setFieldValue={setFieldValue} values={values} name={`${type}${partner.id}IsPresent`}
                             switchFalseText={"Nieobecny"} switchTrueText={"Obecny"} title={""} spacing={1}/>
        </div>
    </Card>
}