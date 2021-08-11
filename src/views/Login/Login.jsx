import React, { useRef, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { saveUserInfo } from "./../../redux/User/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./Login.css";

import Loading from "../../components/Loading/Loading";
import AlertModal from "../../components/AlertModal/AlertModal";

function Login({ saveUserInfo, history }) {
  let username = useRef(null);
  let password = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertErrMsg, setAlertErrMsg] = useState("");

  const setShowAlertModalHandler = () => {
    setShowAlertModal(!showAlertModal);
  };

  const loginHandler = () => {
    if (!username || !password) {
      setAlertErrMsg("אנא מלא את הפרטים בצורה תקינה");
      setShowAlertModal(!showAlertModal);
      return false;
    }
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_IP_ADDRESS}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.current.value,
        password: password.current.value,
      }),
    })
      .then((result) => result.json())
      .then((loginResult) => {
        setIsLoading(false);
        if (!loginResult.success || !loginResult.user) {
          setAlertErrMsg(loginResult.errMsg || "אימות משתמש נכשל");
          setShowAlertModal(!showAlertModal);
          return false;
        }
        saveUserInfo(loginResult.user);
        history.push("/homepage");
      })
      .catch((e) => {
        setIsLoading(false);
        setAlertErrMsg("נסיון התחברות נכשל");
        setShowAlertModal(!showAlertModal);
      });
  };
  return (
    <>
      <AlertModal
        showAlertModal={showAlertModal}
        setShowAlertModalHandler={setShowAlertModalHandler}
        errMsg={alertErrMsg}
      />
      <div className="login-container">
        <Form className="login-form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder='הכנס כתובת דוא"ל'
              ref={username}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="סיסמא" ref={password} />
          </Form.Group>
          <div className="login-btn">
            <Button variant="primary" onClick={loginHandler}>
              כניסה
            </Button>
          </div>
        </Form>
        <Modal show={isLoading}>
          <div className="modal-login">
            <Loading />
          </div>
        </Modal>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      saveUserInfo,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Login);
