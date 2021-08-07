import React, { useRef, useState } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import Loading from "../../components/Loading/Loading";

import "./LoginModal.css";

export default function LoginModal({ showModal, showModalHandler, history }) {
  const username = useRef(null);
  const password = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const loginButtonHandler = () => {
    setIsLoading(true);
    let adminUsername = username.current.value;
    let adminPassword = password.current.value;

    fetch("http://192.168.56.1:3002/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: adminUsername,
        password: adminPassword,
      }),
    })
      .then((result) => result.json())
      .then((result) => {
        setIsLoading(false);
        showModalHandler();
        if (result.success) {
          if (result.isAdmin) {
            history.push("/orders");
          } //push to orders.
          else alert("אין גישה!");
        }
      })
      .catch((e) => {
        setIsLoading(false);
        alert(e);
      });
  };
  return (
    <Modal show={showModal} onHide={showModalHandler}>
      <Modal.Header className="modal-title">
        <Modal.Title>כניסת מנהל</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3 modal-inputs">
          <FormControl
            aria-label="email"
            placeholder="Enter email"
            ref={username}
            className="modal-input"
            type="email"
          />
          <FormControl
            aria-label="password"
            placeholder="Password"
            ref={password}
            className="modal-input"
            type="password"
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer className="modal-buttons">
        <Button variant="secondary" onClick={showModalHandler}>
          סגור
        </Button>
        <Button variant="primary" onClick={loginButtonHandler}>
          כניסה
        </Button>
      </Modal.Footer>
      <div className="loading-container">{isLoading && <Loading />}</div>
    </Modal>
  );
}
