import {Box, Button, Card, Paper, Typography,} from "@material-ui/core";
import {Link, useParams} from "react-router-dom";
import {getCompanyById} from "../../handlers/CompanyDataHandler";
import {CardHeader, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import EventsCalendar from "../../../calendar/EventsCalendar";

function CompanyInfo () {

    let {companyId} = useParams();

    let company = getCompanyById(companyId);

    const titleCardStyle = {
        marginLeft: "25%",
        marginRight: "25%",
        minWidth: "300px",
        marginTop: "30px",
        marginBottom: "80px"
    };

    const infoCardStyle = {
        width: "500px",
        height: "300px",
        minWidth: "500px",
        marginLeft: "3%",
        marginRight: "3%",
        marginBottom: "5%",
    };

    const memberCardStyle = {
        width: "300px",
        height: "300px",
        minWidth: "150px",
        marginLeft: "3%",
        marginRight: "3%",
        textAlign: "center"
    };

    const buttonStyle = {
        backgroundColor: "#5555ff",
        color: "white",
        width: '100%'
    };

    const gridStyle = {
        align: "center",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto"
    }

    const tableStyle = {
        textAlign: "left"
    }

    return (
        <>
            <Card style={titleCardStyle}>
                <Typography variant="h2" align="center">
                    {company['companyName']}<br />
                </Typography>
            </Card>

            <Box style={gridStyle}>
                <Card style={infoCardStyle}>
                    <CardHeader
                        title="Informacje o Spółce"
                        titleTypographyProps={{align:'center'}}
                    />
                    <TableContainer component={Paper} style={tableStyle}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        Numer KRS:
                                    </TableCell>
                                    <TableCell>
                                        {company["krsNumber"]}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Kapitał Zakładowy:
                                    </TableCell>
                                    <TableCell>
                                        {company["shareCapital"] + " zł"}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>

                <Card style={memberCardStyle}>
                    <Link to={"invite"}><Button style={buttonStyle}>Zaproś do Spółki</Button></Link>
                    <Typography>
                        Osoby zarejestrowane w spółce:

                        <ul style={tableStyle}>
                            <li>
                                do wypełnienia
                            </li>
                        </ul>
                    </Typography>
                </Card>

                <Card style={memberCardStyle}>
                    <EventsCalendar />
                </Card>

            </Box>
        </>
    )
}

export default CompanyInfo;
