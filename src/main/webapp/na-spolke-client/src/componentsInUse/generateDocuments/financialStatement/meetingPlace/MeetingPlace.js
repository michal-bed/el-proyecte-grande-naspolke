import Card from "@mui/material/Card";
import {Field, useField, useFormikContext} from "formik";
import {useEffect} from "react";
import TextField from "@mui/material/TextField";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {Box, FormControl, FormLabel} from "@chakra-ui/react";
import Typography from "@mui/material/Typography";


export function MeetingPlace({values, handleChange}) {


    return <Box>
        <div>
            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group" sx={{fontSize: 14, marginBottom:2}} >Miejsce odbycia zgromadzenia</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="meetingPlaceInHeadquarters"
                    value={values.meetingPlaceInHeadquarters}
                    onChange={handleChange}>
                    <FormControlLabel value="true" control={<Radio />} label="w siedzibie spółki" />
                    <FormControlLabel value="false" control={<Radio />} label="w innym miejscu" />
                </RadioGroup>
            </FormControl>
        </div>
        {values.meetingPlaceInHeadquarters !== "true" &&
            <Card>
                <Field
                    label="Zgromadzenie odbyło się w:"
                    name="meetingPlace"
                    value={values.meetingPlace}
                    placeholder="Kancelarii Notarialnej Ireny Kamińskiej"
                    as={TextField}/>
            <Box sx={{ marginTop:'5', marginBottom:'5'}}>
                <Field
                    label="ulica"
                    value={values.streetName}
                    name="streetName"
                    as={TextField}/>
                <Field
                    label="nr"
                    value={values.streetNumber}
                    name="streetNumber"
                    as={TextField}/>
                <Field
                    label="nr lokalu"
                    name="localNumber"
                    value={values.localNumber}
                    as={TextField}
                />
            </Box>
            <Box>
                <Field
                    label="miasto"
                    name="city"
                    value={values.city}
                    as={TextField}/>
                <Field
                    label="kod pocztowy"
                    name="zipCode"
                    placeholder="xx-xxx"
                    value={values.zipCode}
                    as={TextField}
                /></Box>
            </Card>
        }
    </Box>
}