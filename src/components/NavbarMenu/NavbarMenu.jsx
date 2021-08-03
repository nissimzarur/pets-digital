import React from "react";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import { connect } from "react-redux";

import { useHistory } from "react-router-dom";
import "./NavbarMenu.css";

function NavbarMenu({ order }) {
  let history = useHistory();

  console.log(order);
  let numOfProducts = 0;
  if (order) {
    numOfProducts = order.length;
  }

  return (
    <Navbar className="nav-main" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Pets-Digital</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto nav-rtl">
            <Nav.Link onClick={() => history.push("/")}>ראשי</Nav.Link>
            <Nav.Link onClick={() => history.push("/products")}>
              מוצרים
            </Nav.Link>

            <Nav.Link onClick={() => history.push("/cart")}>
              סל קניות <Badge bg="secondary">{numOfProducts}</Badge>
            </Nav.Link>
            <Nav.Link href="#checkout" className="nav-orders">
              הזמנות
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const mapStateToProps = (state) => {
  const { orderReducer } = state.OrderReducer;
  const order = orderReducer;
  return { order };
};

export default connect(mapStateToProps)(NavbarMenu);
