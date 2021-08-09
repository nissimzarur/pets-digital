import React, { useState } from "react";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { connect } from "react-redux";

import LoginModal from "../LoginModal/LoginModal";

import { useHistory } from "react-router-dom";
import "./NavbarMenu.css";

function NavbarMenu({ order, user }) {
  let history = useHistory();

  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    console.log(user);
    if (!user.is_admin) return setShowModal(!showModal);
    history.push("/orders");
  };

  console.log({ user: user });
  let numOfProducts = 0;
  if (order) {
    numOfProducts = order.length;
  }

  return (
    <>
      <LoginModal
        showModal={showModal}
        showModalHandler={showModalHandler}
        history={history}
      />
      <Navbar className="nav-main" expand="lg">
        <Container>
          <Navbar.Brand
            className="brand-logo"
            onClick={() => history.push("/homepage")}
          >
            Pets-Digital
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto nav-rtl">
              {!(typeof user == "object" && Object.keys(user).length > 0) && (
                <Nav.Link onClick={() => history.push("/login")}>
                  <b>התחבר</b>
                </Nav.Link>
              )}

              <Nav.Link onClick={() => history.push("/homepage")}>
                ראשי
              </Nav.Link>
              <Nav.Link onClick={() => history.push("/products")}>
                מוצרים
              </Nav.Link>

              <Nav.Link onClick={() => history.push("/cart")}>
                סל קניות <Badge bg="secondary">{numOfProducts}</Badge>
              </Nav.Link>

              <Nav.Link className="nav-orders" onClick={showModalHandler}>
                הזמנות
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

const mapStateToProps = (state) => {
  const { orderReducer } = state.OrderReducer;
  const { user } = state.UserReducer;
  const order = orderReducer;
  return { order, user };
};

export default connect(mapStateToProps)(NavbarMenu);
