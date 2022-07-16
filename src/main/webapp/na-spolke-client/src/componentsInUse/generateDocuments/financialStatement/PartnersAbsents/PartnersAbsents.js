import {Field} from "formik";
import {forEach} from "react-bootstrap/ElementChildren";
import {FormControlLabel, FormGroup, Stack, Switch} from "@mui/material";
import {IndividualPartner, PartnerCompany} from "../../../../classes/persons/Partners";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";
import Card from "@mui/material/Card";
import styles from "./PartnersAbsents.module.css";


export default function PartnersAbsents(props){
   const label = { inputProps: { 'aria-label': 'Switch demo' } };

   const AntSwitch = styled(Switch)(({ theme }) => ({
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

   return<div>
      {props.partners!==null && props.partners.map((partner, index) => (
          <Card>
             {props.partnerType === "individual" &&
                 <div className={styles[`Absent`]}><p>{partner.firstName + " " + partner.lastNameI}</p> <Stack direction="row"  spacing={1} alignItems="center">
                    <Typography>Nieobecny</Typography>
                    <AntSwitch  name={props.partnerType+partner.id}
                                value={props.values.individualPartners[index].isPresent}
                                // checked={props.values.individualPartners[index].isPresent === true}
                                // onChange={(event, checked) => {
                                //    checked = checked !== true;
                                //    props.setFieldValue(props.values.individualPartners[index].isPresent, checked ? true : false);}}
                                 key={index} defaultChecked />
                    <Typography>Obecny</Typography>
                 </Stack>
                 </div>}
             {props.partnerType==="partner" &&
                 <div><p> {partner.name} </p> <Stack direction="row"  spacing={1} alignItems="center">
                    <Typography>Nieobecny</Typography>
                    <AntSwitch defaultChecked key={index} name={props.values.individualPartners} inputProps={{ 'aria-label': 'ant design' }} onChange={value=>console.log(value)}/>
                    <Typography>Obecny</Typography>
                 </Stack></div>}
          </Card>
          )
      )}
   </div>
}