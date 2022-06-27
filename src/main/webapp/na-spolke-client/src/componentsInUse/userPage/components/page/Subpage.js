import React from 'react';
import {Box} from "@chakra-ui/react";
import Sidebar from "../navbar/Sidebar";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar
});

const style = withStyles(styles);

function Subpage ({classes, component}) {
    return (
        <Box className={classes.appBarSpacer} style={{display: "flex", height: '100%'}}>
            <Sidebar />
            <div style={{overflow: 'auto', height: '100%', width: '100%'}}>
                {component}
            </div>
        </Box>
    )
}

export default style(Subpage);