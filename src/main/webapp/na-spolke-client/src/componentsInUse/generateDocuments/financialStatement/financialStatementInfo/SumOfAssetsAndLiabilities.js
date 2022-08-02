import {Field} from "formik";
import TextField from "@mui/material/TextField";
import {Voting} from "../voting/Voting";

export function SumOfAssetsAndLiabilities({resolutionHeader, values, handleChange, valueName, label}) {
    return <div>
        <p>{resolutionHeader}</p>
        <Field
            name={valueName}
            type="number"
            value={values[valueName]}
            onChange={handleChange}
            label={label}
            as={TextField}
        />
        <Voting votingMatter={"financialStatement"} values={values} handleChange={handleChange}
                votingTitle={"Głosowanie nad przyjęciem sprawozdania finansowego i sprawozdania zarządu"}/>
    </div>
}