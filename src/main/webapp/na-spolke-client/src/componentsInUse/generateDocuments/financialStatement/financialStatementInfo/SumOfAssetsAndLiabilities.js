import {Field} from "formik";
import TextField from "@mui/material/TextField";
import {Voting} from "../voting/Voting";
import Card from "@mui/material/Card";

export function SumOfAssetsAndLiabilities({resolutionHeader, values, handleChange, valueName, label}) {
    return <Card sx={{minWidth: 275, width: '96%', marginBottom:'2%', marginLeft:'2%', marginRight:'2%',
        ':hover': { boxShadow: 20,}}}>
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
    </Card>
}