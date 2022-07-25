import {AppBar, Toolbar, Typography, IconButton, makeStyles} from '@material-ui/core';
import NewUserPetition from "../../../membershipPetitions/NewUserPetition";

export default function SimpleNavbar() {
    return (
        <AppBar style={{height: 'auto'}} position="static">
            <Toolbar>
                <Typography variant={"h5"}>naspolke.com</Typography>
                <NewUserPetition/>
            </Toolbar>
        </AppBar>
    )
}