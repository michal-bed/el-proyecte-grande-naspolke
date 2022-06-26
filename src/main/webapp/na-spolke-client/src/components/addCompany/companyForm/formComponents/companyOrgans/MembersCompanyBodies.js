import {Button, TextField} from "@material-ui/core";
import {useContext, useEffect, useState} from "react";
import {BoardMember} from "../../../../../classes/persons/BoardMember";
import {BoardOfDirector} from "../../../../../classes/persons/BoardOfDirector";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import validatePartners from "./ValidationCompanyOrgans";
import {Box, Card, CardContent, Grid} from "@mui/material";
import styles from "./MembersCompanyBodies.module.css";
import {CompanyContext} from "../../CompanyContext";

const MembersCompanyBodies = (props) => {
    const companyData = useContext(CompanyContext)
    console.log(companyData)
    const [memberBody, setMemberBody] = useState("")

    useEffect(()=> {
        let delay = setTimeout(()=> {
            const hasErrors = checkForErrors()
            const action = {
                pageType: props.pageType,
                memberBody: memberBody,
                hasErrors: hasErrors
            }
            companyData.passNewData(action)
        },1000)
        return ()=> {clearTimeout(delay)}
    }, [memberBody])

    if (memberBody.length=== 0 || memberBody.length===null) {
        if (memberBody!== (props.pageType==="board" ? companyData.state.company.boardMembers :
            companyData.state.company.boardOfDirectors)) {
            setMemberBody(props.pageType === "board" ? companyData.state.company.boardMembers :
                companyData.state.company.boardOfDirectors)
        }
        return <div>
            <div>Brak Organu!</div>
            <Button
                onClick={addCompanyBodyMember}>Dodaj {props.pageType === "board" ? "członka zarządu" : "członka rady nadzorczej"}</Button>
            {/*<div>*/}
            {/*    <Button disabled={props.prev} onClick={() => changePageHandler(-1)}>Wstecz</Button>*/}
            {/*    <Button disabled={props.next} onClick={() => changePageHandler(1)}>Dalej</Button>*/}
            {/*</div>*/}
        </div>
    } else if (memberBody.length === 0) {
        const v = []
        for (let i = 0; i < props.companyBodies.length; i++) {
            v.push({
                firstName: props.companyBodies[i].firstName,
                secondName: props.companyBodies[i].secondName,
                lastNameI: props.companyBodies[i].lastNameI,
                lastNameII: props.companyBodies[i].lastNameII,
                function: props.companyBodies[i].hasOwnProperty("function") ? props.companyBodies[i].function : null
            })
        }
        setMemberBody(v)
    } else if (Object.keys(memberBody[0]).includes("function") && props.pageType=== "directors"){
        setMemberBody(companyData.state.company.boardOfDirectors)
    } else if (!Object.keys(memberBody[0]).includes("function") && props.pageType=== "board"){
        setMemberBody(companyData.state.company.boardMembers)}


    function addCompanyBodyMember() {
        let blankNewDirectorData = {firstName: "", secondName: null, lastNameI: "", lastNameII: null,};
        switch (props.pageType) {
            case "board" : {
                blankNewDirectorData.function = "CZŁONEK ZARZĄDU";
                let bodyList = [...memberBody]
                bodyList.push(blankNewDirectorData)
                setMemberBody(bodyList);
                break;
            }
            case "directors" : {
                let boardOfDirectors = [...memberBody];
                boardOfDirectors.push(blankNewDirectorData);
                setMemberBody(boardOfDirectors);
                break;
            }
            default:
                break;
        }
    }


    function displayMemberFunction(index, member) {
        if (member.hasOwnProperty("function")) {
            return <Box sx={{gridArea: 'function', display: 'inline-grid'}} className={styles["Box"]}><TextField
                label="Funkcja"
                name="function"
                variant="filled"
                defaultValue={member.function}
                error={validatePartners({function: member.function}).hasOwnProperty("function")}
                helperText={validatePartners({function: member.function}).function}
                onChange={event => handleChangeInput(index, event)}
            /></Box>
        }
    }

    function handleChangeInput(index, e) {
        const values = [...memberBody];
        values[index][e.target.name] = e.target.value;
        setMemberBody(values);
    }

    function createMemberBodyList() {
        switch (props.pageType) {
            case "board": {
                const boardMember = [];
                memberBody.map(member => {
                    const person = new BoardMember(member);
                    boardMember.push(person);
                })
                return boardMember;
            }
            case "directors": {
                const boardOfDirectors = [];
                memberBody.map(member => {
                    const person = new BoardOfDirector(member);
                    boardOfDirectors.push(person);
                })
                return boardOfDirectors;
            }
            default:
                return;
        }
    }

    function checkForErrors() {
        for (let i = 0; i < memberBody.length; i++) {
            const errors = validatePartners(memberBody[i]);
            if ((Object.keys(errors).length > 3 && props.pageType === "board") || (Object.keys(errors).length > 4 && props.pageType === "directors"))
                return true
        }
        return false;
    }

    function changePageHandler(pageChange) {
        const bodyList = createMemberBodyList()
        const containsError = checkForErrors();
        props.changePage(bodyList, props.pageType, pageChange, containsError)
    }

    function handleBodyMemberList(index) {
        let newMemberList = [...memberBody];
        newMemberList.splice(index, 1);
        setMemberBody(newMemberList);
    }

    return <Box>
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 1,
            gridTemplateRows: 'auto',
            gridTemplateAreas: `"header header "`,
            margin: 'auto'
        }}>
            {memberBody.map((member, index) => (
                <div key={index}>
                    <Card sx={{minWidth: 275, width: '95%', height: '100%', margin: "auto"}}>
                        <CardContent>
                            <Grid sx={{
                                display: 'grid',
                                gridTemplateColumns: `repeat(2, 1fr)`,
                                gap: 1,
                                gridTemplateRows: 'auto',
                                gridTemplateAreas: `"lastNameI lastNameII "
                        "firstName secondName"
                        "function function"`,
                            }}>
                                <Box sx={{gridArea: 'lastNameI'}} className={styles["Box"]}><TextField
                                    label="Nazwisko"
                                    name="lastNameI"
                                    variant="filled"
                                    defaultValue={member.lastNameI}
                                    error={validatePartners({lastNameI: member.lastNameI}).hasOwnProperty("lastNameI")}
                                    helperText={validatePartners({lastNameI: member.lastNameI}).lastNameI}
                                    onChange={event => handleChangeInput(index, event)}
                                /></Box>
                                <Box sx={{gridArea: 'lastNameII'}} className={styles["Box"]}><TextField
                                    label="Nazwisko (drugi człon)"
                                    name="lastNameII"
                                    variant="filled"
                                    defaultValue={member.lastNameII}
                                    error={validatePartners({lastNameII: member.lastNameII}).hasOwnProperty("lastNameII")}
                                    helperText={validatePartners({lastNameII: member.lastNameII}).lastNameII}
                                    onChange={event => handleChangeInput(index, event)}
                                /></Box>
                                <Box sx={{gridArea: 'firstName'}} className={styles["Box"]}><TextField
                                    label="Imię"
                                    name="firstName"
                                    variant="filled"
                                    defaultValue={member.firstName}
                                    error={validatePartners({firstName: member.firstName}).hasOwnProperty("firstName")}
                                    helperText={validatePartners({firstName: member.firstName}).firstName}
                                    onChange={event => handleChangeInput(index, event)}
                                /></Box>
                                <Box sx={{gridArea: 'secondName'}} className={styles["Box"]}><TextField
                                    label="Drugie imię"
                                    name="secondName"
                                    variant="filled"
                                    defaultValue={member.secondName}
                                    error={validatePartners({secondName: member.secondName}).hasOwnProperty("secondName")}
                                    helperText={validatePartners({secondName: member.secondName}).secondName}
                                    onChange={event => handleChangeInput(index, event)}
                                /></Box>

                                {displayMemberFunction(index, member)}

                                <div>
                                    <Button variant="outlined" startIcon={<PersonRemoveIcon/>}
                                            onClick={() => handleBodyMemberList(index)}>Usuń</Button>
                                </div>
                            </Grid></CardContent></Card>
                </div>
            ))
            }
        </Box>
        <div>
            <Button
                onClick={addCompanyBodyMember} startIcon={
                <PersonAddIcon/>}>Dodaj {props.pageType === "board" ? "członka zarządu" : "członka rady nadzorczej"}</Button>
        </div>
        {/*<div>*/}
        {/*    <Button disabled={props.prev} onClick={() => changePageHandler(-1)}>Wstecz</Button>*/}
        {/*    <Button disabled={props.next} onClick={() => changePageHandler(1)}>Dalej</Button>*/}
        {/*</div>*/}
    </Box>
}
export default MembersCompanyBodies;