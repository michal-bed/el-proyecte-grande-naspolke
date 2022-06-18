import styles from "./BaseInfo.module.css";
import {Button, TextField} from "@material-ui/core";

const BaseInfo = (props) => {

    function switchPage(){
        props.changePage(null, props.pageType, 1)
    }

    return <div className={"base-info"}>
        <TextField
            label="Nazwa spółki"
            name="name"
            variant="filled"
            defaultValue={props.company === null ? "" : props.company.Name}
            />
        <TextField
            label="NIP"
            name="nip"
            variant="filled"
            defaultValue={props.company === null ? "" : props.company.NIP}
        />
        <TextField
            label="REGON"
            name="regon"
            variant="filled"
            defaultValue={props.company === null ? "" : props.company.REGON}
        />
        <TextField
            label="Kapitał zakładowy"
            name="shareCapital"
            variant="filled"
            defaultValue={`${props.company === null ? "" : props.company.ShareCapital} zł`}
        />
        <div>
            <Button disabled={props.prev} >Wstecz</Button>
            <Button disabled={props.next} onClick={switchPage}>Dalej</Button>
        </div>
    </div>
}
export default BaseInfo;
