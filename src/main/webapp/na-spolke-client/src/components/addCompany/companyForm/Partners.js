
const Partners = (props) => {
    return <div>
        {props.partners.map(partner => (
            <div><label>Nazwisko</label>
                <input value={partner.nazwisko.nazwiskoICzlon}/>
                <label>Imię</label>
                <input value={partner.imiona.imie}/>
                <label>Drugie imię</label>
                <input value={partner.imiona.imieDrugie}/>
                <label>ilość udziałów</label>
                <input value={partner.posiadaneUdzialy}/>
            </div>
        ))
        }
    </div>
}
export default Partners;