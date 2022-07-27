import {Typography, IconButton, Card, makeStyles, ButtonBase, Grid} from '@material-ui/core';
import {Box, CardHeader} from "@mui/material";
import { Link } from "react-router-dom";
import { getCompanies } from "../handlers/CompanyDataHandler";
import {useEffect, useState} from "react";
import {map} from "react-bootstrap/ElementChildren";

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
    // const [isDoneLoading, setIsDoneLoading] = useState(true);
    const [items, setItems] = useState([]);


    useEffect(() => {

        setCompanies(getCompanies());
        setCompanies(JSON.parse(sessionStorage.getItem("companies")))
    }, []);



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
        console.log("olololool" + items)
        return items;
    }

    // function LoadCards () {
    //     if (isLoading) {
    //         return <Typography variant={"h4"}>Ładowanie...</Typography>;
    //     } else {
    //         return (
    //             <View/>
    //         );
    //     }
    // }

    function View () {
        return (
            <>
                <Box>
                    <Box>
                        <Typography variant={'h1'} align="center">Wybór spółki</Typography>
                    </Box>
                    <Box sx={{p: 3}}>
                        <Grid container spacing={5} justifyContent="center">
                            {
                                companies !== undefined &&
                                companies.map(company =>
                                    (<Link to={"/userpanel/company/" + company['companyId']}>
                                        <Card style={cardStyle}>
                                            <CardHeader
                                                title={company['companyName']}
                                            />
                                            <Typography align='left' style={descriptionStyle}>
                                                KRS: {company['krsNumber']}
                                            </Typography>
                                        </Card>
                                    </Link>))
                            }
                        </Grid>
                    </Box>
                </Box>
            </>
        );
    }

    return <View />;
}

export default MainCockpitPage;