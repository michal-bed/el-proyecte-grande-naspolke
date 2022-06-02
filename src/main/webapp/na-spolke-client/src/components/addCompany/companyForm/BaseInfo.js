import styles from "./BaseInfo.module.css";

const CompanyName = (props) => {
    return <div className={"base-info"}>
        <label> Nazwa spółki: </label>
        <input defaultValue={props.company.Name}/>
        <div>
            <label>NIP:</label>
            <input defaultValue={props.company.NIP} size={9} />
            <label>REGON:</label>
            <input defaultValue={props.company.REGON} size={8}/>
        </div>
        <div>
            <label> Kapitał zakładowy</label>
            <input defaultValue={`${props.company.ShareCapital} zł`} size={10} />
        </div>
    </div>
}
export default CompanyName;
