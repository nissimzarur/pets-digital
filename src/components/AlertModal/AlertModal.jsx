import React from "react";
import { Modal } from "react-bootstrap";

export default function AlertModal({
  showAlertModal,
  setShowAlertModalHandler,
  errMsg,
}) {
  return (
    <Modal show={showAlertModal} onHide={setShowAlertModalHandler}>
      <Modal.Header className="modal-title">
        <Modal.Title>{errMsg}</Modal.Title>
      </Modal.Header>
    </Modal>
  );
}
