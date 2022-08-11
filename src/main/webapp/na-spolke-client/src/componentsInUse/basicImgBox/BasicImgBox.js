import React from "react";
import { BasicImgBoxStyle } from "./BasicImgBoxStyle"
function BasicImgBox(props){

    let boxPosition = (props.position === "positionL") ? BasicImgBoxStyle.imgBoxR : BasicImgBoxStyle.imgBoxL

    return <div sx={boxPosition}>
        <img sx={BasicImgBoxStyle.img} src={props.imagePath}></img>
    </div>
}

export default BasicImgBox