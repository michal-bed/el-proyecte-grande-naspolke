import React from "react";

import Typography from "@mui/material/Typography"

function SectionTitle(props){
    return <div className={'title'} id={props.id}>
        <Typography variant="h2">{props.title}</Typography>
    </div>
}

export default SectionTitle