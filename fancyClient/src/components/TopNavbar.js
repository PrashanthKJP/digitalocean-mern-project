import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BiPhoneCall, BiSolidCartDownload } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../action/userAction";
import { LinkContainer } from "react-router-bootstrap";

const TopNavbar = () => {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState();

  const cartState = useSelector((state) => state.cartReducer);
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);
  return (
    <Navbar
      expand="lg"
      // fixed="top"
      style={{
        boxShadow: "0px 0px 100px rgba(0, 0, 0, 0.5)",
        backgroundColor: "#689f38",
      }}
    >
      <Container fluid>
        <Navbar.Brand href="/" style={{ margin: "auto" }}>
          Welcome to Lifetime Number
        </Navbar.Brand>
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BiPhoneCall /> : 7019504346
        </span>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center" style={{ fontWeight: "600" }}>
            <LinkContainer to="/" activeStyle={{ color: "#fff" }}>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about" activeStyle={{ color: "#fff" }}>
              <Nav.Link>About-Us</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/enquiry" activeStyle={{ color: "#fff" }}>
              <Nav.Link>Enquiry</Nav.Link>
            </LinkContainer>
            {currentUser && currentUser.isAdmin && (
              <LinkContainer to="/admin" activeStyle={{ color: "#fff" }}>
                <Nav.Link>Admin-Page</Nav.Link>
              </LinkContainer>
            )}

            {currentUser ? (
              <Button variant="light" onClick={() => dispatch(logoutUser())}>
                Logout
              </Button>
            ) : (
              <LinkContainer to="/login" activeStyle={{ color: "#fff" }}>
                <Button variant="light">Login</Button>
              </LinkContainer>
            )}

            <LinkContainer to="cart" activeStyle={{ color: "#fff" }}>
              <Nav.Link>
                <BiSolidCartDownload
                  style={{ fontSize: "2.5rem", color: "black" }}
                />
                <span className="ml-1">{cartState.cartItems.length || 0}</span>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
