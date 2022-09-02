import {Checkbox} from "@material-ui/core";
import {VotingNoUnanimously} from "./VotingNoUnanimously";
import {FormControlLabel, FormGroup} from "@mui/material";
import {Box} from "@chakra-ui/react";
import Typography from "@mui/material/Typography";

export function Voting({votingMatter, values, handleChange, votingTitle}) {

    return <Box >
        <Typography sx={{ fontSize: 20, marginTop:'4%' }} color="text.secondary" gutterBottom>
            {votingTitle}:
        </Typography>
        <div>
            <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked
                                                     name={`${votingMatter}Unanimously`}
                                                     value={values[`${votingMatter}Unanimously`]} onChange={handleChange}
                                                     color="secondary"/>}
                                  label="jednomyślne"
                                  labelPlacement="start"/></FormGroup>
        </div>
        {values[`${votingMatter}Unanimously`] === false &&
            <VotingNoUnanimously votingType={votingMatter} values={values}/> }
    </Box>

}