import React from 'react';
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  InputGroup,
  Row,
  Col,
  Card
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
              <Nav.Link href="#home" className="px-3">Home</Nav.Link>
              <Nav.Link href="#about" className="px-3">About</Nav.Link>
              <Nav.Link href="#contact" className="px-3">Contact</Nav.Link>
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

      {/* Big Registration Form */}
      <Container className="mt-5 mb-5">
        <Card className="p-4 shadow">
          <h2 className="mb-4 text-center">Create Your Account</h2>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your first name" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your last name" />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="tel" placeholder="Enter phone number" />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" placeholder="Confirm password" />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control as="textarea" rows={2} placeholder="Your address" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formTerms">
              <Form.Check type="checkbox" label="I agree to the Terms and Conditions" />
            </Form.Group>

            <div className="text-center">
              <Button variant="success" size="lg">
                Register
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    </>
  );
}

export default App;
