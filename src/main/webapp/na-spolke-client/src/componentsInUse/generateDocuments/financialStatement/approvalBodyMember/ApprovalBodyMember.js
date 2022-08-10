import {FormControl} from "@chakra-ui/react";
import {Box, FormControlLabel} from "@mui/material";
import {Checkbox} from "@material-ui/core";
import Card from "@mui/material/Card";
import {DatePickerComponent} from "../formUtils/DatePickerComponent";
import {Voting} from "../voting/Voting";
import Typography from "@mui/material/Typography";

export function ApprovalBodyMember({values, setFieldValue, member, handleChange, memberType}) {

    return <Card sx={{minWidth: 275, width: '96%', marginBottom:'2%', marginLeft:'2%', marginRight:'2%',
        ':hover': { boxShadow: 20,}}}>

        <FormControl>
            <p key={`displayed${memberType}Name${member.firstName}index`}>{member.firstName} {member.secondName} {member.lastNameI} {member.lastNameII}

                { memberType.includes("board") &&
                    <span key={`${member.function}${member.boardMemberId}`}>{member.function.toLowerCase()}</span> }
            </p>
            <FormControlLabel
                control={<Checkbox key={`${memberType}WholeReportingPeriod`}
                                   defaultChecked
                                   name={`${memberType}WholeReportingPeriod`}
                                   onChange={handleChange}
                                   value={true}/>}
                label="Cały okres sprawozdawczy"/>
        </FormControl>

        { values[`${memberType}WholeReportingPeriod`] === false &&
            <Box sx={{marginLeft:'1%'}}>
                <Typography sx={{fontSize: 20, marginTop: '2%', marginBottom:'2%'}} color="text.secondary" gutterBottom>
                    Początek sprawowania funkcji w roku sprawozdawczym</Typography>
                <DatePickerComponent setFieldValue={setFieldValue} values={values}
                                     label={"Początek sprawowania funkcji"}
                                     valuesName={`${memberType}Beginning`}/>
                <Typography sx={{fontSize: 20, marginTop: '2%', marginBottom:'2%'}} color="text.secondary" gutterBottom>
                    Koniec sprawowania funkcji w roku sprawozdawczym</Typography>
                <DatePickerComponent setFieldValue={setFieldValue} values={values}
                                     label={"Koniec sprawowania funkcji"}
                                     valuesName={`${memberType}End`}/>
                </Box> }
        <Voting values={values} handleChange={handleChange} votingMatter={`${memberType}`}
                votingTitle={"Głosowanie nad udzieleniem absolutorium"}/>
    </Card>
}