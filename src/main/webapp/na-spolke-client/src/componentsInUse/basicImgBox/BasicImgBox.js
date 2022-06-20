import React from "react";
import { BasicImgBoxSyle } from "./BasicImgBoxStyle"
function BasicImgBox(props){

    let boxPosition = (props.position === "positionL") ? BasicImgBoxSyle.imgBoxR : BasicImgBoxSyle.imgBoxL

    return <div sx={boxPosition}>
        <img sx={BasicImgBoxSyle.img} src={BasicImgBoxSyle.imagePath}></img>
    </div>
}

export default BasicImgBox