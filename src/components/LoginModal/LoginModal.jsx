import React, { useRef, useState } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import Loading from "../../components/Loading/Loading";
import AlertModal from "../../components/AlertModal/AlertModal";

import "./LoginModal.css";

export default function LoginModal({ showModal, showModalHandler, history }) {
  const username = useRef(null);
  const password = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertErrMsg, setAlertErrMsg] = useState("");

  const setShowAlertModalHandler = () => {
    setShowAlertModal(!showAlertModal);
  };

  const loginButtonHandler = () => {
    setIsLoading(true);
    let adminUsername = username.current.value;
    let adminPassword = password.current.value;

    fetch(`${process.env.REACT_APP_IP_ADDRESS}/users`, {
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
            history.push("/orders",{isAdmin:true});
          } //push to orders.
          else {
            setAlertErrMsg("הגישה נדחתה");
            setShowAlertModal(!showAlertModal);
          }
        }
      })
      .catch((e) => {
        setIsLoading(false);
        alert(e);
      });
  };
  return (
    <>
      <AlertModal
        showAlertModal={showAlertModal}
        setShowAlertModalHandler={setShowAlertModalHandler}
        errMsg={alertErrMsg}
      />
      <Modal show={showModal} onHide={showModalHandler} className="login-modal-container">
        <Modal.Header className="modal-title">
          <Modal.Title>כניסת מנהל</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
        
            <FormControl
              aria-label="email"
              placeholder='הכנס כתובת דוא"ל'
              ref={username}
              className="modal-input"
              type="email"
            />
			    <FormControl
              aria-label="password"
              placeholder="סיסמה"
              ref={password}
              className="modal-input"
              type="password"
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer className="modal-buttons">
		<Button variant="primary" onClick={loginButtonHandler}>
            כניסה
          </Button>
          <Button variant="secondary" onClick={showModalHandler}>
            סגור
          </Button>
        </Modal.Footer>
        <div className="loading-container">{isLoading && <Loading />}</div>
      </Modal>
    </>
  );
}
