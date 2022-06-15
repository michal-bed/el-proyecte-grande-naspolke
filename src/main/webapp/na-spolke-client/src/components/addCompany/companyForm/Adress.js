const Adress = (props) => {
    console.log(props.adress)

    function checkForLocalNumber(localNumber) {
        if(localNumber){
            return<div>
                <label>numer lokalu:</label>
                <input defaultValue={props.adress.localNumber} size={1}/>
            </div>
        }
    }

    return <div>
        <div><label>ulica</label>
            <input defaultValue={props.adress.streetName}/>
            <label>numer domu:</label>
            <input defaultValue={props.adress.streetNumber} size={1}/>
            {checkForLocalNumber(props.adress.localNumber)}
        </div>
        <div>
            <label>miejscowość:</label>
        </div>
        <input defaultValue={props.adress.city}/>
        <div>
            <label>kod pocztowy:</label>
        </div>
        <input defaultValue={props.adress.zipCode} size={5}/>
        <div>
            <label>poczta:</label>
        </div>
        <input defaultValue={props.adress.postOffice}/>
    </div>
}

export default Adress;