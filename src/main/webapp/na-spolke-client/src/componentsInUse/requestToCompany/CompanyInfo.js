import {Button, Container, Grid} from "@mui/material";
import "./RequestToCompany.module.css";
import ModalTop from "../modal/ModalTop";
import React, {useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const CompanyInfo = ({ companyData, krsNumber }) => {

    const axiosPrivate = useAxiosPrivate();

    const successfullyRequestMessage = {
        title: "Prośba wysłana",
        text: "Twoja prośba o dołączenie do spółki została wysłana." +
            "Status akceptacji możesz sprawdzić w swoim logu wydarzeń."
    }

    const errorRequestMessage = {
        title: "Nieoczekiwany błąd",
        text: "Niestety coś poszło nie tak. Spróbuj ponownie za kilka minut."
    }

    const [successfullyRequest, setSuccessfullyRequest] = useState(false);
    const [errorRequest, setErrorRequest] = useState(false);
    const backToPreviousSuccessfullyState = () => setSuccessfullyRequest(false);
    const backToPreviousErrorState = () => setErrorRequest(false);

    let [messageText, setMessageText] = useState("");

    function handleStatusChange() {
        setMessageText(messageText = "Użytkownik o podanym adresie email wysłał prośbę o dołączenie do spółki");
    }

    const sendRequest = (e) => {
        handleStatusChange();
        e.preventDefault();
        const userData = {messageText};
        axiosPrivate.post(`/send-request-for-membership/${krsNumber}`, userData
        ).then(response => {
            if (response.status === 200) {
                setSuccessfullyRequest(true);
                setTimeout(backToPreviousSuccessfullyState, 4000);
                return response.data;
            } else {
                setErrorRequest(true);
                setTimeout(backToPreviousErrorState, 4000);
                throw new Error('Send request failed!');
            }
        }).catch((error) => {console.log(error)})
    }

    return (
        <Container className="request-form-container">
            <Grid style={{display: "flex"}}>
                <h6><b>{companyData.companyName}</b></h6>
                <Button onClick={sendRequest}>Wyślij prośbę</Button>
                {successfullyRequest && <ModalTop info={successfullyRequestMessage} />}
                {errorRequest && <ModalTop info={errorRequestMessage} />}
            </Grid><hr/>
        </Container>
    )
}

export default CompanyInfo
