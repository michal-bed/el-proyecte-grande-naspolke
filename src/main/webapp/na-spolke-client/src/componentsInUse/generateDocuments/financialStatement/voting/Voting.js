import {Checkbox} from "@material-ui/core";
import {VotingNoUnanimously} from "./VotingNoUnanimously";
import {FormControlLabel, FormGroup} from "@mui/material";

export function Voting({votingMatter, values, handleChange, votingTitle}) {

    return <div>
        <p>{votingTitle}</p>
        <div>
            <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked
                                                     name={`${votingMatter}Unanimously`}
                                                     value={values[`${votingMatter}Unanimously`]} onChange={handleChange}
                                                     color="secondary"/>}
                                  label="jednomyślne"
                                  labelPlacement="start"/></FormGroup>
            {/*<Checkbox aria-label={"jednogłośnie"}*/}
            {/*          name={`${votingMatter}Unanimously`}*/}
            {/*          defaultChecked*/}
            {/*          value={values[`${votingMatter}Unanimously`]} onChange={handleChange}*/}
            {/*          color="secondary"/>*/}
        </div>
        {values[`${votingMatter}Unanimously`] === false &&
            <VotingNoUnanimously votingType={votingMatter} values={values}/> }
    </div>

}