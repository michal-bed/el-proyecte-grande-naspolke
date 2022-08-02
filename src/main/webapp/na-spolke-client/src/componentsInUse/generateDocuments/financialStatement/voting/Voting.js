import {Checkbox} from "@material-ui/core";
import {VotingNoUnanimously} from "./VotingNoUnanimously";

export function Voting({votingMatter, values, handleChange, votingTitle}) {

    return <div>
        <p>{votingTitle}</p>
        <div>
            <Checkbox aria-label={"jednogłośnie"}
                      name={`${votingMatter}Unanimously`}
                      defaultChecked
                      value={values[`${votingMatter}Unanimously`]} onChange={handleChange}
                      color="secondary"/>
        </div>
        {values[`${votingMatter}Unanimously`] === false &&
            <VotingNoUnanimously votingType={votingMatter} values={values}/> }
    </div>

}