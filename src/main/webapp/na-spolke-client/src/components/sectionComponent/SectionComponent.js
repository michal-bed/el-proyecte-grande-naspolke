import React from "react";
import './SectionComponent.css'
import SectionTitle from "../sectionTitle/SectionTitle";
import BasicImgBox from "../basicImgBox/BasicImgBox";
import BasicTextBox from "../basicTextBox/BasicTextBox";

function SectionComponent(props){
    return<div className='section'>
        <SectionTitle className='title' title={props.title} />
        <BasicTextBox text={props.text} position={props.position}/>
        <BasicImgBox imagePath={props.imagePath} position={props.position}/>
    </div>
}

export default SectionComponent