import React from "react";

import Typography from "@mui/material/Typography"
import {SectionTitleStyle} from "./SectionTitleStyle";
import {Box} from "@mui/material";

function SectionTitle(props){
    return <Box sx={SectionTitleStyle.title} id={props.id}>
        <Typography variant="h2">{props.title}</Typography>
    </Box>
}

export default SectionTitle