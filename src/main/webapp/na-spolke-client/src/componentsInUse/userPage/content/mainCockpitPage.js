import {Card, Grid, Typography} from '@material-ui/core';
import {Box, CardHeader} from "@mui/material";
import {Link} from "react-router-dom";
import {getCompanies, getCompaniesFromDb} from "../handlers/CompanyDataHandler";
import {useEffect, useState} from "react";

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

    const [companies, setCompanies] = useState([]);
    const [isDoneLoading, setIsDoneLoading] = useState(false);
    const [items, setItems] = useState([]);


    useEffect(() => {
        getCompaniesFromDb().then(res => (setCompanies(res.data)))
    }, []
    );



    const PlaceCompanyCards = () => {
        const items = [];
        console.log(companies);
        if (companies !== undefined || companies !== []) {
            companies.forEach(company => {
                console.log(company)
                items.push(
                    <Link to={"/userpanel/company/" + company['companyId']}>
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
        return items;
    }

        return (
            <>
                <Box>
                    <Card style={{ height: '10vh' }}>
                        <Typography variant={'h3'} align="center">Wybór spółki</Typography>
                    </Card>
                    <Box sx={{p: 3}}>
                        <Grid container spacing={5} justifyContent="center">
                            <PlaceCompanyCards />
                        </Grid>
                    </Box>
                </Box>
            </>
        );
}

export default MainCockpitPage;
