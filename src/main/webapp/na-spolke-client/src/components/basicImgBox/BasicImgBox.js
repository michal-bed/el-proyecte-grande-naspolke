import React from "react";
import style from "./BasicImgBox.module.css"

function BasicImgBox(props){

    let boxPosition = (props.position === "positionL") ? style.imgBoxR : style.imgBoxL

    return <div className={boxPosition}>
        <img className={style.img} src={props.imagePath}></img>
    </div>
}

export default BasicImgBox