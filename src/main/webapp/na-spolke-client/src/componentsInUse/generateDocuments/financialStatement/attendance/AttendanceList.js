import Card from "@mui/material/Card";
import style from "./AttendanceList.module.css";
import {PartnersAttendanceList} from "./PartnersAttendanceList";

export function AttendanceList({company, values, setFieldValue}) {
    return <Card className={style[`cardStyle`]}>
        <p>Lista obecności:</p>
        {company.partners.individualPartners.length > 0 && company.partners.individualPartners.map((partner) => (
            <PartnersAttendanceList values={values} partner={partner} type={"individual"} setFieldValue={setFieldValue}/>))}

        {company.partners.partnerCompanies.length > 0 && company.partners.partnerCompanies.map((partner) => (
            <PartnersAttendanceList values={values} partner={partner} type={"company"} setFieldValue={setFieldValue}/>))}
    </Card>
}