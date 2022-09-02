import {FormControl} from "@chakra-ui/react";
import {FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";
import {Checkbox} from "@material-ui/core";
import Card from "@mui/material/Card";
import {Voting} from "../voting/Voting";
import Typography from "@mui/material/Typography";


export function MeetingOrganElection({values, company, setFieldValue, headerText, type, handleChange, helperText}) {

    return <Card sx={{minWidth: 275, width: '100%', marginBottom:'2%',
        ':hover': { boxShadow: 20,}}}>
        <Typography sx={{ fontSize: 26, marginBottom: 2 }} color="text.secondary" gutterBottom align={"center"}>
            {headerText}:
        </Typography>
        <div>
            <FormControl sx={{ m: 1,fontSize: 20}} >
                <InputLabel id="demo-simple-select-helper-label">{helperText}</InputLabel>
                <Select
                    name={type}
                    value={values[type]}
                    label={headerText}
                    onChange={handleChange}

                >
                    {company.partners.individualPartners.length > 0 && company.partners.individualPartners.map(partner => (
                        <MenuItem key={`select${partner.id}`}
                                  value={`i${JSON.stringify(partner)}`}>{partner.firstName + " " + partner.lastNameI}</MenuItem>))}
                    {company.partners.partnerCompanies.length > 0 && company.partners.partnerCompanies.map(partner => (
                        <MenuItem key={`selectCompanyPartner${partner.id}`}
                                  value={`c${JSON.stringify(partner)}`}>{partner.representativeFirstname + " " + partner.representativeLastname}</MenuItem>))}
                </Select>
                {/*<FormHelperText>{helperText}</FormHelperText>*/}
            </FormControl>
            <Voting handleChange={handleChange} values={values} votingMatter={type}
                    votingTitle={`Głosowanie w sprawie wyboru ${type==="recorder"? "Protokolanta" : "Przewodniczącego Zgromadzenia"}`}/>
        </div>
    </Card>
}