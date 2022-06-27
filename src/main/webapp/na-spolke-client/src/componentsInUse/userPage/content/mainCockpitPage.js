import { Typography, IconButton, Card, makeStyles, ButtonBase } from '@material-ui/core';
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { getCompanies } from "../handlers/CompanyDataHandler";

function MainCockpitPage () {



    function PlaceCompanyCards () {
        const items = [];
        const companies = getCompanies();

        companies.forEach( company => {
            items.push(
                <Card><Link to={"/userpanel/" + company['id'] }><ButtonBase>{company['name']}</ButtonBase></Link></Card>
            )
        })
        return items;
    }

    return (
        <>
            <Box>
                <Typography variant={'h1'}>Wybór spółki</Typography>
                <Box>
                    <PlaceCompanyCards />
                </Box>
            </Box>
        </>
    );
}

export default MainCockpitPage;