import Card from "@mui/material/Card";
import styles from "./PartnersAbsents/PartnersAbsents.module.css";
import {Stack, Switch} from "@mui/material";
import Typography from "@mui/material/Typography";
import {AntSwitch} from "./SwitchComponent";


export function PartnersAttendanceList({values, partner, type, setFieldValue}) {

    return <Card key={`cardFor${partner.id}`}>
        <div className={styles[`Absent`]} key={`indDiv${partner.id}`}>
            <p key={`${type}Name${partner.id}`}>{type==="individual"? partner.firstName + " " + partner.lastNameI : partner.name}</p>
            <Stack direction="row" spacing={1} alignItems="center" key={`${type}Stack${partner.id}`}>
                <Typography key={`${type}Nieobecny${partner.id}`}>Nieobecny</Typography>
                <AntSwitch key={`${type}Switch${partner.id}`}
                           name={`${type}${partner.id}IsPresent`}
                           value={values[`${type}${partner.id}IsPresent`]}
                           checked={values[`${type}${partner.id}IsPresent`] === true}
                           onChange={(event) => {
                               setFieldValue(`${type}${partner.id}IsPresent`,
                                   values[`${type}${partner.id}IsPresent`] ? values[`${type}${partner.id}IsPresent`] = false : values[`${type}${partner.id}IsPresent`] = true);
                           }}/>
                <Typography key={`${type}Obecny${partner.id}`}>Obecny</Typography>
            </Stack>
        </div>
    </Card>
}