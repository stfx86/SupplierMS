





import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { Nav ,Navbar ,Container } from "react-bootstrap";


function App() {
  return (
    <>
      {/* Navbar with Login */}
      <Navbar bg="light" expand="lg" className="shadow-sm py-3">
        <Container>
          <Navbar.Brand href="#" className="fw-bold text-primary fs-3">
            Authify
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-login" />
          <Navbar.Collapse id="navbar-login">
            <Nav className="me-auto">
              <Nav.Link as={Link}  to="/" className="px-3">Home</Nav.Link>
              <Nav.Link to="about" as={Link}  className="px-3">About</Nav.Link>
              <Nav.Link to="contact" as={Link}  className="px-3">Contact</Nav.Link>
              <Nav.Link to="RegisterSupplier" as={Link} className="px-3">RegisterSupplier</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </>
  )};


  export default App;