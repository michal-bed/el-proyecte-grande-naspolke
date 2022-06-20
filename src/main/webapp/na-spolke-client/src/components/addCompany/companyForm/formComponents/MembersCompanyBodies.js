import {Button, Container, TextField} from "@material-ui/core";
import {useState} from "react";
import {BoardMember} from "../../../../classes/persons/BoardMember";
import {BoardOfDirector} from "../../../../classes/persons/BoardOfDirector";

const MembersCompanyBodies = (props) => {
    const [memberBody, setMemberBody] = useState([
    ])

    if (props.companyBodies===null || props.companyBodies.length === 0) {
        return <div>
            <div>Brak Organu!</div>
            <Button>Dodaj osobę</Button>
        </div>
    } else if (memberBody.length===0){
       const v = []
        for (let i = 0; i < props.companyBodies.length; i++) {
            v.push({firstName: props.companyBodies[i].firstName,
                secondName: props.companyBodies[i].secondName,
                lastNameI:props.companyBodies[i].lastNameI,
                lastNameII:props.companyBodies[i].lastNameII,
                function:props.companyBodies[i].hasOwnProperty("function") ? props.companyBodies[i].function : null})
        }
        setMemberBody(v)
    }

    function displayMemberFunction(index, member) {
        if (member.function!==null) {
            return   <TextField
                label="Funkcja"
                name="function"
                variant="filled"
                defaultValue={member.function}
                onChange={event => handleChangeInput(index, event)}
            />
        }
    }

    function handleChangeInput(index, e){
        const values = [...memberBody];
        values[index][e.target.name] = e.target.value;
        console.debug(values);
        setMemberBody(values);
    }

    function createMemberBodyList() {
        switch (props.pageType) {
            case "board":{
                const boardMember = [];
                memberBody.map(member => {
                    const person = new BoardMember(member);
                    boardMember.push(person);
                })
                console.debug(boardMember);
                return boardMember;
            }
            case "directors":{
                const boardOfDirectors = [];
                memberBody.map(member => {
                    const person = new BoardOfDirector(member);
                    boardOfDirectors.push(person);
                })
                console.debug(boardOfDirectors);
                return boardOfDirectors;
            }
        }
    }

    function switchNextPage(){
        const bodyList = createMemberBodyList()
        props.changePage(bodyList, props.pageType, 1)

    }

    function switchPrevPage(){
        const bodyList = createMemberBodyList()
        props.changePage(bodyList, props.pageType, -1)
    }
    return <Container>
        {memberBody.map((member, index) => (
            <div key={index}>
                <TextField
                    label="Nazwisko (pierwszy człon)"
                    name="lastNameI"
                    variant="filled"
                    defaultValue={member.lastNameI}
                    onChange={event => handleChangeInput(index, event)}
                />
                <TextField
                    label="Nazwisko (drugi człon)"
                    name="lastNameII"
                    variant="filled"
                    defaultValue={member.lastNameII}
                    onChange={event => handleChangeInput(index, event)}
                />
                <TextField
                    label="Imię"
                    name="firstName"
                    variant="filled"
                    defaultValue={member.firstName}
                    onChange={event => handleChangeInput(index, event)}
                />
                <TextField
                    label="Drugie imię"
                    name="secondName"
                    variant="filled"
                    defaultValue={member.secondName}
                    onChange={event => handleChangeInput(index, event)}
                />

                {displayMemberFunction(index, member)}
            </div>
        ))
        }
        <div><Button>Dodaj osobę</Button></div>
        <div>
            <Button disabled={props.prev} onClick={switchPrevPage}>Wstecz</Button>
            <Button disabled={props.next} onClick={switchNextPage}>Dalej</Button>
        </div>
    </Container>
}
export default MembersCompanyBodies;
    //
    // function checkForAdditionalData(dataToCheck, labelTitle) {
    //     if (dataToCheck) {
    //         return <div>
    //             <label>{labelTitle}</label>
    //             <input defaultValue={dataToCheck}/>
    //         </div>
    //     }
    // }
