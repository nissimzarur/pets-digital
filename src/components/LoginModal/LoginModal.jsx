import React,{useRef} from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";

import "./LoginModal.css";

export default function LoginModal({ showModal, showModalHandler }) {
	const username = useRef(null);
	const password = useRef(null);

	const loginButtonHandler = ()=>{
		console.log(username.current.value);
		console.log(password.current.value);
		showModalHandler();
	}
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
    </Modal>
  );
}
