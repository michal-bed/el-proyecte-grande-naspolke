import styles from "./SwitchComponent.module.css";
import {Stack, Switch} from "@mui/material";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";
import {Box} from "@chakra-ui/react";
import {SwitchComponentLogic} from "./SwitchComponentLogic";

export const AntSwitch = styled(Switch)(({theme}) => ({
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

export function SwitchComponent({values, switchTrueText, switchFalseText, name, setFieldValue, title, spacing=3, company}) {

    return<Box className={styles[`Absent`]} sx={{marginLeft: '1%'}}>
        <Typography sx={{fontSize: 26, marginTop: '4%'}} color="text.secondary" gutterBottom
                    align={"center"}>
            {title}</Typography>
            <Stack direction="row" spacing={spacing} alignItems="center">
                <Typography>{switchFalseText}</Typography>
                <AntSwitch name={name}
                           value={values[name]}
                           checked={values[name]}
                           onChange={(event) => {
                               setFieldValue(name, values[name]? values[name] = false : values[name] = true);
                               SwitchComponentLogic(values, company, event);
                               // if(event.target.name === "formalConvening" && event.target.value === "true" && company!==undefined){
                               //     if(company.partners.individualPartners!==undefined) {
                               //         for (let i in company.partners.individualPartners) {
                               //              console.log(company.partners.individualPartners[i].id)
                               //              values[`individual${company.partners.individualPartners[i].id}IsPresent`] = true;
                               //         }
                               //     }
                               //     if(company.partners.partnerCompanies!==undefined){
                               //         for (let i in company.partners.partnerCompanies) {
                               //             values[`company${company.partners.partnerCompanies[i].id}IsPresent`] = true;
                               //         }
                               //     }
                               //     }

                               }
                           }
                />
                <Typography>{switchTrueText}</Typography>
            </Stack>
        </Box>

}