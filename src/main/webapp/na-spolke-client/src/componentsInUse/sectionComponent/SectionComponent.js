import React from "react";

import SectionTitle from "../sectionTitle/SectionTitle";
import BasicImgBox from "../basicImgBox/BasicImgBox";
import BasicTextBox from "../basicTextBox/BasicTextBox";
import Box from "@mui/material/Box"
import { SectionComponentStyle } from "./SectionComponentStyle"



function SectionComponent(props){
    
    let boxOrder = (props.position == "positionL") ? "0" : "1";
    // SectionComponentStyle.section.backgroundColor = (props.position == "positionL") ? "rgb(223, 207, 190)" : 
    // "rgb(196, 167, 135)"
    
    
    return<Box sx={SectionComponentStyle.section}>
        <Box sx={SectionComponentStyle.textImgHolder}>
        <SectionTitle id={props.id} sx={SectionComponentStyle.title} title={props.title} />
        <Box  order={boxOrder}>
        <BasicTextBox text={props.text} position={props.position}/>
        </Box>
        <Box>
        <BasicImgBox imagePath={props.imagePath} position={props.position}/>
        </Box>
    </Box>
    
    </Box>
    
}

export default SectionComponent