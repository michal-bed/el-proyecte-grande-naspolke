import {Card, Typography} from '@material-ui/core';
import RequestForMembership from "../../../../requestToCompany/RequestForMembership";
import React from "react";
import {Box} from "@mui/material";

function RequestJoin () {
    return (
        <>
            <Card>
                <Box sx={{ mx: "auto", width: 400 }}>
                    <Typography variant="h3" component="div">Dołącz do spółki</Typography>
                </Box>
            </Card><br/>
            <Card style={{ height: 300 }}>
                <Box sx={{ mx: "auto", width: 400 }}>
                    <Typography variant="h3" component="div"><RequestForMembership/></Typography>
                </Box>
            </Card>
        </>
    )
}

export default RequestJoin;
