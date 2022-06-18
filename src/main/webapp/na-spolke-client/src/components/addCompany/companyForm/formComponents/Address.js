import {Button} from "@material-ui/core";

const Address = (props) => {
    function checkForLocalNumber(localNumber) {
        if(localNumber){
            return<div>
                <label>numer lokalu:</label>
                <input defaultValue={props.address === null ? "" : props.address.localNumber} size={1}/>
            </div>
        }
    }


    function switchNextPage(){
        props.changePage(null, props.bodyType, 1)
    }

    function switchPrevPage(){
        props.changePage(null, props.bodyType, -1)
    }

    return <div>
        <div><label>ulica</label>
            <input defaultValue={props.address === null ? "" : props.address.streetName}/>
            <label>numer domu:</label>
            <input defaultValue={props.address === null ? "" : props.address.streetNumber} size={1}/>
            {checkForLocalNumber(props.address === null ? "" : props.address.localNumber)}
        </div>
        <div>
            <label>miejscowość:</label>
        </div>
        <input defaultValue={props.address === null ? "" : props.address.city}/>
        <div>
            <label>kod pocztowy:</label>
        </div>
        <input defaultValue={props.address === null ? "" : props.address.zipCode} size={5}/>
        <div>
            <label>poczta:</label>
        </div>
        <input defaultValue={props.address === null ? "" : props.address.postOffice}/>
        <div>
            <Button disabled={props.prev} onClick={switchPrevPage}>Wstecz</Button>
            <Button disabled={props.next} onClick={switchNextPage}>Dalej</Button>
        </div>
    </div>
}

export default Address;