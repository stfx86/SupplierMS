





import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";





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
              <Nav.Link href="home" className="px-3">Home</Nav.Link>
              <Nav.Link href="about" className="px-3">About</Nav.Link>
              <Nav.Link href="contact" className="px-3">Contact</Nav.Link>
            </Nav>

            <Form className="d-flex align-items-center gap-2">
              <FormControl
                type="email"
                placeholder="Email"
                aria-label="Email"
              />
              <FormControl
                type="password"
                placeholder="Password"
                aria-label="Password"
              />
              <Button variant="primary">Login</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </>
  )};

  export default App;