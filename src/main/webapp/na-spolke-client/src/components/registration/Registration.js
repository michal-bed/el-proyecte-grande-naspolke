import { useState } from 'react'
import { Container } from 'react-bootstrap'

const Registration = () => {

    const [userName, userNameSet] = useState("");
    const [userSurname, userSurnameSet] = useState("");
    const [userEmail, userEmailSet] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        const userData = {userName, userSurname, userEmail};

        fetch("http://localhost:8080/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userData)
        }).then(() => console.log("user added"))
    }

    return (
        <Container>
            <div className="registration-header"><h1>Rejestracja</h1></div>
            <div className="registration-form">
                <div className="form-control" onSubmit={onSubmit}>
                    <label>Imię</label>
                    <input type="text" placeholder="Imię..." value={userName} onChange={(e) => userNameSet(e.target.value)}/>
                    <label>Nazwisko</label>
                    <input type="text" placeholder="Nazwisko..." value={userSurname} onChange={(e) => userSurnameSet(e.target.value)}/>
                    <label>E-mail</label>
                    <input type="text" placeholder="E-mail..." value={userEmail} onChange={(e) => userEmailSet(e.target.value)}/>
                </div>
                {/*<div className="form-control form-control-check">*/}
                {/*    <label>Reminder</label>*/}
                {/*    <input type="checkbox" checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>*/}
                {/*</div>*/}
                <input type="submit" value="Save" className="btn btn-block"/>
            </div>
        </Container>

    )
}

export default Registration