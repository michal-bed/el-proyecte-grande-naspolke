import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function ModalErrorMessage(props) {

    const handleClose = () => {
        props.hide();
    };

    const CloseAndDisplayForm = () =>{
        props.closeAndDisplay();

    }

    return (
        <>
            <Modal
                show={true}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.messageTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.message}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Anuluj
                    </Button>
                    <Button variant="primary" onClick={CloseAndDisplayForm}>
                        Samodzielne uzupełnie danych</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}