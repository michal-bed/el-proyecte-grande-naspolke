import styles from "./BaseInfo.module.css";
import {checkForDataToDisplay} from "../../../classes/company/Utils";

const CompanyName = (props) => {
    return <div className={"base-info"}>
        <label> Nazwa spółki: </label>
        <input defaultValue={props.company === null ? "" : props.company.Name}/>
        <div>
            <label>NIP:</label>
            <input defaultValue={checkForDataToDisplay(props.company === null ? "" : props.company.NIP)} size={9} />
            <label>REGON:</label>
            <input defaultValue={checkForDataToDisplay(props.company === null ? "" : props.company.REGON)} size={8}/>
        </div>
        <div>
            <label> Kapitał zakładowy</label>
            <input defaultValue={`${checkForDataToDisplay(props.company === null ? "" : props.company.ShareCapital)} zł`} size={10} />
        </div>
    </div>
}
export default CompanyName;
