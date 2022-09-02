import * as React from "react";
import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import Collapse from "@mui/material/Collapse";
import PricingComponent from "./PricingComponent"
import KitComponentSection from "../kitComponentSection/KitComponentSection";
import index_photo5 from "../../../assets/photos/index_photo5.jpg";

function PricingComponentSection(props){

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return  <Grid container sx={{display: 'inline'}} py={1}>
        <Card sx={{padding: "1em", width: "100%" }} xs={12} >
            <KitComponentSection textContent={props.textContent}
                                 id={'cennik'}
                                 title='Cennik usług'
                                 position="positionR"
                                 photoPath={props.photoPath}/>

            <Typography paragraph onClick={handleExpandClick}>
               Sprawdź naszą ofertę {expanded ? <ExpandLess /> : <ExpandMore />}
            </Typography>

            <Collapse in={expanded} timeout="auto" unmountOnExit >
                <CardContent>
                    <PricingComponent />
                </CardContent>
            </Collapse>
        </Card>
    </Grid>
}

export default PricingComponentSection