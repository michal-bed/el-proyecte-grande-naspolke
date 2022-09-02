import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {getCompanyById, getCompanyRole} from "../../handlers/CompanyDataHandler";
import {
    CardHeader,
    createTheme,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    ThemeProvider
} from "@mui/material";
import {Button, Card, Paper, Typography,} from "@material-ui/core";

import Input from "@material-ui/core/Input";
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import {useEffect, useState} from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import EventsCalendar from "../../../calendar/EventsCalendar";
import Box from "@mui/material/Box";
import validateAddress from "../../../addCompany/companyForm/formComponents/baseInfo/addressCard/ValidationAddress";
import validateBaseInfo from "../../../addCompany/companyForm/formComponents/baseInfo/ValidateBaseInfo";

let dontChangePrevious = false;
function CompanyInfo() {

    const [company, setCompany] = useState(null);
    const [rows, setRows] = useState(null)
    const [editable, setEditable] = useState(false)
    let {companyId} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/userpanel";
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        if (companyId != null) {
            getCompanyById(companyId).then(res => {
                setCompany(res.data)
            });
            console.log("Initializing")
            console.log(company)
            getCompanyRole(companyId).then(res =>
            {
                if (res.data === "") {
                    navigate(from, {replace: true});
                }
                console.log(`Company Role: ${res.data}`);
                setEditable(res.data === "OWNER" || res.data === "EDITOR");
                console.log("Editable: " + (res.data === "OWNER" || res.data === "EDITOR" ? "true" : "false"))
            })

        }
    }, [companyId])

    useEffect(() => {

        if (company != null && company.address != null) {
            company.streetName = company.address.streetName;
            company.streetNumber = company.address.streetNumber;
            company.localNumber = company.address.localNumber;
            company.city = company.address.city;
            company.zipCode = company.address.zipCode;
            company.postOffice = company.address.postOffice;

            setRows([
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
        }
    }, [company])

    const setValidationInputName = (row) =>
    {
        if (row?.id !== "companyName" && row != null) {
            const result = row.id + "Input";
            console.log(result);
            return result;
        }
        console.log(row?.id)
        return row?.id;
    }

    const titleCardStyle = {
        marginLeft: "10%",
        marginRight: "10%",
        minWidth: "500px",
        marginTop: "30px",
        marginBottom: "80px"
    };

    const infoCardStyle = {
        minWidth: "460px",
        marginLeft: "3%",
        marginRight: "3%",
        marginBottom: "5%",

    };

    const memberCardStyle = {
        minWidth: "460px",
        height: "376px",
        minHeight: "300px",
        marginLeft: "3%",
        marginRight: "3%",
        textAlign: "center"
    };

    const calendar = {
        minWidth: "460px",
        minHeight: "285px",
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
        textAlign: "left",
    }

    const createData = (name, ...rest) => ({
        id: name,
        [name]: name === "boardMembersTerm" || name === "boardOfDirectorsTerm"
            ? parseFloat(company[name]) : company[name],
        ...rest,
        isEditMode: false
    });

    function getErrorInfo(name, validationInputName, row) {
        let error = false;
        let errorMsg = null;
        if (name === "streetName" || name === "streetNumber" || name === "localNumber" ||
            name === "city" || name === "zipCode" || name === "postOffice") {
            error = validateAddress({[validationInputName]: row != null ? row[name] : null})
                .hasOwnProperty(validationInputName)
            errorMsg = validateAddress({[validationInputName]: row != null ? row[name] : null})[validationInputName]
        }
        else {
            error = validateBaseInfo({[validationInputName]: row != null ? row[name] : null})
                .hasOwnProperty(validationInputName)
            errorMsg = validateBaseInfo({[validationInputName]: row != null ? row[name] : null})[validationInputName]
        }
        return {error, errorMsg};
    }

    const customTableCell = ({row, name, onChange}) => {
        const validationInputName = setValidationInputName(row);

        // const errorInfo = getErrorInfo(name, validationInputName, row);

        const theme = createTheme({
            palette: {
                text: {
                    disabled: getErrorInfo(name, validationInputName, row).error ? '#d32f2f' : 'black'
                },
                border: {
                    bottom: 'none'
                }
            },
        });
        // const classes = useStyles();
        if (row != null)
            var {isEditMode} = row;
        return (
            <TableCell align="left"
                // className={classes.tableCell}
            >
                {isEditMode ? (
                    // <Input
                    //     value={row[name]}
                    //     name={name}
                    //     onChange={e => onChange(e, row)}
                    //     // className={classes.input}
                    // />
                    <ThemeProvider theme={theme}>
                        <TextField
                            variant="standard"
                            InputProps={{ inputProps: { style: { wordWrap: "break-word", color: getErrorInfo(name, validationInputName, row).error ? '#d32f2f' : 'black' }}}}
                            name={name}
                            value={row != null ? row[name] : ""}
                            defaultValue={row != null ? row[name] : ""}
                            onChange={e => onChange(e, row)}
                            error = {getErrorInfo(name, validationInputName, row).error}
                            helperText={getErrorInfo(name, validationInputName, row).errorMsg}
                            disabled={false}
                            multiline={true}
                        />
                   </ThemeProvider>
                ) : (
                    getErrorInfo(name, validationInputName, row).error ?
                        (<ThemeProvider theme={theme}>
                            <TextField
                                variant="standard"
                                disableUnderline={true}
                                name={name}
                                value={row != null ? row[name] : ""}
                                defaultValue={row != null ? row[name] : ""}
                                disabled={true}
                                multiline={true}
                                onChange={e => onChange(e, row)}
                                error = {getErrorInfo(name, validationInputName, row).error}
                                helperText={getErrorInfo(name, validationInputName, row).errorMsg}
                                InputProps={{ inputProps: { style: { wordWrap: "break-word", color: getErrorInfo(name, validationInputName, row).error ? '#d32f2f' : 'black', border: 'none'}}}}
                            />
                        </ThemeProvider>)
                    :
                    (<ThemeProvider theme={theme}>
                        <TextField
                            variant="outlined"
                            sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
                            disableUnderline={true}
                            name={name}
                            value={row != null ? row[name] : ""}
                            defaultValue={row != null ? row[name] : ""}
                            multiline={true}
                            disabled={true}
                            onChange={e => onChange(e, row)}
                            error = {getErrorInfo(name, validationInputName, row).error}
                            helperText={getErrorInfo(name, validationInputName, row).errorMsg}
                            InputProps={{ inputProps: { style: { wordWrap: "break-word", color: getErrorInfo(name, validationInputName, row).error ? '#d32f2f' : 'black', border: 'none'}}}}
                        />
                    </ThemeProvider>)
                )}
            </TableCell>
        );
    };

    const [previous, setPrevious] = useState({});
    const onDoneEditMode = id => {
        onToggleEditMode(id);
        setPrevious(state => ({...state, [id]:
                ((id === "boardOfDirectorsTerm" || id === "boardMembersTerm" ||
                        id === "shareValue" || id === "shareCapital")
                    && rows.find(row => row.id === id)[id].toString().replace(/\s/g, '').length !== 0)
                    ? {...(rows.find(row => row.id === id)), [id] : parseInt(rows.find(row => row.id === id)[id])}
                    : (id === "boardOfDirectorsTerm" || id === "boardMembersTerm" ||
                        id === "shareValue" || id === "shareCapital") &&
                        getErrorInfo(id, setValidationInputName(id), rows.find(row => row.id === id)).error
                        ?
                        {...state[id]}
                        :
                        getErrorInfo(id, setValidationInputName(id), rows.find(row => row.id === id)).error
                            ? {...state[id]}
                            : {...(rows.find(row => row.id === id))}

                        }));
        if (id === "streetName" || id === "streetNumber" || id === "localNumber"
            || id === "city" || id === "zipCode" || id === "postOffice") {
            axiosPrivate.patch("/update-company-address",
                {
                    [id]: rows.find(row => row.id === id)[id],
                    "companyId": companyId
                })
                .then(() => {
                    console.log("Updated address")
                });
        } else if (id === "companyName") {
            axiosPrivate.get(`/companies/search/updateCompanyName?companyName=`
                + `${rows.find(row => row.id === id)[id]}&companyId=${companyId}`)
                .then(() => {
                    console.log("updated company name")
                }).catch(console.log);
        } else if (id === "shareCapital" &&
            !getErrorInfo(id, "shareCapitalInput",
                rows.find(row => row.id === id)).error) {
            const value = parseInt(rows.find(row => row.id === id)[id])
            setRows(prev => prev.map(
                row =>
                {
                    if (row.id === id)
                    {
                        return {...row, [id]: value};
                    }
                    return row;
                }

            ))
            axiosPrivate.get(`/companies/search/updateShareCapital?shareCapital=`
                + `${value}&companyId=${companyId}`)
                .then(() => {
                    console.log("updated share capital")
                }).catch(console.log);
        } else if (id === "shareCapital" &&
            getErrorInfo(id, "shareCapitalInput",
                rows.find(row => row.id === id)).error) {
            console.log("Nie zapisano. Błędny format")
            onRevert(id)
        } else if (id === "boardOfDirectorsTerm"
            && !getErrorInfo(id, "boardOfDirectorsTermInput",
                rows.find(row => row.id === id)).error) {
            const value = parseInt(rows.find(row => row.id === id)[id])
            setRows(prev => prev.map(
                row =>
                {
                    if (row.id === id)
                    {
                        return {...row, [id]: value};
                    }
                    return row;
                }

            ))
            axiosPrivate.get(`/companies/search/updateBoardOfDirectorsTerm?boardOfDirectorsTerm=`
                + `${value}&companyId=${companyId}`)
                .then(() => {
                    console.log("updated board of directors term")
                }).catch(console.log);
        }
        else if (id === "boardOfDirectorsTerm" &&
            getErrorInfo(id, "boardOfDirectorsTermInput",
                rows.find(row => row.id === id)).error) {
            console.log("Nie zapisano. Błędny format")
            onRevert(id)
        }
        else if (id === "boardMembersTerm"
            && !getErrorInfo(id, "boardMembersTermInput",
                rows.find(row => row.id === id)).error) {
            const value = parseInt(rows.find(row => row.id === id)[id])
            setRows(prev => prev.map(
                row =>
                {
                    if (row.id === id)
                    {
                        return {...row, [id]: value};
                    }
                    return row;
                }

            ))
            axiosPrivate.get(`/companies/search/updateBoardMembersTerm?boardMembersTerm=`
                + `${value}&companyId=${companyId}`)
                .then(() => {
                    console.log("updated board members term")
                }).catch(console.log);
        }
        else if (id === "boardMembersTerm" &&
            getErrorInfo(id, "boardMembersTermInput",
                rows.find(row => row.id === id)).error) {
            console.log("Nie zapisano. Błędny format")
            onRevert(id);
        } else if (id === "shareValue" &&
            !getErrorInfo(id, "shareValueInput",
                rows.find(row => row.id === id)).error) {
            const value = parseInt(rows.find(row => row.id === id)[id])
            setRows(prev => prev.map(
                row =>
                {
                    if (row.id === id)
                    {
                        return {...row, [id]: value};
                    }
                    return row;
                }

            ))
            axiosPrivate.get(`/companies/search/updateShareValue?shareValue=`
                + `${value}&companyId=${companyId}`)
                .then(() => {
                    console.log("updated share value")
                }).catch(console.log);
        }
        else if (id === "shareValue" &&
            getErrorInfo(id, "shareValueInput",
                rows.find(row => row.id === id)).error) {
            console.log("Nie zapisano. Błędny format")
            onRevert(id)
        }
        company[id] = rows.find(row => row.id === id)[id];
    }
    const onToggleEditMode = id => {
        if (rows != null) {
            setRows(rows => {
                return rows.map(row => {
                    if (row?.id === id) {
                        return {...row, isEditMode: !row.isEditMode};
                    }
                    return row;
                });
            });
        }
    };

    const onToggleEditMode2 = (id, newRows) => {
            if (newRows != null) {
                setRows(newRows.map(row => {
                    if (row?.id === id) {
                        console.log("Updated: " + JSON.stringify(row))
                        console.log("Next: " + JSON.stringify(
                            {...row, isEditMode: !row.isEditMode}))
                        return {...row, isEditMode: !row.isEditMode};
                    }
                    return row;
                }));
            }
        }

        // const changeInputValue = (id) =>
        // {
        //     // const input = document.querySelector(`textarea[name="${id}"]`)
        //     // const newValue = previous[id][id];
        //     // input.value = newValue
        //     // setRows(rows => {
        //     //     rows.map(row => {
        //     //             if (row.id === id) {
        //     //                 return {...row, [id]: newValue};
        //     //             }
        //     //             return row;
        //     //         })})
        //     dontChangePrevious = true;
        // }
    const onChange = (e, row) => {
        console.log("onChange")
        // !dontChangePrevious
        if ( !previous[row.id]) {
            setPrevious(state => ({...state,
                [row.id]:
                    (((row.id === "boardOfDirectorsTerm" || row.id === "boardMembersTerm" ||
                      row.id === "shareValue" || row.id === "shareCapital")
                        && row[row.id].toString().replace(/\s/g, '').length !== 0)
                            ? {...row, [row.id] : parseInt(row[row.id])}
                            : (id === "boardOfDirectorsTerm" || id === "boardMembersTerm" ||
                                id === "shareValue" || id === "shareCapital") &&
                            getErrorInfo(id, setValidationInputName(id), row).error
                                ? {...state[id]}
                                :
                                getErrorInfo(id, setValidationInputName(id), row).error
                                    ? {...state[id]}
                                    : {...row}
                    )
            }));
        }
        let value = e.target.value;
        const name = e.target.name;
        const {id} = row;
        const newRows = rows.map(row => {
            if (row.id === id) {
                return {...row, [name]: value};
            }
            return row;
        });
        if (!dontChangePrevious)
        {
            console.log(dontChangePrevious);
            console.log("Set last state");
            setRows(newRows);
        }
        else
        {
            // console.log("Set previous state")
            // const previousRows = rows.map(row => {
            //
            //     return {...row, [name]: previous[id][name]};
            //
            // });
            // setPrevious(previousRows)
            // changeInputValue(id)
            dontChangePrevious = false;
        }
    };

    const onRevert = id => {
        console.log("ONREVERT")
        const newRows = rows.map(row => {
            // while (previous[id] == null) {
                if (row.id === id && previous[id] != null) {
                    console.log("Previous state of " + id + ": " + previous[id][id])
                    return previous[id] ? {...previous[id]} : {...row};
                }
                else if (previous[id] != null)
                {
                    return row;
                }
                else
                    console.log("Couldn't find " + id)
            // }
        });
        console.log("Set previous state")
        // const previousRows = rows.map(row => {
        //
        //     return {...row, [id]: previous[id][id]};
        //
        // });
        // setRows(previousRows)
        // setRows(newRows);
        // dontChangePrevious = true;
        setPrevious(state => {
            delete state[id];
            return state;
        });
        onToggleEditMode2(id, newRows);
        // changeInputValue(id);
    };

    const generateIcons = (row) => (
        row?.isEditMode ? (
            <>
                <IconButton
                    aria-label="done"
                    onClick={() => onDoneEditMode(row.id)}
                >
                    <DoneIcon/>
                </IconButton>
                <IconButton
                    aria-label="revert"
                    onClick={() => onRevert(row.id)}
                >
                    <RevertIcon/>
                </IconButton>
            </>
        ) : (
            <IconButton
                disabled={!editable}
                aria-label="edit"
                onClick={() => onToggleEditMode(row.id)}
            >
                <EditIcon/>
            </IconButton>
        ));

    return (
        company != null && rows != null &&
        <>
        <Card style={titleCardStyle}>
            <Typography variant="h4" align="center">
                {company['companyName']}<br/>
            </Typography>
        </Card>
            <TableContainer component={Paper} style={tableStyle}>
                <Table>
                        <TableBody>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Grid sx={{
                                marginTop: "2%",
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: 3,
                                gridTemplateRows: 'auto',
                                gridTemplateAreas: `"header address"
                                                    "info members"
                                                    "calendar ."`,
                            }}>
                                <Card style={infoCardStyle} sx={{gridArea: 'header'}}>
                                    <CardHeader
                                        title="Informacje o Spółce"
                                        titleTypographyProps={{align: 'center'}}
                                    />
                                    <TableRow>
                                        <TableCell>
                                            Nazwa spółki:
                                        </TableCell>
                                        {customTableCell({
                                            row: rows?.find(row => row?.id === "companyName"),
                                            name: "companyName", onChange
                                        })}
                                        {generateIcons(rows?.find(row => row?.id === "companyName"))}
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
                                </Card>

                                <Card style={infoCardStyle} sx={{gridArea: 'address'}}><TableRow>
                                    <TableCell>
                                        Ulica:
                                    </TableCell>
                                    {customTableCell({
                                        row: rows?.find(row => row?.id === "streetName"),
                                        name: "streetName", onChange
                                    })}
                                    {generateIcons(rows?.find(row => row?.id === "streetName"))}
                                </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Numer budynku:
                                        </TableCell>
                                        {customTableCell({
                                            row: rows?.find(row => row?.id === "streetNumber"),
                                            name: "streetNumber", onChange
                                        })}
                                        {generateIcons(rows?.find(row => row?.id === "streetNumber"))}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Numer lokalu:
                                        </TableCell>
                                        {customTableCell({
                                            row: rows?.find(row => row?.id === "localNumber"),
                                            name: "localNumber", onChange
                                        })}
                                        {generateIcons(rows?.find(row => row?.id === "localNumber"))}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Miejscowość:
                                        </TableCell>
                                        {customTableCell({
                                            row: rows?.find(row => row?.id === "city"),
                                            name: "city", onChange
                                        })}
                                        {generateIcons(rows?.find(row => row?.id === "city"))}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Kod pocztowy:
                                        </TableCell>

                                        {customTableCell({
                                            row: rows?.find(row => row?.id === "zipCode"),
                                            name: "zipCode", onChange
                                        })}
                                        {generateIcons(rows?.find(row => row?.id === "zipCode"))}
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>
                                            Poczta:
                                        </TableCell>

                                        {customTableCell({
                                            row: rows?.find(row => row?.id === "postOffice"),
                                            name: "postOffice", onChange
                                        })}
                                        {generateIcons(rows?.find(row => row?.id === "postOffice"))}
                                    </TableRow>
                                </Card>

                                <Card style={infoCardStyle} sx={{gridArea: 'info'}}>
                                    <TableRow>
                                        <TableCell>
                                            Kapitał zakładowy (PLN):
                                        </TableCell>

                                        {customTableCell({
                                            row: rows?.find(row => row?.id === "shareCapital"),
                                            name: "shareCapital",
                                            onChange
                                        })}
                                        {generateIcons(rows?.find(row => row?.id === "shareCapital"))}
                                    </TableRow>
                                    {rows?.find(row => row?.id === "manySharesAllowed")["manySharesAllowed"] === true ?
                                        <TableRow>
                                            <TableCell>
                                                Wartość udziału (PLN):
                                            </TableCell>
                                            {customTableCell({
                                                row: rows?.find(row => row?.id === "shareValue"),
                                                name: "shareValue", onChange
                                            })}
                                            {generateIcons(rows?.find(row => row?.id === "shareValue"))}
                                        </TableRow>
                                        : null
                                    }
                                    <TableRow>
                                        <TableCell>
                                            Kadencja zarządu (w latach):
                                        </TableCell>

                                        {customTableCell({
                                            row: rows?.find(row => row?.id === "boardOfDirectorsTerm"),
                                            name: "boardOfDirectorsTerm", onChange
                                        })}
                                        {generateIcons(rows?.find(row => row?.id === "boardOfDirectorsTerm"))}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Kadencja rady nadzorczej (w latach):
                                        </TableCell>

                                        {customTableCell({
                                            row: rows?.find(row => row?.id === "boardMembersTerm"),
                                            name: "boardMembersTerm", onChange
                                        })}
                                        {generateIcons(rows?.find(row => row?.id === "boardMembersTerm"))}
                                    </TableRow>
                                </Card>
                                <Card style={memberCardStyle} sx={{gridArea: 'members'}}>
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
                                <Box style={calendar} sx={{gridArea: 'calendar'}}>
                                    <EventsCalendar />
                                </Box>
                            </Grid>
                        {/*</Box>*/}
                        </div>
                </TableBody>
            </Table>
    </TableContainer>
</>)
}

export default CompanyInfo;
