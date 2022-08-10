import * as React from 'react';
import {Card, CardContent, Grid, Typography} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from "@mui/material/Collapse";
import {Box} from "@mui/material";

function FaqComponent(props){

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return  <Grid container sx={{display: 'inline'}} py={1}>
        <Card sx={{padding: "1em", width: "100%" }} xs={12} >
            <Typography paragraph onClick={handleExpandClick}>
                <Box fontWeight='fontWeightMedium' display='inline'>{props.count}.</Box> {props.question}
                {expanded ? <ExpandLess /> : <ExpandMore />}
            </Typography>

            <Collapse in={expanded} timeout="auto" unmountOnExit >
                <CardContent>
                    <Typography sx={{ fontWeight: 'bold' }} >Odpowiedź:</Typography>
                    <Typography >
                        {props.answer}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    </Grid>

}

export default FaqComponent