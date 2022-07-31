import TextField from "@mui/material/TextField";
import {Field} from "formik";


export function VotingNoUnanimously({votingType, values}) {
    return <div><p>Oddane głosy:</p>
        <Field
            key={`${votingType}For`}
            name={`${votingType}VotingFor`}
            type="number"
            value={values[`${votingType}VotingFor`]}
            label="głosów za:"
            as={TextField}
        /><Field
            key={`${votingType}Against`}
            name={`${votingType}VotingAgainst`}
            type="number"
            value={values[`${votingType}VotingAgainst`]}
            label="głosów przeciw:"
            as={TextField}
        /><Field
            key={`${votingType}Abstentions`}
            name={`${votingType}VotingAbstentions`}
            type="number"
            value={values[`${votingType}VotingAbstentions`]}
            label="głosów wstrzymujących się:"
            as={TextField}
        /></div>
}