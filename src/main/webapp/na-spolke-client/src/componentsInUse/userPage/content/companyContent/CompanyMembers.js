import {Box, Typography} from "@material-ui/core";
import { useParams } from "react-router-dom";
import {getCompanyById, selectCompanyInfoById} from "../../handlers/CompanyDataHandler";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import Card from "@mui/material/Card";
import {useEffect, useState} from "react";
import {map} from "react-bootstrap/ElementChildren";

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
                console.log(companyId);
                setCompany(res.data)})
                console.log(company)
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

        const data = selectInfo(selectedData);

        console.log(data);
        if (data) {

        }

        return items;
    }

    const PopulateRow = ({row}) => {
        const items = [];


        return items;
    }

    const boxStyle = {
        margin: "5px"
    }

    return (
        <Box style={boxStyle}>
            <CreateCard
                name="Członkowie Rady"
                selectedData="boardMembers"
                headers={["Imię", "Nazwisko", "Adres", "Rola"]}
            />
            <CreateCard
                name="Dyrektorzy czy coś"
                selectedData="boardOfDirectors"
                headers={["Imię", "Nazwisko", "Adres"]}
            />
            <CreateCard
                name="Wspólnicy"
                selectedData="partners"
                headers={["Pełna nazwa", "Adres", "Łączna wartość akcji", "Ilość akcji"]}
            />
        </Box>
    )
}

export default CompanyMembers;