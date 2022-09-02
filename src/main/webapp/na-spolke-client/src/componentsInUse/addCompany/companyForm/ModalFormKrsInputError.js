import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactDOM from "react-dom";


const ModalOverlay = (props) => {
    return <Modal
        show={true}
        onHide={props.hide}
        backdrop="static"
        keyboard={false}
        container={document.getElementById("overlay-root")}
    >
        <Modal.Header closeButton>
            <Modal.Title>{props.messageTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {props.message}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.hide}>
                Anuluj
            </Button>
            <Button variant="primary" onClick={props.closeAndDisplay}>
                Samodzielne uzupełnie danych</Button>
        </Modal.Footer>
    </Modal>
}

export function ModalErrorMessage(props) {
    console.log("ok")
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <ModalOverlay
                messageTitle={props.messageTitle}
                message = {props.message}
                hide={props.hide}
                closeAndDisplay={props.closeAndDisplay}
            />,
            document.getElementById("overlay-root"))}
        </React.Fragment>
    );
}