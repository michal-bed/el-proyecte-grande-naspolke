import TextField from "@mui/material/TextField";
import {Field} from "formik";


export function VotingNoUnanimously({votingType: votingMatter, values}) {
    return <div><p>Oddane głosy:</p>
        <Field
            key={`${votingMatter}For`}
            name={`${votingMatter}VotingFor`}
            type="number"
            value={values[`${votingMatter}VotingFor`]}
            label="głosów za:"
            as={TextField}
        /><Field
            key={`${votingMatter}Against`}
            name={`${votingMatter}VotingAgainst`}
            type="number"
            value={values[`${votingMatter}VotingAgainst`]}
            label="głosów przeciw:"
            as={TextField}
        /><Field
            key={`${votingMatter}Abstentions`}
            name={`${votingMatter}VotingAbstentions`}
            type="number"
            value={values[`${votingMatter}VotingAbstentions`]}
            label="głosów wstrzymujących się:"
            as={TextField}
        /></div>
}