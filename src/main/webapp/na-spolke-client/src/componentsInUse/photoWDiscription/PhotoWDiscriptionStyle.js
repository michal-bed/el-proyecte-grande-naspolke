import BasicImgBox from "../basicImgBox/BasicImgBox";
import {Grid} from "@mui/material";
import BasicTextBox from "../basicTextBox/BasicTextBox";


const PhotoWDiscription = () => {
    return <>
        <Grid container>
            <Grid item>
                <BasicImgBox />
                <BasicTextBox />
            </Grid>
        </Grid>
    </>
}