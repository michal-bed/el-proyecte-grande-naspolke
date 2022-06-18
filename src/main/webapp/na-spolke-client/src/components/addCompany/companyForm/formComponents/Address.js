import {Button, TextField} from "@material-ui/core";

const Address = (props) => {



    function switchNextPage(){
        props.changePage(null, props.bodyType, 1)
    }

    function switchPrevPage(){
        props.changePage(null, props.bodyType, -1)
    }

    return <div>
        <TextField
            label="ulica"
            name="street"
            variant="filled"
            defaultValue={props.address === null ? "" : props.address.streetName}
        />
        <TextField
            label="nr"
            name="streetNumber"
            variant="filled"
            defaultValue={props.address === null ? "" : props.address.streetNumber}
        />
        <TextField
            label="nr lokalu"
            name="localNumber"
            variant="filled"
            defaultValue={props.address === null ? "" : props.address.localNumber}
        />
        <TextField
            label="miasto"
            name="city"
            variant="filled"
            defaultValue={props.address === null ? "" : props.address.city}
        />
        <TextField
            label="kod pocztowy"
            name="zipCode"
            variant="filled"
            defaultValue={props.address === null ? "" : props.address.zipCode}
        />
        <TextField
            label="poczta"
            name="postOffice"
            variant="filled"
            defaultValue={props.address === null ? "" : props.address.postOffice}
        />
        <div>
            <Button disabled={props.prev} onClick={switchPrevPage}>Wstecz</Button>
            <Button disabled={props.next} onClick={switchNextPage}>Dalej</Button>
        </div>
    </div>
}

export default Address;