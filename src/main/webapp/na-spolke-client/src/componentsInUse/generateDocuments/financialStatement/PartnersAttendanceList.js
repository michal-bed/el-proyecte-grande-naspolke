import Card from "@mui/material/Card";
import styles from "./PartnersAbsents/PartnersAbsents.module.css";
import {Stack, Switch} from "@mui/material";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";

export function PartnersAttendanceList({values, partner, type, setFieldValue}) {

    const AntSwitch = styled(Switch)(({theme}) => ({
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
        '&:active': {
            '& .MuiSwitch-thumb': {
                width: 15,
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
                transform: 'translateX(9px)',
            },
        },
        '& .MuiSwitch-switchBase': {
            padding: 2,
            '&.Mui-checked': {
                transform: 'translateX(12px)',
                color: '#17dc8a',
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#17dc8a' : '#316348',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: 12,
            height: 12,
            borderRadius: 6,
            transition: theme.transitions.create(['width'], {
                duration: 200,
            }),
        },
        '& .MuiSwitch-track': {
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor:
                theme.palette.mode === 'dark' ? 'rgb(38,211,111)' : 'rgb(180,7,7)',
            boxSizing: 'border-box',
        },
    }));

    return <Card>
        <div className={styles[`Absent`]} key={`indDiv${partner.id}`}><p
            key={`${type}Name${partner.id}`}>{type==="individual"? partner.firstName + " " + partner.lastNameI : partner.name}</p>
            <Stack direction="row" spacing={1} alignItems="center"
                   key={`${type}Stack${partner.id}`}>
                <Typography key={`${type}Nieobecny${partner.id}`}>Nieobecny</Typography>
                <AntSwitch name={`${type}${partner.id}IsPresent`}
                           value={values[`${type}${partner.id}IsPresent`]}
                           checked={values[`${type}${partner.id}IsPresent`] === true}
                           onChange={(event) => {
                               setFieldValue(`${type}${partner.id}IsPresent`,
                                   values[`${type}${partner.id}IsPresent`] ? values[`${type}${partner.id}IsPresent`] = false : values[`${type}${partner.id}IsPresent`] = true);
                           }}
                           key={`${type}Switch${partner.id}`}/>
                <Typography key={`${type}Obecny${partner.id}`}>Obecny</Typography>
            </Stack>
        </div>
    </Card>
}