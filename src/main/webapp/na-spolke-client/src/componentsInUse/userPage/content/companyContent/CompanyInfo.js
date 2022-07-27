import {Card, Typography, Box, Button, Grid, Paper,} from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { getCompanyById } from "../../handlers/CompanyDataHandler";
import {CardHeader, IconButton, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import Input from "@material-ui/core/Input";
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import {useState} from "react";



function CompanyInfo () {

    let {companyId} = useParams();

    let company = getCompanyById(companyId);
    company.streetName = company.address.streetName;
    company.streetNumber = company.address.streetNumber;
    company.localNumber = company.address.localNumber;
    company.city = company.address.city;
    company.zipCode = company.address.zipCode;
    company.postOffice = company.address.postOffice;

    const titleCardStyle = {
        marginLeft: "25%",
        marginRight: "25%",
        minWidth: "300px",
        marginTop: "30px",
        marginBottom: "80px"
    };

    const infoCardStyle = {
        width: "500px",
        // height: "300px",
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

    const createData = (name, ...rest) => ({
        id: name,
        [name]: company[name],
        ...rest,
        isEditMode: false
    });

    const customTableCell = ({ row, name, onChange }) => {
        // const classes = useStyles();
        const { isEditMode } = row;
        return (
            <TableCell align="left"
                       // className={classes.tableCell}
            >
                {isEditMode ? (
                    <Input
                        value={row[name]}
                        name={name}
                        onChange={e => onChange(e, row)}
                        // className={classes.input}
                    />
                ) : (
                    row[name]
                )}
            </TableCell>
        );
    };

    const [rows, setRows] = useState([
        createData("companyName"),
        createData("shareCapital"),
        createData("boardMembersTerm"),
        createData("boardOfDirectorsTerm"),
        createData("address"),
        createData("streetName"),
        createData("streetNumber"),
        createData("localNumber"),
        createData("city"),
        createData("zipCode"),
        createData("postOffice"),
        createData("shareValue"),
        createData("manySharesAllowed"),
    ]);

    const [previous, setPrevious] = useState({});

    const onDoneEditMode = id => {
        onToggleEditMode(id);
        setPrevious(state => ({ ...state, [id]: rows.find(row => row.id === id) }));
        company[id] = rows.find(row => row.id === id)[id];
    }
    const onToggleEditMode = id => {
        setRows(rows => {
            return rows.map(row => {
                if (row.id === id) {
                    return { ...row, isEditMode: !row.isEditMode };
                }
                return row;
            });
        });
    };

    const onChange = (e, row) => {
        // console.log("onChange")
        if (!previous[row.id]) {
            setPrevious(state => ({ ...state, [row.id]: row }));
        }
        const value = e.target.value;
        const name = e.target.name;
        const { id } = row;
        const newRows = rows.map(row => {
            if (row.id === id) {
                return { ...row, [name]: value };
            }
            return row;
        });
        setRows(newRows);
    };

    const onRevert = id => {
        const newRows = rows.map(row => {
            if (row.id === id) {
                return previous[id] ? previous[id] : row;
            }
            return row;
        });
        setRows(newRows);
        setPrevious(state => {
            delete state[id];
            return state;
        });
        onToggleEditMode(id);
    };

    const generateIcons = (row) => (
        row.isEditMode ? (
                <>
                    <IconButton
                        aria-label="done"
                        onClick={() => onDoneEditMode(row.id)}
                    >
                        <DoneIcon />
                    </IconButton>
                    <IconButton
                        aria-label="revert"
                        onClick={() => onRevert(row.id)}
                    >
                        <RevertIcon />
                    </IconButton>
                </>
            ) : (
                <IconButton
                    aria-label="edit"
                    onClick={() => onToggleEditMode(row.id)}
                >
                    <EditIcon />
                </IconButton>
            ));

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
                                        Nazwa spółki:
                                    </TableCell>
                                    {customTableCell({ row: rows.find(row => row.id === "companyName"),
                                        name: "companyName", onChange })}
                                    {generateIcons(rows.find(row => row.id === "companyName"))}
                                </TableRow>
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
                                        NIP:
                                    </TableCell>
                                    <TableCell>
                                        {company["nip"]}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        REGON:
                                    </TableCell>
                                    <TableCell>
                                        {company["regon"]}
                                    </TableCell>
                                </TableRow>
                                {/*<TableRow>*/}
                                {/*    <TableCell>*/}
                                {/*        Adres:*/}
                                {/*    </TableCell>*/}
                                {/*    /!*<TableCell>*!/*/}
                                {/*    /!*    {company["address"]}*!/*/}
                                {/*    /!*</TableCell>*!/*/}
                                {/*    {customTableCell({ row: rows.find(row => row.id === "address"),*/}
                                {/*        name: "address", onChange })}*/}
                                {/*    {generateIcons(rows.find(row => row.id === "address"))}*/}
                                {/*</TableRow>*/}
                                <TableRow>
                                    <TableCell>
                                        Ulica:
                                    </TableCell>
                                    {/*<TableCell>*/}
                                    {/*    {company["address"]}*/}
                                    {/*</TableCell>*/}
                                    {customTableCell({ row: rows.find(row => row.id === "streetName"),
                                        name: "streetName", onChange })}
                                    {generateIcons(rows.find(row => row.id === "streetName"))}
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Numer budynku:
                                    </TableCell>
                                    {/*<TableCell>*/}
                                    {/*    {company["address"]}*/}
                                    {/*</TableCell>*/}
                                    {customTableCell({ row: rows.find(row => row.id === "streetNumber"),
                                        name: "streetNumber", onChange })}
                                    {generateIcons(rows.find(row => row.id === "streetNumber"))}
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Numer lokalu:
                                    </TableCell>
                                    {/*<TableCell>*/}
                                    {/*    {company["address"]}*/}
                                    {/*</TableCell>*/}
                                    {customTableCell({ row: rows.find(row => row.id === "localNumber"),
                                        name: "localNumber", onChange })}
                                    {generateIcons(rows.find(row => row.id === "localNumber"))}
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Miejscowość:
                                    </TableCell>
                                    {/*<TableCell>*/}
                                    {/*    {company["address"]}*/}
                                    {/*</TableCell>*/}
                                    {customTableCell({ row: rows.find(row => row.id === "city"),
                                        name: "city", onChange })}
                                    {generateIcons(rows.find(row => row.id === "city"))}
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Kod pocztowy:
                                    </TableCell>
                                    {/*<TableCell>*/}
                                    {/*    {company["address"]}*/}
                                    {/*</TableCell>*/}
                                    {customTableCell({ row: rows.find(row => row.id === "zipCode"),
                                        name: "zipCode", onChange })}
                                    {generateIcons(rows.find(row => row.id === "zipCode"))}
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Poczta:
                                    </TableCell>
                                    {/*<TableCell>*/}
                                    {/*    {company["address"]}*/}
                                    {/*</TableCell>*/}
                                    {customTableCell({ row: rows.find(row => row.id === "postOffice"),
                                        name: "postOffice", onChange })}
                                    {generateIcons(rows.find(row => row.id === "postOffice"))}
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Kapitał zakładowy (PLN):
                                    </TableCell>
                                    {/*<TableCell>*/}
                                    {/*    {company["shareCapital"]}*/}
                                    {/*</TableCell>*/}
                                    {customTableCell({ row: rows.find(row => row.id === "shareCapital"), name: "shareCapital", onChange })}
                                    {generateIcons(rows.find(row => row.id === "shareCapital"))}
                                </TableRow>
                                {/*rows.find(row => row.id === "manySharesAllowed")["manySharesAllowed"] == null ||*/}
                                {   rows.find(row => row.id === "manySharesAllowed")["manySharesAllowed"] == null ||
                                    rows.find(row => row.id === "manySharesAllowed")["manySharesAllowed"] === true ?
                                    <TableRow>
                                        <TableCell>
                                            Wartość udziału (PLN): {rows.find(row => row.id === "manySharesAllowed")["manySharesAllowed"]}
                                        </TableCell>
                                        {/*<TableCell>*/}
                                        {/*    {company["address"]}*/}
                                        {/*</TableCell>*/}
                                        {customTableCell({
                                            row: rows.find(row => row.id === "shareValue"),
                                            name: "shareValue", onChange
                                        })}
                                        {generateIcons(rows.find(row => row.id === "shareValue"))}
                                    </TableRow>
                                    : null
                                }
                                <TableRow>
                                    <TableCell>
                                        Kadencja rady nadzorczej (w latach):
                                    </TableCell>
                                    {/*<TableCell>*/}
                                    {/*    {company["boardOfDirectorsTerm"]}*/}
                                    {/*</TableCell>*/}
                                    {customTableCell({ row: rows.find(row => row.id === "boardOfDirectorsTerm"),
                                        name: "boardOfDirectorsTerm", onChange })}
                                    {generateIcons(rows.find(row => row.id === "boardOfDirectorsTerm"))}
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Kadencja zarządu (w latach):
                                    </TableCell>
                                    {/*<TableCell>*/}
                                    {/*    {company["boardMembersTerm"]}*/}
                                    {/*</TableCell>*/}
                                    {customTableCell({ row: rows.find(row => row.id === "boardMembersTerm"),
                                        name: "boardMembersTerm", onChange })}
                                    {generateIcons(rows.find(row => row.id === "boardMembersTerm"))}
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
            </Box>
        </>
    )
}

export default CompanyInfo;