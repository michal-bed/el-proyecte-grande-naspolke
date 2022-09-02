import React from "react";

import { BasicTextBoxStyle } from "./BasicTextBoxStyle";
import Paper from '@mui/material/Paper';
import { Grid, Typography } from "@mui/material";


function BasicTextBox(props){

    return  <Grid item sx={BasicTextBoxStyle.textBox}>
            <Paper sx={BasicTextBoxStyle.paper} elevation={2}>
                <Typography sx={BasicTextBoxStyle.text}>
                    {props.text}
                </Typography>
            </Paper>
            
            </Grid>

}

export default BasicTextBox;