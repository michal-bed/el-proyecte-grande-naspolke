import styles from "./BaseInfo.module.css";
import {Button} from "@material-ui/core";

const BaseInfo = (props) => {

    function switchPage(){
        props.changePage(null, props.pageType, 1)
    }

    return <div className={"base-info"}>
        <label> Nazwa spółki: </label>
        <input defaultValue={props.company === null ? "" : props.company.Name}/>
        <div>
            <label>NIP:</label>
            <input defaultValue={props.company === null ? "" : props.company.NIP} size={9} />
            <label>REGON:</label>
            <input defaultValue={props.company === null ? "" : props.company.REGON} size={8}/>
        </div>
        <div>
            <label> Kapitał zakładowy</label>
            <input defaultValue={`${props.company === null ? "" : props.company.ShareCapital} zł`} size={10} />
        </div>
        <div>
            <Button disabled={props.prev} >Wstecz</Button>
            <Button disabled={props.next} onClick={switchPage}>Dalej</Button>
        </div>
    </div>
}
export default BaseInfo;
