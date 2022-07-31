import {FormControl} from "@chakra-ui/react";
import {FormControlLabel} from "@mui/material";
import {Checkbox} from "@material-ui/core";
import Card from "@mui/material/Card";
import {DatePickerComponent} from "../DatePickerComponent";
import {Voting} from "../Voting";

export function ApprovalBodyMember({values, setFieldValue, member, handleChange, memberType}) {

    return <Card>

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
            <div>
                <div>Początek sprawowania funkcji w roku sprawozdawczym</div>
                <DatePickerComponent setFieldValue={setFieldValue} values={values}
                                     label={"Początek sprawowania funkcji w roku sprawozdawczym"}
                                     valuesName={`${memberType}Beginning`}/>
                <div>Koniec sprawowania funkcji w roku sprawozdawczym</div>
                <DatePickerComponent setFieldValue={setFieldValue} values={values}
                                     label={"Koniec sprawowania funkcji w roku sprawozdawczym"}
                                     valuesName={`${memberType}End`}/>
                </div> }
        <Voting values={values} handleChange={handleChange} votingMatter={`${memberType}`}
                votingTitle={"Głosowanie nad udzieleniem absolutorium"}/>
    </Card>
}