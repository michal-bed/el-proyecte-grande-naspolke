import {Typography, IconButton, Card, makeStyles, ButtonBase, Grid} from '@material-ui/core';
import {Box, CardHeader} from "@mui/material";
import { Link } from "react-router-dom";
import { getCompanies } from "../handlers/CompanyDataHandler";

function MainCockpitPage () {

    const cardStyle = {
        display: 'block',
        minWidth: '200px',
        minHeight: '350px',
        marginLeft: "30px",
        marginRight: "30px"
    };

    const descriptionStyle = {
        marginLeft: "15px"
    };

    function PlaceCompanyCards () {
        const items = [];
        const companies = getCompanies();

        companies.forEach( company => {
            items.push(
                <Link to={"/userpanel/company/" + company['companyId'] }>
                    <Card style={cardStyle}>
                            <CardHeader
                                title={company['companyName']}
                            />
                        <Typography align='left' style={descriptionStyle}>
                            KRS: {company['krsNumber']}
                        </Typography>
                    </Card>
                </Link>
            )
        })
        return items;
    }

    return (
        <>
            <Box>
                <Box>
                    <Typography variant={'h1'} align="center">Wybór spółki</Typography>
                </Box>
                <Box sx={{p:3}}>
                    <Grid container spacing={5} justifyContent="center">
                        <PlaceCompanyCards />
                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default MainCockpitPage;