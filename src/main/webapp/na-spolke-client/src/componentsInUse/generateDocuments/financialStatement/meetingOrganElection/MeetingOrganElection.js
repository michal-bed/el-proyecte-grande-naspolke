import {FormControl} from "@chakra-ui/react";
import {FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";
import {Checkbox} from "@material-ui/core";
import Card from "@mui/material/Card";
import {Voting} from "../voting/Voting";


export function MeetingOrganElection({values, company, setFieldValue, headerText, type, handleChange, helperText}) {

    return <Card>
        <p>{headerText}:</p>
        <div>
            <FormControl sx={{m: 1, minWidth: 120}}>
                <InputLabel id="demo-simple-select-helper-label">{headerText}</InputLabel>
                <Select
                    name={type}
                    value={values[type]}
                    label={headerText}
                    onChange={handleChange}
                >
                    {company.partners.individualPartners.length > 0 && company.partners.individualPartners.map(partner => (
                        <MenuItem key={`select${partner.id}`}
                                  value={`${partner.firstName} ${partner.lastNameI}`}>{partner.firstName + " " + partner.lastNameI}</MenuItem>))}
                    {company.partners.partnerCompanies.length > 0 && company.partners.partnerCompanies.map(partner => (
                        <MenuItem key={`selectCompanyPartner${partner.id}`}
                                  value={partner.representativeFirstname + " " + partner.representativeLastname}>{partner.representativeFirstname + " " + partner.representativeLastname}</MenuItem>))}
                </Select>
                <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
            <Voting handleChange={handleChange} values={values} votingMatter={type}
                    votingTitle={`Głosowanie nad wyborem ${type==="recorder"? "protokolant" : "Przewodniczącego"}`}/>
        </div>
    </Card>
}