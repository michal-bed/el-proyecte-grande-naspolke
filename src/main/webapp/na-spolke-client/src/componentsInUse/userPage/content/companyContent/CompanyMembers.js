import {Box, Typography} from "@material-ui/core";
import { useParams } from "react-router-dom";
import {getCompanyById, selectCompanyInfoById} from "../../handlers/CompanyDataHandler";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import Card from "@mui/material/Card";
import {useEffect, useState} from "react";

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

    const CreateCard = ({name, selectedData, headers}) => {
        if (company) {
            return (
                <Card style={cardStyle}>
                    <Typography variant="h4">{name}</Typography>
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
                        <PopulateRow row={row}/>
                    </TableRow>
                )
            })
        }

        return items;
    }

    const PopulateRow = ({row}) => {
        const items = [];
        const test = [];
        Object.keys(row).forEach(key => {
            if (key !== "boardMemberId" && key !== "id" && key !== "boardOfDirectorId") {
                test.push(key);
                items.push(
                    <TableCell>{row[key] ?? "[Brak]"}</TableCell>
                );
            }
        })
        console.log(row)
        console.log(test)
        return items;
    }

    const boxStyle = {
        margin: "5px"
    }

    return (
        <Box style={boxStyle}>
            <CreateCard
                name="Członkowie Rady Nadzorczej"
                selectedData="boardMembers"
                headers={["Imię", "Drugie imię", "Nazwisko", "Drugie nazwisko", "Rola"]}
            />
            <CreateCard
                name="Członkowie Zarządu"
                selectedData="boardOfDirectors"
                headers={["Imię", "Drugie Imię", "Nazwisko", "Drugie Nazwisko"]}
            />
            <CreateCard
                name="Wspólnicy (Osoby)"
                selectedData="individualPartners"
                headers={["Imię", "Drugie imię", "Nazwisko", "Drugie nazwisko", "Adres", "Łączna wartość akcji", "Ilość akcji"]}
            />
            <CreateCard
                name="Wspólnicy (Spółki)"
                selectedData="partnerCompanies"
                headers={["Pełna nazwa", "Łączna wartość akcji", "Ilość akcji", "Adres"]}
            />
        </Box>
    )
}

export default CompanyMembers;