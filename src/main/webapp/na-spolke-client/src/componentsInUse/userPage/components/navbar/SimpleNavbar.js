import {AppBar, Toolbar, Typography, IconButton, makeStyles} from '@material-ui/core';
import NewUserPetition from "../../../membershipPetitions/NewUserPetition";
import {Box} from "@mui/material";

export default function SimpleNavbar() {
    return (
        <AppBar style={{height: 'auto'}} position="static">
            <Toolbar>
                <Typography variant={"h5"}>naspolke.com</Typography>
                <Box sx={{ ml: "auto", width: 200 }}><NewUserPetition/></Box>
            </Toolbar>
        </AppBar>
    )
}
