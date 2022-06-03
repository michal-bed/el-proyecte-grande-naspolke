const Adress = (props) => {
    console.log(props.adress)

    function checkForLocalNumber(localNumber) {
        if(localNumber){
            return<div>
                <label>numer lokalu:</label>
                <input defaultValue={props.adress.LocalNumber} size={1}/>
            </div>
        }
    }

    return <div>
        <div><label>ulica</label>
            <input defaultValue={props.adress.StreetName}/>
            <label>numer domu:</label>
            <input defaultValue={props.adress.StreetNumber} size={1}/>
            {checkForLocalNumber(props.adress.LocalNumber)}
        </div>
        <div>
            <label>miejscowość:</label>
        </div>
        <input defaultValue={props.adress.City}/>
        <div>
            <label>kod pocztowy:</label>
        </div>
        <input defaultValue={props.adress.ZipCode} size={5}/>
        <div>
            <label>poczta:</label>
        </div>
        <input defaultValue={props.adress.PostOffice}/>
    </div>
}

export default Adress;