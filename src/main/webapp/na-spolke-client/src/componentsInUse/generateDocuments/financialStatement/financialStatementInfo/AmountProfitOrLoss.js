import TextField from "@mui/material/TextField";
import {FormControl} from "@chakra-ui/react";
import {InputLabel, MenuItem, Select} from "@mui/material";
import {Field} from "formik";
import {Voting} from "../voting/Voting";

export function AmountProfitOrLoss({values, valueName, resolutionHeader, handleChange}) {
    let coverageOfLossPossibility = ["Z zysków lat przyszłych", "inne..."]
    let profitAllocation = ["Na kapitał zapasowy", "pokrycie straty z lat przeszłych",
        "Na kapitał zapasowy oraz na pokrycie starty z lat przeszłych",
        "wypłata dywidendy", "inne..."]

    return <div>
        <p>{resolutionHeader}</p>
        <Field
            name={"amountProfitOrLoss"}
            type="number"
            value={values.amountProfitOrLoss}
            onChange={handleChange}
            label="Wysokość zysku lub straty (w PLN)"
            as={TextField}
        />
        {values.amountProfitOrLoss !== 0 && <div>
            <FormControl sx={{m: 1, minWidth: 120}}>
                <InputLabel
                    id="demo-simple-select-helper-label">{values.amountProfitOrLoss > 0 ? "Przeznaczenie zysku" : "Sposób pokrycia straty"}</InputLabel>
                <Select
                    name={"coverageOfLossOrProfitAllocation"}
                    value={values.coverageOfLossOrProfitAllocation}
                    onChange={handleChange}
                >
                    {values.amountProfitOrLoss > 0 && profitAllocation.map((possibility, index) => (
                        <MenuItem key={possibility}
                                  value={possibility}>{possibility}</MenuItem>))}
                    {values.amountProfitOrLoss < 0 && coverageOfLossPossibility.map((possibility, index) => (
                        <MenuItem key={possibility}
                                  value={possibility}>{possibility}</MenuItem>))}
                </Select>
            </FormControl>

            {values.coverageOfLossOrProfitAllocation === "inne..." &&
                <Field
                    name={"coverageOfLossOrProfitAllocationDifferentWay"}
                    value={values.coverageOfLossOrProfitAllocationDifferentWay}
                    onChange={handleChange}
                    label={values.amountProfitOrLoss > 0 ? "Zgromadzenie Wspólników postanawia przeznaczyć zysk w następujący sposób:" :
                        "Zgromadzenie Wspólników postanawia pokryć stratę w następujący sposób:"}
                    as={TextField}/>}
            <div>
                <Voting values={values} handleChange={handleChange} votingMatter={"amountProfitOrLoss"}
                        votingTitle={values.amountProfitOrLoss > 0 ? "Głosowanie nad przeznaczeniem zysku" : "Głosowanie nad sposobem pokryciem straty"}/>
            </div>
            }
        </div>
        }
    </div>
}