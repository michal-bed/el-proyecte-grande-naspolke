
const CompanyName = (props) => {
    return <div className={"base-info"}>
        <label> Nazwa spółki: </label>
        <input value={`${props.baseInfo.dane.dzial1.danePodmiotu.nazwa.split("SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ")[0]} sp. z o.o.`} />
        <div>
            <label>NIP:</label>
            <input value={props.baseInfo.dane.dzial1.danePodmiotu.identyfikatory.nip} />
            <label>REGON:</label>
            <input value={props.baseInfo.dane.dzial1.danePodmiotu.identyfikatory.regon} />
        </div>
        <div>
            <label> Kapital zakładowy</label>
            <input value={props.baseInfo.dane.dzial1.kapital.wysokoscKapitaluZakladowego.wartosc} />
        </div>
    </div>
}
export default CompanyName;
