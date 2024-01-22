import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../action/userAction";
import Success from "../components/Success";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet";

const Register = () => {
  const [number, setNumber] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();

  const registerState = useSelector((state) => state.registerUser);
  const { error, success, loading } = registerState;

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      number,
      password,
    };
    dispatch(registerUser(data));
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("currentUser"))) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <Container fluid>
        <Helmet>
          <title>Register to Your life time fancy number Account</title>
          <meta
            name="description"
            content="Log in to your VIP FancyNumber account to manage your exclusive phone numbers and elevate your communication experience."
          />
        </Helmet>
        <Row>
          <Col md={12}>
            <Card
              style={{
                width: "auto",
                boxShadow: "3px 2px #888888",
                padding: "10px",
                margin: "auto",
                marginTop: "10vh",
                maxWidth: "50rem",
              }}
            >
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Phone Number"
                    onChange={(e) => setNumber(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your phone number with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="full name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Link to="/login">Alredy have account</Link>
                </Form.Group>
                {success && <Success success="User Register Successfully" />}
                {error && <Error error={error.response.data.message} />}
                {loading && <Loading loading={loading} />}
                <Button type="submit">submit</Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
