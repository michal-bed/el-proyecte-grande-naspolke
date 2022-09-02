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

    function checkIsSomeoneIsPresent() {
        values.someoneIsPresent=false;
        for (const item in values) {
            if (item.includes("IsPresent") && values[item] === true) {
                values.someoneIsPresent = true;
                }
            }
        }


    return<Box  sx={{marginLeft: '1%', width:'100%'}}>
        <Typography sx={{fontSize: 26, marginTop: '4%'}} color="text.secondary" gutterBottom
                    align={"center"}>
            {title}</Typography>
            <Stack direction="row" spacing={spacing} alignItems="center">
                <Typography>{switchFalseText}</Typography>
                <AntSwitch name={name}
                           value={values[name]}
                           checked={values[name]}
                           onChange={event => {
                               setFieldValue(name, values[name]? values[name] = false : values[name] = true);
                               SwitchComponentLogic(values, company, event);
                               checkIsSomeoneIsPresent();
                                }
                           }
                />
                <Typography>{switchTrueText}</Typography>
            </Stack>
        </Box>

}