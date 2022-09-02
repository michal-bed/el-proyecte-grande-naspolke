import {Button, Container, Form} from "react-bootstrap";
import React, {useState} from "react";
import ModalTop from "../modal/ModalTop";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AddMember = () => {

    const axiosPrivate = useAxiosPrivate();

    const memberAdded = {
        title: "Użytkownik dodany",
        text: "Udało sie pomyślnie dodać użytkownika do Twojej spółki."
    }

    const [isOpenForAdded, setIsOpenForAdded] = useState(false);
    const backToPreviousAddedState = () => setIsOpenForAdded(false);

    const [companyId, setCompanyId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [roleType, setRoleType] = useState('');

    const Add = (e) => {
        e.preventDefault();
        const userData = {companyId, userEmail, roleType};
        axiosPrivate.post("/add-member-to-company", userData
        ).then(response => {
            if (response.status === 200) {
                setIsOpenForAdded(true);
                setTimeout(backToPreviousAddedState, 4000);
                return response.data;
            } else {
                throw new Error("Can't save new member!");
            }
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <div className="add-new-member-to-company-div">
            <Container className="add-new-member">
                <form className="form-control" onSubmit={Add}>
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
                    {isOpenForAdded && <ModalTop info={memberAdded} />}
                </form>
            </Container>
        </div>
    )
}

export default AddMember
