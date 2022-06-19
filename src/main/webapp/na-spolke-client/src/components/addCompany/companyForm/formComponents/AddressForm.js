import {Button, TextField} from "@material-ui/core";
import {useState} from "react";
import {Address} from "../../../../classes/company/Address";



const AddressForm = (props) => {
    const [streetNameInput, setStreetNameInput] = useState(props.address === null ? "" : props.address.streetName)
    const [streetNumberInput, setStreetNumberInput] = useState(props.address === null ? "" : props.address.streetNumber)
    const [localNumberInput, setLocalNumberInput] = useState(props.address === null ? "" : props.address.localNumber)
    const [cityInput, setCityInput] = useState(props.address === null ? "" : props.address.city)
    const [zipCodeInput, setZipCodeInput] = useState(props.address === null ? "" : props.address.zipCode)
    const [postOfficeInput, setPostOfficeInput] = useState(props.address === null ? "" : props.address.postOffice)

    function switchNextPage(){
        const address = new Address({streetName:streetNameInput, streetNumber: streetNumberInput, localNumber: localNumberInput,
            city: cityInput, zipCode: zipCodeInput, postOffice: postOfficeInput})
        props.changePage(address, props.pageType, 1)
    }

    function switchPrevPage(){
        const address = new Address({streetName:streetNameInput, streetNumber: streetNumberInput, localNumber: localNumberInput,
            city: cityInput, zipCode: zipCodeInput, postOffice: postOfficeInput})
        props.changePage(address, props.pageType, -1)
    }

    function handleChangeInput(e){
        switch (e.target.name) {
            case "streetName":setStreetNameInput(e.target.value); break
            case "streetNumber":setStreetNumberInput(e.target.value); break
            case "localNumber":setLocalNumberInput(e.target.value); break
            case "city":setCityInput(e.target.value); break
            case "zipCode":setZipCodeInput(e.target.value); break
            case "postOffice":setPostOfficeInput(e.target.value); break
        }
    }

    return <div>
        <TextField
            label="ulica"
            name="streetName"
            variant="filled"
            defaultValue={streetNameInput}
            onChange={event => handleChangeInput(event)}

        />
        <TextField
            label="nr"
            name="streetNumber"
            variant="filled"
            defaultValue={streetNumberInput}
            onChange={event => handleChangeInput(event)}
        />
        <TextField
            label="nr lokalu"
            name="localNumber"
            variant="filled"
            defaultValue={localNumberInput}
            onChange={event => handleChangeInput(event)}
        />
        <TextField
            label="miasto"
            name="city"
            variant="filled"
            defaultValue={cityInput}
            onChange={event => handleChangeInput(event)}
        />
        <TextField
            label="kod pocztowy"
            name="zipCode"
            variant="filled"
            defaultValue={zipCodeInput}
            onChange={event => handleChangeInput(event)}
        />
        <TextField
            label="poczta"
            name="postOffice"
            variant="filled"
            defaultValue={postOfficeInput}
            onChange={event => handleChangeInput(event)}
        />
        <div>
            <Button disabled={props.prev} onClick={switchPrevPage}>Wstecz</Button>
            <Button disabled={props.next} onClick={switchNextPage}>Dalej</Button>
        </div>
    </div>
}

export default AddressForm;