import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import ModalTop from "../modal/ModalTop";
import "./Registration.model.css"
import {useLocation, useNavigate} from "react-router-dom";

const Registration = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const wrongPassword = {
        title: "Nieprawidłowe hasło",
        text: "Twoje hasła różnią się od siebie. Wprowadź poprawnie oba hasła."
    }
    const userExist = {
        title: "Adres e-mail istnieje",
        text: "Użytkownik o podanym adresie e-mail istnieje w naszej bazie."
    }
    const userCreated = {
        title: "Witamy w naszym gronie!",
        text: "Udało Ci się pomyślnie zalogować. Teraz możesz poznać pełnie naszych możliwości."
    }

    const [isOpenForPassword, setIsOpenForPassword] = useState(false);
    const [isOpenForUser, setIsOpenForUser] = useState(false);
    const [isOpenForCreatedUser, setIsOpenForCreatedUser] = useState(false);
    const backToPreviousPasswordState = () => setIsOpenForPassword(false);
    const backToPreviousUserState = () => setIsOpenForUser(false);

    const [userName, userNameSet] = useState("");
    const [userSurname, userSurnameSet] = useState("");
    const [userEmail, userEmailSet] = useState("");
    const [userPassword, userPasswordSet] = useState("");
    const [userPasswordChecker, userPasswordCheckerSet] = useState("");
    const [statute, setStatute] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if (userPassword !== userPasswordChecker) {
            setIsOpenForPassword(true);
            setTimeout(backToPreviousPasswordState, 4000);
            userPasswordSet("");
            userPasswordCheckerSet("");
        } else {
            const userData = {userName, userSurname, userEmail, userPassword, statute};

            fetch("http://localhost:8080/registration/", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(userData)
            }).then(response => {
                console.log(userData)
            if (response.status === 200) {
                setIsOpenForCreatedUser(true);
                navigate(from, { replace: true });
                console.log(response.blob())
                return response.blob();
            } else {
                setIsOpenForUser(true);
                setTimeout(backToPreviousUserState, 4000);
                throw new Error('User already exist');
            }
            }).catch(() => {
                userNameSet(""); userSurnameSet(""); userEmailSet("");
                userPasswordSet(""); userPasswordCheckerSet(""); setStatute(false);
            });
        }
    }

    return (
        <div className="registration-div">
            <Container className="registration-form-header">
                <h1 className="registration-header">Rejestracja</h1>
            </Container><br/>
            <Container className="registration-form-body"><br/>
                <form className="form-control" onSubmit={onSubmit}><br/>
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
                        {isOpenForPassword && <ModalTop info={wrongPassword} />}
                        {isOpenForUser && <ModalTop info={userExist} />}
                        {isOpenForCreatedUser && <ModalTop info={userCreated} />}
                </form><br/>
            </Container>
        </div>
    )
}

export default Registration