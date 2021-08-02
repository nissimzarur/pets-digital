import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./NavbarMenu.css";

export default function NavbarMenu(props) {
  let history = useHistory();
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

            <Nav.Link href="#checkout">סל קניות</Nav.Link>
            <Nav.Link href="#checkout" className="nav-orders">
              הזמנות
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
