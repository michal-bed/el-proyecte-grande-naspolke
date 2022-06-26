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
            <Modal.Title>Błędy w formularzu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            W formularzu nadal znajdują się błędne lub niezweryfikowane pola.
            Czy mimo to chcesz dodać spółkę?
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.hide}>
                Anuluj
            </Button>
            <Button variant="primary" onClick={props.saveData}>
                Zapisz mimo to</Button>
        </Modal.Footer>
    </Modal>
}

export function ModalErrorFormComponent(props) {

    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <ModalOverlay
                    hide={props.hide}
                    closeAndDisplay={props.saveData}
                />,
                document.getElementById("overlay-root"))}
        </React.Fragment>
    );
}