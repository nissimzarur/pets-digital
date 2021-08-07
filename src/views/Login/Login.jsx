import React, { useRef, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { saveUserInfo } from "./../../redux/User/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./Login.css";

import Loading from "../../components/Loading/Loading";

function Login({ saveUserInfo, history }) {
  let username = useRef(null);
  let password = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = () => {
    if (!username || !password) return alert("אנא מלא את הפרטים בצורה תקינה");

    setIsLoading(true);
    fetch("http://192.168.56.1:3002/users/login", {
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
        if (!loginResult.success || !loginResult.user)
          return alert(loginResult.errMsg || "אימות משתמש נכשל");
        saveUserInfo(loginResult.user);
        history.push("/homepage");
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
        alert("נסיון התחברות נכשל");
      });
  };
  return (
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
