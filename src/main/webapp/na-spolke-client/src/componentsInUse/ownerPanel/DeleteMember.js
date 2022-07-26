import React, {useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import ModalTop from "../modal/ModalTop";

const DeleteMember = () => {

    const memberDeleted = {
        title: "Użytkownik usunięty",
        text: "Udało sie pomyślnie usunąć użytkownika z Twojej spółki."
    }

    const [isOpenForDeleted, setIsOpenForDeleted] = useState(false);
    const backToPreviousDeletedState = () => setIsOpenForDeleted(false);

    const [companyId, setCompanyId] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const Delete = (e) => {
        e.preventDefault();
        const userData = {companyId, userEmail};
        fetch("http://localhost:8080/delete-member", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userData)
        }).then(response => {
            if (response.status === 200) {
                setIsOpenForDeleted(true);
                setTimeout(backToPreviousDeletedState, 4000);
                return response.blob();
            } else {
                throw new Error("Can't delete member!");
            }
        }).catch(() => {
            console.log("Something went wrong!")
        });
    }

    return (
        <div className="delete-member-div">
            <Container className="delete-member">
                <form className="form-control" onSubmit={Delete}>
                    <Form.Control className="krs-input" type="text" placeholder="Id spółki..." value={companyId} required={true}
                                  onChange={(e) => setCompanyId(e.target.value)}/>
                    <Form.Control className="email-input" type="text" placeholder="Email..." value={userEmail} required={true}
                                  onChange={(e) => setUserEmail(e.target.value)}/>
                    <Button variant="primary" size="md" className="btn btn-block" type="submit">Usuń ze spółki</Button>
                    {isOpenForDeleted && <ModalTop info={memberDeleted} />}
                </form>
            </Container>
        </div>
    )
}

export default DeleteMember
