import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { selectCompanyInfoById } from "../../handlers/CompanyDataHandler";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import Card from "@mui/material/Card";

function CompanyMembers () {

    let {companyId} = useParams();

    const CreateCard = ({name, selectedData, headers}) => {
        return (
            <Card>
                <Typography variant="h4">{name}</Typography>
                <TableContainer component={Paper}>
                    <CreateHeaders headers={headers} />
                    <CreateTableData selectedData={selectedData} />
                </TableContainer>
            </Card>
        )
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
        console.log(selectedData)
        const data = selectCompanyInfoById(companyId, selectedData);
        console.log(data);
        data.forEach(row => {
            console.log(row);
            items.push(
                <TableRow>
                    <PopulateRow row={row} />
                </TableRow>
            )
        })
        return items;
    }

    const PopulateRow = ({row}) => {
        const items = [];
        Object.keys(row).forEach(key => {
            items.push(
                <TableCell>{row[key]}</TableCell>
            );
        })
        return items;
    }

    return (
        <>
            <CreateCard
                name="Członkowie Rady"
                selectedData="boardMembers"
                headers={["Pełne imię", "Adres", "Rola"]}
            />
            <CreateCard
                name="Dyrektorzy czy coś"
                selectedData="boardOfDirectors"
                headers={["Pełne imię", "Adres"]}
            />
            <CreateCard
                name="Wspólnicy"
                selectedData="partners"
                headers={["Pełna nazwa", "Adres", "Łączna wartość akcji", "Ilość akcji"]}
            />
        </>
    )
}

export default CompanyMembers;