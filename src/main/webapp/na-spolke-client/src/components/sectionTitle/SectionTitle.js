import React from "react";
import style from './SectionTitle.css'

function SectionTitle(props){
    return <div className={'title'} id={props.id}>
        <h4>{props.title}</h4>
    </div>
}

export default SectionTitle