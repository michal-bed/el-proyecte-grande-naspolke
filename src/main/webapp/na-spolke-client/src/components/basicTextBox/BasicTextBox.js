import React from "react";
import style from './BasicTextBox.module.css'


function BasicTextBox(props){


    return <div className={`${style.textBox} ${props.position === "positionL" ? style.textBoxL : style.textBoxR}`}>
        <p className={style.text}>{props.text}</p>
        </div>

}

export default BasicTextBox;