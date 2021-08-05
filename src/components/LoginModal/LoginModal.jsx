import React from "react";
import { Modal, Button } from "react-bootstrap";

import "./LoginModal.css";

export default function LoginModal({ showModal, showModalHandler }) {
  return (
    <Modal show={showModal} onHide={showModalHandler}>
      <Modal.Header className="modal-title">
        <Modal.Title>כניסת מנהל</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer className="modal-btns">
        <Button variant="secondary" onClick={showModalHandler}>
          סגור
        </Button>
        <Button variant="primary" onClick={showModalHandler}>
          כניסה
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
