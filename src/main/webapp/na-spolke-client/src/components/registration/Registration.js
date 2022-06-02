import { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import ModalTop from "../modal/ModalTop";
import "./Registration.model.css"

const Registration = () => {

    const info = {
        title: "Nieprawidłowe hasło",
        body: "Twoje hasła różnią się od siebie. Wprowadź poprawnie oba hasła."
    }
    const [isOpen, setIsOpen] = useState(false);

    const [userName, userNameSet] = useState("");
    const [userSurname, userSurnameSet] = useState("");
    const [userEmail, userEmailSet] = useState("");
    const [userPassword, userPasswordSet] = useState("");
    const [userPasswordChecker, userPasswordCheckerSet] = useState("");
    const [statute, setStatute] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if (userPassword !== userPasswordChecker) {
            setIsOpen(true);
            userPasswordSet("");
            userPasswordCheckerSet("");
        } else {
            console.log(userPassword);
            console.log(userPasswordChecker);

            const userData = {userName, userSurname, userEmail, userPassword, statute};

            console.log(userData);
            // fetch("http://localhost:8080/register", {
            //     method: "POST",
            //     headers: {"Content-Type": "application/json"},
            //     body: JSON.stringify(userData)
            // }).then(() => {
            //         console.log("user added");
            //     }
            // )
        }
    }

    return (
        <div className="registration-div">
            <Container className="registration-form-header">
                <h1 className="registration-header">Rejestracja</h1>
            </Container><br/>
            <Container className="registration-form-body"><br/>
                <form className="form-control" onSubmit={onSubmit}><br></br>
                    <Row>
                        <Form.Label column="lg" lg={3} className="form-label">Imię:</Form.Label>
                        <Col>
                            <Form.Control className="form-input" type="text" placeholder="Imię..." value={userName} required={true}
                               onChange={(e) => userNameSet(e.target.value)}/>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label column="lg" lg={3} className="form-label">Nazwisko:</Form.Label>
                        <Col>
                            <Form.Control className="form-input" type="text" placeholder="Nazwisko..." value={userSurname} required={true}
                               onChange={(e) => userSurnameSet(e.target.value)}/><br/>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label column="lg" lg={3} className="form-label">E-mail:</Form.Label>
                        <Col>
                            <Form.Control className="form-input" type="text" placeholder="E-mail..." value={userEmail} required={true}
                               onChange={(e) => userEmailSet(e.target.value)}/><br/>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label column="lg" lg={3} className="form-label">Hasło:</Form.Label>
                        <Col>
                            <Form.Control className="form-input" type="password" placeholder="Hasło..." value={userPassword} required={true}
                               onChange={(e) => userPasswordSet(e.target.value)}/><br/>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label column="lg" lg={3} className="form-label">Powtórz hasło:</Form.Label>
                        <Col>
                            <Form.Control className="form-input" type="password" placeholder="Powtórz hasło..." value={userPasswordChecker} required={true}
                                onChange={(e) => userPasswordCheckerSet(e.target.value)}/><br/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Check className="form-input" type="switch" checked={statute}
                                label="Zapoznałem się z treścią regulaminu" variant="dark" required={true}
                                onChange={(e) => setStatute(e.currentTarget.checked)}/><br/>
                        </Col>
                    </Row>
                        <Button variant="primary" size="lg" className="btn btn-block" type="submit">Załóż konto</Button><br/>
                        {isOpen && <ModalTop info={info} isOpen={isOpen} />}<br/>
                </form><br/>
            </Container>
        </div>
    )
}

export default Registration