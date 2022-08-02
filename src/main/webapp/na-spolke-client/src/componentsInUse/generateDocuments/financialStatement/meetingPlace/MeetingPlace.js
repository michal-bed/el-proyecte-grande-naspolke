import Card from "@mui/material/Card";
import {Field, useField, useFormikContext} from "formik";
import {useEffect} from "react";
import TextField from "@mui/material/TextField";
import {FormControlLabel, Radio} from "@mui/material";


export function MeetingPlace({values, handleChange}) {

    const MyRadio = ({label, ...props}) => {
        const [field] = useField(props);
        return (
            <FormControlLabel {...field} control={<Radio/>} label={label}/>
        )
    }

    return <Card>
        <div>
            <MyRadio name="meetingPlaceInHeadquarters"
                     type="radio"
                     value={"true"}
                     label="w siedzibie spółki"/>
            <MyRadio name="meetingPlaceInHeadquarters"
                     type="radio"
                     value={"false"}
                     label="w innym miejscu"/>
        </div>
        {values.meetingPlaceInHeadquarters !== "true" &&
            <Card>
                <Field
                    label="Zgromadzenie odbyło się w:"
                    name="meetingPlace"
                    value={values.meetingPlace}
                    placeholder="Kancelarii Notarialnej Ireny Kamińskiej"
                    as={TextField}/>
            <div>
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
                /></div>
            </Card>
        }
    </Card>
}