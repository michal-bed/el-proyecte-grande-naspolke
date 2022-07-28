import {Button, Container, Form} from "react-bootstrap";
import React, {useState} from "react";
import ModalTop from "../modal/ModalTop";

const ChangeRole = () => {

    const roleChanged = {
        title: "Rola zmieniona",
        text: "Udało sie pomyślnie zmienić rolę w spółce dla wskazanego użytkownika."
    }

    const [isOpenForChanged, setIsOpenForChanged] = useState(false);
    const backToPreviousChangedState = () => setIsOpenForChanged(false);

    const [companyId, setCompanyId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [roleType, setRoleType] = useState('');

    const Change = (e) => {
        e.preventDefault();
        const userData = {companyId, userEmail, roleType};
        fetch("http://localhost:8080/change-role", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userData)
        }).then(response => {
            if (response.status === 200) {
                setIsOpenForChanged(true);
                setTimeout(backToPreviousChangedState, 4000);
                return response.blob();
            } else {
                throw new Error("Can't changed members role!");
            }
        }).catch(() => {
            console.log("Something went wrong!")
        });
    }

    return (
        <div className="add-new-member-to-company-div">
            <Container className="add-new-member">
                <form className="form-control" onSubmit={Change}>
                    <Form.Control className="id-input" type="text" placeholder="Id spółki..." value={companyId} required={true}
                                  onChange={(e) => setCompanyId(e.target.value)}/>
                    <Form.Control className="email-input" type="text" placeholder="Email..." value={userEmail} required={true}
                                  onChange={(e) => setUserEmail(e.target.value)}/>
                    <input type="radio" name="role-type" value="OWNER" checked={roleType === "OWNER"}
                           onChange={(e) => {setRoleType("OWNER")}}/> Właściciel
                    <input type="radio" name="role-type" value="EDITOR" checked={roleType === "EDITOR"}
                           onChange={(e) => {setRoleType("EDITOR")}}/> Edytor
                    <input type="radio" name="role-type" value="READER" checked={roleType === "READER"}
                           onChange={(e) => {setRoleType("READER")}}/> Przeglądający
                    <Button variant="primary" size="md" className="btn btn-block" type="submit">Dodaj do spółki</Button>
                    {isOpenForChanged && <ModalTop info={roleChanged} />}
                </form>
            </Container>
        </div>
    )
}

export default ChangeRole