import TextField from "@mui/material/TextField";
import {Field} from "formik";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";


export function VotingNoUnanimously({votingType: votingMatter, values}) {
    return <Box>
        <Typography sx={{ fontSize: 15}} color="text.secondary" gutterBottom>
            Oddane głosy:
        </Typography>

        <Box sx={{marginBottom:'2%'}}><Field
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
        /></Box></Box>
}