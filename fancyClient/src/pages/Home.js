import React, { useEffect, useState } from "react";
import Carousels from "./Carousels";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Navbar,
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
import { Helmet } from "react-helmet";
import ExcelJS from "exceljs";
import { getAllUsers } from "../action/userAction";

const Home = ({ selectedSearchData, selectedSearchOptions }) => {
  const [numerology, setNumerology] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(500000);
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

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
    page: currentPage,
  };

  const queryString = Object.keys(queryParams)
    .map((key) => `${key}=${encodeURIComponent(queryParams[key])}`)
    .join("&");

  const metaData = [
    "buy fancy mobile numbers online",
    "postpaid plan",
    "	Postpaid SIM",
    "	SIM Card Home Delivery",
    "Permanent VIP Fancy Numbers",
    "fancy phone number",
  ];

  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");
    sheet.properties.defaultRowHeight = 50;

    sheet.getRow(1).border = {
      top: { style: "thick", color: { argb: "FF808080" } }, // Black color
      left: { style: "thick", color: { argb: "FF808080" } }, // Black color
      bottom: { style: "thick", color: { argb: "FF808080" } }, // Black color
      right: { style: "thick", color: { argb: "FF808080" } }, // Black color
    };

    sheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ffff6347" }, // Red color
    };

    sheet.getRow(1).font = {
      name: "Comic Sans MS",
      family: 4,
      size: 16,
      bold: true,
    };

    sheet.columns = [
      {
        header: "id",
        key: "id",
        width: 20,
      },
      {
        header: "number",
        key: "number",
        width: 20,
      },
      {
        header: "newPrice",
        key: "newPrice",
        width: 20,
      },
      {
        header: "oldPrice",
        key: "oldPrice",
        width: 20,
      },
      {
        header: "oneTimeSum",
        key: "oneTimeSum",
        width: 15,
      },
      {
        header: "secondTimeSum",
        key: "secondTimeSum",
        width: 15,
      },
      {
        header: "thridTimeSum",
        key: "thridTimeSum",
        width: 15,
      },
      {
        header: "currentUserId",
        key: "currentUserId",
        width: 15,
      },

      {
        header: "category",
        key: "category",
        width: 25,
      },
    ];

    filterNumbers?.map(async (product, index) => {
      sheet.addRow({
        id: index + 1,
        number: product?.number,
        newPrice: product?.newPrice,
        oldPrice: product?.oldPrice,
        oneTimeSum: product?.oneTimeSum,
        secondTimeSum: product?.secondTimeSum,
        thridTimeSum: product?.thridTimeSum,
        category: product?.category.map((item) => item),
        createdAt: product?.createdAt,
      });
    });

    workbook.xlsx.writeBuffer().then(function (data) {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob, "FancyNumbers.xlsx");
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "FancyNumbers.xlsx";
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  useEffect(() => {
    dispatch(filterNumber(queryString));
    dispatch(getAllUsers());
  }, [
    dispatch,
    numerology,
    selectedSearchOptions,
    selectedSearchData,
    queryString,
    selectedCategory,
    currentPage,
  ]);

  return (
    <div>
      <div>
        <Helmet>
          {metaData.map((item, i) => (
            <title key={i}> {item} </title>
          ))}

          <meta
            name="description"
            content="Welcome to Permanent VIP Fancy Numbers - your ultimate destination for exclusive, premium phone numbers! Discover a world of personalized communication with our curated selection of VIP numbers. Stand out from the crowd and make a statement with a number that truly reflects your style and status. Browse our collection now and find the perfect number that's as unique as you are."
          />
        </Helmet>
        <Carousels />
        <div style={{ marginTop: "1em" }}>
          <Container fluid>
            <Row>
              <Col md={3}>
                {/* <Navbar>
                  <Navbar.Brand>
                    Total {filterNumbers?.length} Number
                  </Navbar.Brand>
                  <Navbar.Toggle />
                  <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                      <Button onClick={exportExcelFile}>Export Excel</Button>
                    </Navbar.Text>
                  </Navbar.Collapse>
                </Navbar> */}
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
                        <Category
                          getCategoryFunction={getCategoryFunction}
                          handleClose={handleClose}
                        />
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ) : (
                  <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton></Offcanvas.Header>
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
                                  style={{
                                    width: "45%",
                                    textAlign: "center",
                                  }}
                                  value={startValue}
                                  onChange={(e) =>
                                    setStartValue(e.target.value)
                                  }
                                  placeholder={startValue}
                                />
                                <input
                                  style={{
                                    width: "45%",
                                    textAlign: "center",
                                  }}
                                  value={endValue}
                                  onChange={(e) => setEndValue(e.target.value)}
                                  placeholder={endValue}
                                />
                              </div>
                            </div>
                            <Category
                              getCategoryFunction={getCategoryFunction}
                              handleClose={handleClose}
                            />
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Offcanvas.Body>
                  </Offcanvas>
                )}

                {size.width < 600 && (
                  <Button
                    variant="primary"
                    onClick={handleShow}
                    style={{ width: "90vw", marginTop: "1vw" }}
                  >
                    Add More Filter
                  </Button>
                )}
              </Col>
              <Col md={9}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    margin: "5px",
                  }}
                >
                  {/* <Button onClick={prevPage} disabled={currentPage === 1}>
                    Previous Page
                  </Button>
                  <Button onClick={nextPage}>Next Page</Button> */}
                </div>
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Button onClick={prevPage} disabled={currentPage === 1}>
                    Previous Page
                  </Button>
                  <Button onClick={nextPage}>Next Page</Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
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
