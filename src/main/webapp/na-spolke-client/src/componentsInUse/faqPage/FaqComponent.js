import * as React from 'react';
import {Card, CardContent, Grid, Typography} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from "@mui/material/Collapse";
import {Box} from "@mui/material";

function FaqComponent(props){

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return  <Grid container>
        <Card sx={{padding: "1em", width: "100%"}} xs={12}>
            <Typography paragraph>
                <Box fontWeight='fontWeightMedium' display='inline'>{props.count}.</Box> {props.question}
            </Typography>
            <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon />
            </ExpandMore>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
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