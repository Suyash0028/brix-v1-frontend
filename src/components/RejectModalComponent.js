// ModalComponent.js
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const RejectModalComponent = ({ isOpen, handleSave }) => {
    const [show, setShow] = useState(isOpen);

    const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);
    const [rejectReasonValue, setRejectReasonValue] = useState('');

    const onValueChange = (event) => {
        setRejectReasonValue(event.target.value);
    }
    const onSave = () => {
        handleSave(rejectReasonValue);
    }
    return (
        <div className="modal show" style={{ display: 'block', position: 'initial' }} >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reject User ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Enter reason</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={(event)=>onValueChange(event)} value={rejectReasonValue}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RejectModalComponent;
