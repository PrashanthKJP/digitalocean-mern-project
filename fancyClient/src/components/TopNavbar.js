import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BiPhoneCall, BiSolidCartDownload } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../action/userAction";
import { LinkContainer } from "react-router-bootstrap";
import useWindowSize from "../coustomHook/useWindowSize";

const TopNavbar = () => {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState();

  const cartState = useSelector((state) => state.cartReducer);
  const size = useWindowSize();
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);
  return (
    <Navbar
      expand="lg"
      style={{
        boxShadow: "0px 0px 100px rgba(0, 0, 0, 0.5)",
        background: "rgb(2,0,36)",
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(28,108,35,1) 0%, rgba(85,198,9,1) 46%, rgba(0,128,11,1) 100%);",
      }}
    >
      <div style={{ marginLeft: "20px" }}>
        <Navbar.Brand
          href="/"
          style={{
            margin: "auto",
            fontSize: `${size.width < 600 ? "4.5vw" : "1.7vw"}`,
          }}
        >
          Welcome To Permanent VIP Fancynumbers
        </Navbar.Brand>
      </div>
      <Container fluid>
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          <BiPhoneCall /> : (+91) 74000074 53
        </span>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav
            className="align-items-center"
            style={{ fontWeight: "600", fontSize: "20px" }}
          >
            <LinkContainer to="/" activeStyle={{ color: "green" }}>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about" activeStyle={{ color: "green" }}>
              <Nav.Link>About-Us</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/enquiry" activeStyle={{ color: "green" }}>
              <Nav.Link>Enquiry</Nav.Link>
            </LinkContainer>
            {currentUser && currentUser.isAdmin && (
              <LinkContainer to="/admin" activeStyle={{ color: "green" }}>
                <Nav.Link>Admin-Page</Nav.Link>
              </LinkContainer>
            )}

            {currentUser ? (
              <Button
                variant="light"
                size="lg"
                onClick={() => dispatch(logoutUser())}
              >
                Logout
              </Button>
            ) : (
              <LinkContainer to="/login" activeStyle={{ color: "green" }}>
                <Button variant="light" size="lg">
                  Login
                </Button>
              </LinkContainer>
            )}

            <LinkContainer to="cart" activeStyle={{ color: "green" }}>
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
