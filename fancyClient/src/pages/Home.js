import React, { useEffect, useState } from "react";
import Carousels from "./Carousels";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Offcanvas,
  Row,
} from "react-bootstrap";
import Category from "./Category";
import { filterNumber } from "../action/filterNumberAction";
import { useDispatch, useSelector } from "react-redux";
import useWindowSize from "../coustomHook/useWindowSize";
import { addToCart } from "../action/cartAction";
import Loading from "../components/Loading";
import Error from "../components/Error";
import DemoCard from "./DemoCard";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import { useDebounce } from "../coustomHook/useDebounce";

const Home = ({ selectedSearchData, selectedSearchOptions }) => {
  const [numerology, setNumerology] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(500000);
  const [show, setShow] = useState(false);

  const size = useWindowSize();
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const filterNumberState = useSelector((state) => state.filterNumberReducer);

  const { loading, error, filterNumbers } = filterNumberState;

  const addToCarthandler = (item) => {
    dispatch(addToCart(item.newPrice, item.number, item.oldPrice, item._id));
  };

  const getCategoryFunction = (cate) => {
    setSelectedCategory(cate);
  };

  const deBouceValueForPriceRange = useDebounce([startValue, endValue], 1500);
  const deBouceValueForNumerology = useDebounce(numerology, 1500);

  const handleClearFilter = () => {
    setNumerology("");
    setSelectedCategory("");
    setStartValue(0);
    setEndValue(500000);
  };

  const queryParams = {
    startWith: selectedSearchOptions === "Start-with" ? selectedSearchData : "",
    endWith: selectedSearchOptions === "End-with" ? selectedSearchData : "",
    anyWare: selectedSearchOptions === "Anyware" ? selectedSearchData : "",
    mustContain: "",
    notContain: "",
    oneTimeSum:
      numerology.split("").length === 2 ? deBouceValueForNumerology : "",
    secondTimeSum: "",
    thridTimeSum:
      numerology.split("").length === 1 ? deBouceValueForNumerology : "",
    startPrice: deBouceValueForPriceRange[0] || "",
    endPrice: deBouceValueForPriceRange[1] || "",
    category: selectedCategory || "",
  };

  const queryString = Object.keys(queryParams)
    .map((key) => `${key}=${encodeURIComponent(queryParams[key])}`)
    .join("&");

  useEffect(() => {
    dispatch(filterNumber(queryString));
  }, [
    dispatch,
    numerology,
    selectedSearchOptions,
    selectedSearchData,
    queryString,
    selectedCategory,
  ]);

  return (
    <div style={{ position: "relative" }}>
      <div>
        <Carousels />
        <Container fluid>
          <Row>
            <Col md={3}>
              {size.width > 600 ? (
                <Card
                  style={{
                    marginTop: "1rem",
                    background: "rgba(0, 0, 0, 0.1)",
                    border: "none",
                  }}
                >
                  <Card.Body>
                    <Card.Title
                      style={{
                        justifyContent: "space-around",
                        fontWeight: "500",
                        fontSize: "15px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      SEARCH OPTIONS
                      <Button
                        onClick={handleClearFilter}
                        style={{ marginLeft: "2vw" }}
                        variant="warning"
                      >
                        Clear filter
                      </Button>
                    </Card.Title>
                    <hr />
                    <Card.Text>
                      <div
                        style={{
                          fontWeight: "600",
                          fontStyle: "italic",
                          fontSize: "15px",
                          marginBottom: "5px",
                        }}
                      >
                        <span>Numerology Search</span>
                      </div>
                      <InputGroup className="mb-3">
                        <Form.Control
                          aria-label="Example text with button addon"
                          aria-describedby="basic-addon1"
                          onChange={(e) => setNumerology(e.target.value)}
                          value={numerology}
                        />
                      </InputGroup>
                      <Form.Label
                        style={{
                          fontWeight: "600",
                          fontStyle: "italic",
                          fontSize: "15px",
                          marginBottom: "5px",
                        }}
                      >
                        Set Budget
                      </Form.Label>
                      <br />
                      <div>
                        <Button
                          style={{
                            width: "100%",
                            marginBottom: "1vw",
                          }}
                          variant={`success `}
                          disabled
                        >
                          set-range
                        </Button>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <input
                            style={{ width: "45%", textAlign: "center" }}
                            value={startValue}
                            onChange={(e) => setStartValue(e.target.value)}
                            placeholder={startValue}
                          />
                          <input
                            style={{ width: "45%", textAlign: "center" }}
                            value={endValue}
                            onChange={(e) => setEndValue(e.target.value)}
                            placeholder={endValue}
                          />
                        </div>
                      </div>
                      <Category getCategoryFunction={getCategoryFunction} />
                    </Card.Text>
                  </Card.Body>
                </Card>
              ) : (
                <Offcanvas show={show} onHide={handleClose}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filter's</Offcanvas.Title>
                  </Offcanvas.Header>

                  <Offcanvas.Body>
                    <Card
                      style={{
                        background: "rgba(0, 0, 0, 0.1)",
                        border: "none",
                      }}
                    >
                      <Card.Body>
                        <Card.Title
                          style={{
                            justifyContent: "space-around",
                            fontWeight: "500",
                            fontSize: "15px",
                          }}
                        >
                          SEARCH OPTIONS
                          <Button
                            onClick={handleClearFilter}
                            style={{ marginLeft: "15vw" }}
                            variant="warning"
                            size="sm"
                          >
                            clear all filter
                          </Button>
                        </Card.Title>
                        <hr />
                        <Card.Text
                          style={{
                            justifyContent: "space-around",
                            fontWeight: "500",
                            fontSize: "15px",
                          }}
                        >
                          Numerology Search
                          <InputGroup className="mb-3">
                            <Form.Control
                              aria-label="Example text with button addon"
                              aria-describedby="basic-addon1"
                              value={numerology}
                              onChange={(e) => setNumerology(e.target.value)}
                            />
                          </InputGroup>
                          <Form.Label
                            style={{
                              fontWeight: "600",
                              fontStyle: "italic",
                              fontSize: "15px",
                              marginBottom: "5px",
                            }}
                          >
                            Set Budget
                          </Form.Label>
                          <br />
                          <div>
                            <Button
                              style={{
                                width: "100%",
                                marginBottom: "1vw",
                              }}
                              variant={`success `}
                              disabled
                            >
                              set-range
                            </Button>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "10px",
                              }}
                            >
                              <input
                                style={{ width: "45%", textAlign: "center" }}
                                value={startValue}
                                onChange={(e) => setStartValue(e.target.value)}
                                placeholder={startValue}
                              />
                              <input
                                style={{ width: "45%", textAlign: "center" }}
                                value={endValue}
                                onChange={(e) => setEndValue(e.target.value)}
                                placeholder={endValue}
                              />
                            </div>
                          </div>
                          <Category getCategoryFunction={getCategoryFunction} />
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Offcanvas.Body>
                </Offcanvas>
              )}

              {size.width < 600 && (
                <Button variant="primary" onClick={handleShow}>
                  open
                </Button>
              )}
            </Col>
            <Col md={9}>
              {size.width < 600 ? (
                <div
                  className="scrollBar"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "100vw",
                  }}
                >
                  {error && <Error error="Error While Fetching Number" />}
                  {(loading && <Loading loading={loading} />) ||
                    (filterNumbers &&
                      filterNumbers.map((item, index) => (
                        <div key={index}>
                          <DemoCard
                            item={item}
                            actions={() => addToCarthandler(item)}
                          />
                        </div>
                      )))}
                </div>
              ) : (
                <div
                  className="scrollBar"
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  {error && <Error error="Error While Fetching Number" />}
                  {(loading && <Loading loading={loading} />) ||
                    (filterNumbers &&
                      filterNumbers.map((item, index) => (
                        <div key={index}>
                          <DemoCard
                            item={item}
                            actions={() => addToCarthandler(item)}
                          />
                        </div>
                      )))}
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <FloatingWhatsApp
        phoneNumber="7019504346"
        accountName="Vinayaka KJ"
        allowEsc
        allowClickAway
        notification
        notificationSound
      />
    </div>
  );
};

export default Home;
