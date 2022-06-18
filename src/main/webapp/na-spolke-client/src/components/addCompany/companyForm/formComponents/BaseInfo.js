import styles from "./BaseInfo.module.css";
import {Button} from "@material-ui/core";

const BaseInfo = ({company, prev, pageType, changePage, next}) => {
    console.log(pageType)

    return <div className={"base-info"}>
        <label> Nazwa spółki: </label>
        <input defaultValue={company === null ? "" : company.Name}/>
        <div>
            <label>NIP:</label>
            <input defaultValue={company === null ? "" : company.NIP} size={9} />
            <label>REGON:</label>
            <input defaultValue={company === null ? "" : company.REGON} size={8}/>
        </div>
        <div>
            <label> Kapitał zakładowy</label>
            <input defaultValue={`${company === null ? "" : company.ShareCapital} zł`} size={10} />
        </div>
        <div>
            <Button disabled={prev} >Wstecz</Button>
            <Button disabled={next} onClick={changePage(null, pageType, 1)}>Dalej</Button>
        </div>
    </div>
}
export default BaseInfo;
