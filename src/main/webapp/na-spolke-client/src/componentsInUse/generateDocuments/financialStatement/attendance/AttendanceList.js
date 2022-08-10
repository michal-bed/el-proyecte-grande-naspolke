import Card from "@mui/material/Card";
import style from "./AttendanceList.module.css";
import {PartnersAttendanceList} from "./PartnersAttendanceList";
import Typography from "@mui/material/Typography";
import {CardContent} from "@mui/material";

export function AttendanceList({company, values, setFieldValue}) {

    return <Card sx={{minWidth: 275, width: '80%', height: '100%', margin: "auto", marginBottom:'2%',
            ':hover': {
                boxShadow: 20,}}}
    >
        <CardContent>
            <Typography sx={{fontSize: 26, marginBottom: 2}} color="text.secondary" gutterBottom align={"center"}>
                Lista obecności:
            </Typography>

            {company.partners.individualPartners.length > 0 && company.partners.individualPartners.map((partner) => (
                <PartnersAttendanceList values={values} partner={partner} type={"individual"}
                                        setFieldValue={setFieldValue}/>))}

            {company.partners.partnerCompanies.length > 0 && company.partners.partnerCompanies.map((partner) => (
                <PartnersAttendanceList values={values} partner={partner} type={"company"}
                                        setFieldValue={setFieldValue}/>))}</CardContent>
    </Card>
}