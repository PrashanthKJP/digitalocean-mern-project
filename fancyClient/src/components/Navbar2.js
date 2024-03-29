import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  Navbar,
  Row,
} from "react-bootstrap";
import { advanceNumber } from "../action/filterNumberAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import useWindowSize from "../coustomHook/useWindowSize";
import logo from "../images/logo.png";

const Navbar2 = ({ getNavbarSearchData }) => {
  const [selectedOptions, setSelectedOptions] = useState("Anyware");
  const [AdvanceSearchShow, setAdvanceSearchShow] = useState(false);
  const [searchData, setSearchData] = useState("");

  // ADVANCE SEARCH MODAL DATA
  const [startWith, setStartWith] = useState("");
  const [endWith, setEndWith] = useState("");
  const [anyWare, setAnyWare] = useState("");
  const [mustContain, setMustContain] = useState("");
  const [notContain, setNotContain] = useState("");
  const [total, setTotal] = useState("");
  const [sum, setSum] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartState = useSelector((state) => state.cartReducer);

  const handleAdvanceSearchClose = () => setAdvanceSearchShow(false);
  const handleAdvanceSearchShow = () => setAdvanceSearchShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedOptions === "Start-with") {
      getNavbarSearchData(searchData, selectedOptions);
      navigate("/");
    } else if (selectedOptions === "Anyware") {
      getNavbarSearchData(searchData, selectedOptions);
      navigate("/");
    } else if (selectedOptions === "End-with") {
      getNavbarSearchData(searchData, selectedOptions);
      navigate("/");
    }
  };

  const handleAdvanceSubmit = (e) => {
    e.preventDefault();

    const queryParams = {
      startWith,
      endWith,
      anyWare,
      mustContain,
      notContain,
      total,
      sum,
    };

    // Convert the query parameters to a URL-encoded string
    const queryString = Object.keys(queryParams)
      .map((key) => `${key}=${encodeURIComponent(queryParams[key])}`)
      .join("&");

    dispatch(advanceNumber(queryString));
    navigate("/advanceSearch");
    setStartWith("");
    setEndWith("");
    setAnyWare("");
    setMustContain("");
    setNotContain("");
    setTotal("");
    setSum("");
  };

  const size = useWindowSize();

  useEffect(() => {}, [selectedOptions, searchData]);

  return (
    <Navbar
      expand="lg"
      style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 5px" }}
    >
      <Container fluid>
        <Navbar.Brand href="#home">
          <img src={logo} alt="VIP FANCY PHONE NUMBER" height="42" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Form className="d-flex mt-2" onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search"
                onChange={(e) => setSearchData(e.target.value)}
                style={{
                  background: "rgba(0, 0, 0, 0.1)",
                  border: "none",
                  fontSize: "20px",
                }}
              />
              <select
                className="form-control"
                onChange={(e) => setSelectedOptions(e.target.value)}
                style={{
                  background: "rgba(0, 0, 0, 0.1)",
                  border: "none",
                  fontSize: "20px",
                }}
              >
                <option>Anyware</option>
                <option>Start-with</option>
                <option>End-with</option>
              </select>
              <Button
                type="submit"
                style={{ background: "rgba(0, 0, 0, 0.1)", border: "none" }}
              >
                <BiSearch />
              </Button>
            </InputGroup>
          </Form>
        </Navbar.Collapse>
      </Container>

      <Button
        variant="success"
        onClick={handleAdvanceSearchShow}
        style={{
          width: `${size.width < 600 ? "100vw" : "30vw"}`,
          margin: "0px 10px",
          padding: "5px",
          fontSize: "20px",
        }}
        size={`${size.width < 600 ? "sm" : "md"}`}
      >
        Advanced Search
      </Button>

      {size.width < 600 && cartState.cartItems.length > 0 ? (
        <Link to="/cart">
          <Button
            variant="outline-primary"
            size="sm"
            style={{ marginTop: "2px" }}
          >
            {` ${cartState.cartItems.length || 0} Item Added`}
          </Button>
        </Link>
      ) : null}

      <Modal
        show={AdvanceSearchShow}
        onHide={handleAdvanceSearchClose}
        size="lg"
      >
        <Form onSubmit={handleAdvanceSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>ADVANCED SEARCH</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container fluid>
              <Row>
                <Col lg={6} xs={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Start With</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g *99,88,77 multiple value"
                      onChange={(e) => setStartWith(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Anyware</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="e.g 000 single value"
                      onChange={(e) => setAnyWare(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Not Contain</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g 1,2,3,4 multiple value"
                      onChange={(e) => setNotContain(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col lg={6} xs={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>End with</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g 11,22,3 multiple value"
                      onChange={(e) => setEndWith(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Must Contain</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="e.g 14 single value"
                      onChange={(e) => setMustContain(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <hr />
              <span style={{ color: "red" }}>
                For multiple values use commas for total and sum
              </span>
              <Row>
                <Col lg={6} xs={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Total</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g *35"
                      onChange={(e) => setTotal(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col lg={6} xs={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Sum</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g *7"
                      onChange={(e) => setSum(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleAdvanceSearchClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleAdvanceSearchClose}
              type="submit"
            >
              Search
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Navbar>
  );
};

export default Navbar2;
