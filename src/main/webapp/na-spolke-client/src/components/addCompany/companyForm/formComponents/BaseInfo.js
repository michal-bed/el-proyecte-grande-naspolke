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
            defaultValue={props.baseInfo === null ? "" : props.baseInfo.name}
            />
        <TextField
            label="NIP"
            name="nip"
            variant="filled"
            defaultValue={props.baseInfo === null ? "" : props.baseInfo.nip}
        />
        <TextField
            label="REGON"
            name="regon"
            variant="filled"
            defaultValue={props.baseInfo === null ? "" : props.baseInfo.regon}
        />
        <TextField
            label="Kapitał zakładowy"
            name="shareCapital"
            variant="filled"
            defaultValue={`${props.baseInfo === null ? "" : props.baseInfo.shareCapital} zł`}
        />
        <div>
            <Button disabled={props.prev} >Wstecz</Button>
            <Button disabled={props.next} onClick={switchPage}>Dalej</Button>
        </div>
    </div>
}
export default BaseInfo;
