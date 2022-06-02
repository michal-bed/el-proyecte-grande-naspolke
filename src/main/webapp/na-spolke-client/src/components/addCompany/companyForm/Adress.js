
const Adress = (props) => {
    console.log(props.adress)
    return<div>
        <div><label>ulica</label></div>
        <input value={props.adress.ulica}/>
        <div><label>numer domu:</label></div>
        <input value={props.adress.nrDomu}/>
        <div><label>miejscowość:</label></div>
        <input value={props.adress.miejscowosc}/>
        <div><label>kod pocztowy:</label></div>
        <input value={props.adress.kodPocztowy}/>
        <div><label>poczta:</label></div>
        <input value={props.adress.poczta}/>
    </div>

}

export default Adress;