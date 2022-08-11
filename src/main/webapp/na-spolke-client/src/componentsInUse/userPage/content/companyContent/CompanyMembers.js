import {Box, Typography} from "@material-ui/core";
import { useParams } from "react-router-dom";
import {getCompanyById, selectCompanyInfoById} from "../../handlers/CompanyDataHandler";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Accordion,
    AccordionSummary, AccordionDetails, IconButton
} from '@mui/material';
import Card from "@mui/material/Card";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useEffect, useState} from "react";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import CompanyEditor from "./CompanyEditor";
import Input from "@material-ui/core/Input";

function CompanyMembers () {

    let {companyId} = useParams();

    const cardStyle = {
        textAlign: "center",
        justifyContent: "center"
    };

    const tableStyle = {
        width: "100%",
        display: "table",
    }

    const [company, setCompany] = useState(null);

    useEffect(() => {
        getCompanyById(companyId)
            .then(res => {
                setCompany(res.data)})
    }, [])

    function selectInfo (selectedData) {
        return company[selectedData];
    }

    const CreateCard = ({selectedData, headers}) => {
        if (company) {
            return (
                <Card style={cardStyle}>
                    <TableContainer component={Paper} style={tableStyle}>
                        <CreateHeaders headers={headers}/>
                        <CreateTableData selectedData={selectedData}/>
                    </TableContainer>
                </Card>
            )
        }
    }

    const CreateHeaders = ({headers}) => {
        const items = [];
        headers.forEach(header => {
            items.push(
                <TableCell>{header}</TableCell>
            )
        })
        return items;
    }

    const CreateTableData = ({selectedData}) => {
        const items = [];
        let data;
        if (selectedData !== "individualPartners" && selectedData !== "partnerCompanies") {
            data = selectInfo(selectedData);
        } else {
            data = selectInfo("partners")[selectedData];
        }

        if (data) {
            data.forEach((row) => {
                items.push(
                    <TableRow>
                        <PopulateRow row={row} selectedData={selectedData}/>
                    </TableRow>
                )
            })
        }
        return items;
    }

    const PopulateRow = ({row, selectedData}) => {
        const items = [];
        const test = [];
        Object.keys(row).forEach(key => {
            if (key !== "boardMemberId" && key !== "id" && key !== "boardOfDirectorId" &&
                key !== "representativeGender" && key !== "gender") {
                test.push(key);
                items.push(
                    <TableCell>
                        <CompanyEditor
                            row={row}
                            keys={test[test.length - 1]}
                            selectedData={selectedData}
                        />
                    </TableCell>
                );
            }
        })
        return items;
    }

    const boxStyle = {
        margin: "25px"
    }

    return (
        <div style={boxStyle}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h4" style={cardStyle}>Zarząd</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <Box style={boxStyle}>
                            <CreateCard
                                selectedData="boardMembers"
                                headers={["Imię", "Drugie imię", "Nazwisko", "Drugie nazwisko", "Rola"]}
                            />
                        </Box>
                    </Typography>
                </AccordionDetails>
            </Accordion><br/>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h4" style={cardStyle}>Rada nadzorcza</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <Box style={boxStyle}>
                            <CreateCard
                                selectedData="boardOfDirectors"
                                headers={["Imię", "Drugie Imię", "Nazwisko", "Drugie Nazwisko"]}
                            />
                        </Box>
                    </Typography>
                </AccordionDetails>
            </Accordion><br/>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h4" style={cardStyle}>Wspólnicy (Osoby)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <Box style={boxStyle}>
                            <CreateCard
                                selectedData="individualPartners"
                                headers={["Imię", "Drugie imię", "Nazwisko", "Drugie nazwisko",
                                    "Adres", "Łączna wartość akcji", "Ilość akcji"]}
                            />
                        </Box>
                    </Typography>
                </AccordionDetails>
            </Accordion><br/>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h4" style={cardStyle}>Wspólnicy (Spółki)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <Box style={boxStyle}>
                            <CreateCard
                                selectedData="partnerCompanies"
                                headers={["Pełna nazwa", "Łączna wartość akcji", "Ilość akcji",
                                    "Adres", "Imię reprezentanta", "Nazwisko reprezentanta"]}
                            />
                        </Box>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default CompanyMembers;
