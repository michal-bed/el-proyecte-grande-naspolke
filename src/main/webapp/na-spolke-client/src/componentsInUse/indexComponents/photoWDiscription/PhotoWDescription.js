import React from "react";

import SectionTitle from "../sectionTitle/SectionTitle";
import BasicImgBox from "../../basicImgBox/BasicImgBox";
import BasicTextBox from "../../basicTextBox/BasicTextBox";
import Box from "@mui/material/Box"
import {PhotoWDescriptionStyle} from "./PhotoWDiscriptionStyle";



function PhotoWDescription(props){

    return<Box sx={PhotoWDescriptionStyle.section}>
        <Box sx={PhotoWDescriptionStyle.textImgHolder}>
            <SectionTitle id={props.id} sx={PhotoWDescriptionStyle.title} title={props.title} />
            <Box>
                <BasicTextBox text={props.text} position={props.position}/>
            </Box>
            <Box>
                <BasicImgBox imagePath={props.imagePath} position={props.position}/>
            </Box>
        </Box>
    </Box>

}

export default PhotoWDescription