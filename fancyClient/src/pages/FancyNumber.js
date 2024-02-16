import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Modal,
  Navbar,
  Row,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import { AiFillEdit } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { deleteNumber, editNumber, getAllNumber } from "../action/numberAction";
import { format } from "timeago.js";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import useWindowSize from "../coustomHook/useWindowSize";
import { BiSearch } from "react-icons/bi";
import { filterNumberFancy } from "../action/filterNumberAction";
import { Helmet } from "react-helmet";
import ExcelJS from "exceljs";

const FancyNumber = () => {
  const FancyNumberState = useSelector((state) => state.getAllNumberReducer);
  const { loading, error, numbers } = FancyNumberState;
  const { currentUser } = useSelector((state) => state.loginUser);
  const [letestNumber, setLetestNumber] = useState(numbers);

  const [numberUpdate, setNumberUpdate] = useState(null);
  const [newPriceUpdate, setNewPriceUpdate] = useState(null);
  const [oldPriceUpdate, setOldPriceUpdate] = useState(null);
  const [categoryUpdate, setCategoryUpdate] = useState([]);
  const [splitNumberUpdate1, setSplitNumberUpdate1] = useState(null);
  const [splitNumberUpdate2, setSplitNumberUpdate2] = useState(null);
  const [splitNumberUpdate3, setSplitNumberUpdate3] = useState(null);
  const [splitNumberUpdate4, setSplitNumberUpdate4] = useState(null);
  const [splitNumberUpdate5, setSplitNumberUpdate5] = useState(null);
  const [searchData, setSearchData] = useState(null);

  const dispatch = useDispatch();

  //edit modal
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  //get Number details Modal
  const [numberDetails, setNumberDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleCloseDetails = () => setShowDetails(false);
  const handleShowDetails = () => setShowDetails(true);
  const { filterNumbers } = useSelector(
    (state) => state.filterNumberFancyReducer
  );

  const getNumberDetails = (number) => {
    setNumberDetails(number);
    handleShowDetails();
  };

  const handleEditButtonClick = (item) => {
    setSelectedItem(item);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const getHandleChangeCheckedValue = (e) => {
    const { checked, name } = e.target;

    if (checked) {
      setCategoryUpdate((pre) => [...pre, name]);
    } else {
      setCategoryUpdate((pre) => {
        return [...pre.filter((item) => item !== name)];
      });
    }
  };

  const handleEditButtonSubmit = (e) => {
    e.preventDefault();

    // total Sum logic
    const total = `${numberUpdate ? numberUpdate : selectedItem.number}`.split(
      ""
    );
    const strToNum = total.map((str) => parseInt(str));

    const oneTimeSum = strToNum.reduce(
      (previousScore, currentScore, index) => previousScore + currentScore,
      0
    );

    // alredy sum + once again sum
    const numberToStr = oneTimeSum.toString().split("");
    var strToNum1 = numberToStr.map((str) => parseInt(str));
    const secondTimeSum = strToNum1.reduce(
      (previousScore, currentScore, index) => previousScore + currentScore,
      0
    );

    // Thrid time sum + once again sum
    const numberToStr1 = secondTimeSum.toString().split("");
    var strToNum2 = numberToStr1.map((str) => parseInt(str));
    const thridTimeSum = strToNum2.reduce(
      (previousScore, currentScore, index) => previousScore + currentScore,
      0
    );

    const data = {
      number: numberUpdate || selectedItem.number,
      newPrice: newPriceUpdate || selectedItem.newPrice,
      oldPrice: oldPriceUpdate || selectedItem.oldPrice,
      currentUserId: currentUser._id,
      oneTimeSum,
      secondTimeSum,
      thridTimeSum,
      category: categoryUpdate || selectedItem.category,
      splitNumber1: splitNumberUpdate1 || selectedItem.splitNumber1,
      splitNumber2: splitNumberUpdate2 || selectedItem.splitNumber2,
      splitNumber3: splitNumberUpdate3 || selectedItem.splitNumber3,
      splitNumber4: splitNumberUpdate4 || selectedItem.splitNumber4,
      splitNumber5: splitNumberUpdate5 || selectedItem.splitNumber5,
    };

    dispatch(editNumber(data, selectedItem._id));

    setShow(false);
  };

  const size = useWindowSize();

  const handleDeleteNumber = (id, item) => {
    dispatch(deleteNumber(id));
    const reloadedNumber = letestNumber.filter(
      (currnetItem) => currnetItem !== item
    );
    setLetestNumber(reloadedNumber);
  };

  const handleSubmitForFilterNumber = (e) => {
    e.preventDefault();
    dispatch(filterNumberFancy(searchData));
  };

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
        header: "_id",
        key: "_id",
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
      {
        header: "createdAt",
        key: "createdAt",
        width: 20,
      },
    ];

    letestNumber?.map(async (product, index) => {
      sheet.addRow({
        id: product?._id,
        number: product?.number,
        newPrice: product?.newPrice,
        oldPrice: product?.oldPrice,
        oneTimeSum: product?.oneTimeSum,
        secondTimeSum: product?.secondTimeSum,
        thridTimeSum: product?.thridTimeSum,
        currentUserId: product?.currentUserId,
        category: product?.category.map((item) => item),
        createdAt: product?.createdAt,
      });
    });

    workbook.xlsx.writeBuffer().then(function (data) {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "download.xlsx";
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <>
      <Container fluid>
        <Helmet>
          <title>Permanent VIP Fancy Numbers Choose Number</title>
          <meta
            name="description"
            content="Unlock a lifetime of exclusivity with our premium Fancy Phone Numbers! Enquire now to reserve a unique, personalized mobile number that will be yours for a lifetime. Elevate your communication experience with a phone number that reflects your individuality. Stand out from the crowd and make a lasting impression. Enquire today and secure a fancy number that transcends time and trends!"
          />
        </Helmet>

        <Navbar>
          <Navbar.Brand>
            Total {letestNumber?.length} No Fancy Number
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button onClick={exportExcelFile}>download excel</Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>

        <Form className="d-flex mt-2" onSubmit={handleSubmitForFilterNumber}>
          <InputGroup className="mb-3">
            <Form.Control
              type="number"
              placeholder="Search"
              onChange={(e) => setSearchData(e.target.value)}
              style={{ background: "rgba(0, 0, 0, 0.1)", border: "none" }}
            />

            <Button
              type="submit"
              style={{ background: "rgba(0, 0, 0, 0.1)", border: "none" }}
            >
              <BiSearch />
            </Button>
          </InputGroup>
        </Form>

        <Table striped="columns">
          <Thead>
            <Tr>
              <Th>S.NO</Th>
              <Th>Number</Th>
              <Th>Date</Th>
              <Th>Action's</Th>
            </Tr>
          </Thead>

          {error && <Error error="Error While Fetching Number" />}
          {(loading && <Loading loading={loading} />) ||
            (filterNumbers &&
              filterNumbers.map((item, index) => (
                <>
                  <Tbody
                    style={{ borderBottom: "0.1px solid gray" }}
                    key={index}
                  >
                    <Tr>
                      <Td>{index + 1}</Td>
                      <Td>{item.number}</Td>
                      <Td>{format(item.updatedAt)}</Td>
                      <Td>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <FaTrash
                            className="text-danger"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleDeleteNumber(item._id, item);
                            }}
                          />

                          <FcViewDetails
                            className="text-danger"
                            style={{ cursor: "pointer" }}
                            onClick={() => getNumberDetails(item)}
                          />

                          <AiFillEdit
                            className="text-success"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleEditButtonClick(item)}
                          />
                        </div>
                      </Td>
                    </Tr>
                  </Tbody>
                </>
              )))}
          {letestNumber &&
            letestNumber.map((item, index) => (
              <>
                <Tbody style={{ borderBottom: "0.1px solid gray" }} key={index}>
                  <Tr>
                    <Td>{index + 1}</Td>
                    <Td>{item.number}</Td>
                    <Td>{format(item.updatedAt)}</Td>
                    <Td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <FaTrash
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            handleDeleteNumber(item._id, item);
                          }}
                        />

                        <FcViewDetails
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                          onClick={() => getNumberDetails(item)}
                        />

                        <AiFillEdit
                          className="text-success"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleEditButtonClick(item)}
                        />
                      </div>
                    </Td>
                  </Tr>
                </Tbody>
              </>
            ))}
        </Table>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit FancyNumber</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditButtonSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={`${selectedItem && selectedItem.number}`}
                  onChange={(e) => setNumberUpdate(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>New Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={`${selectedItem && selectedItem.newPrice}`}
                  onChange={(e) => setNewPriceUpdate(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Old Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={`${selectedItem && selectedItem.oldPrice}`}
                  onChange={(e) => setOldPriceUpdate(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Split Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={`${selectedItem && selectedItem?.splitNumber1}`}
                  onChange={(e) => setSplitNumberUpdate1(e.target.value)}
                />
                <Form.Control
                  type="number"
                  placeholder={`${selectedItem && selectedItem?.splitNumber2}`}
                  onChange={(e) => setSplitNumberUpdate2(e.target.value)}
                />
                <Form.Control
                  type="number"
                  placeholder={`${selectedItem && selectedItem?.splitNumber3}`}
                  onChange={(e) => setSplitNumberUpdate3(e.target.value)}
                />
                <Form.Control
                  type="number"
                  placeholder={`${selectedItem && selectedItem?.splitNumber4}`}
                  onChange={(e) => setSplitNumberUpdate4(e.target.value)}
                />
                <Form.Control
                  type="number"
                  placeholder={`${selectedItem && selectedItem?.splitNumber5}`}
                  onChange={(e) => setSplitNumberUpdate5(e.target.value)}
                />
              </Form.Group>

              <div>
                <span>selected category</span>
                {selectedItem &&
                  selectedItem?.category?.map((item, i) => (
                    <span key={i}>
                      <ul
                        style={{
                          margin: "0.2vw 0vw",
                          fontSize: "0.6vw",
                        }}
                      >
                        <li>{item}</li>
                      </ul>
                    </span>
                  ))}
              </div>

              <div
                style={{
                  margin: "0.2vw 0vw",
                  fontSize: `${size.width < 600 ? "2vw" : "0.6vw"}`,
                }}
              >
                <Row>
                  <Col md={3} xs={3}>
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`WITHOUT 2,4 & 8`}
                      onChange={getHandleChangeCheckedValue}
                      name={`WITHOUT 2,4 & 8`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`HIGH RANGE NUMBER`}
                      onChange={getHandleChangeCheckedValue}
                      name={`HIGH RANGE NUMBER`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`MIRROR NUMBER`}
                      onChange={getHandleChangeCheckedValue}
                      name={`MIRROR NUMBER`}
                    />
                    <Form.Check // prettier-ignore 2
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`XXX-YYY`}
                      onChange={getHandleChangeCheckedValue}
                      name={`XXX-YYY`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`ABCD-ABCD`}
                      onChange={getHandleChangeCheckedValue}
                      name={`ABCD-ABCD`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`786 SPECIAL`}
                      onChange={getHandleChangeCheckedValue}
                      name={`786 SPECIAL`}
                    />
                    <Form.Check // prettier-ignore 3
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`00X00 & 00XY00`}
                      onChange={getHandleChangeCheckedValue}
                      name={`00X00 & 00XY00`}
                    />
                    <Form.Check // prettier-ignore 2
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`ENDING HEXA`}
                      onChange={getHandleChangeCheckedValue}
                      name={`ENDING HEXA`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`MIDDLE HEXA`}
                      onChange={getHandleChangeCheckedValue}
                      name={`MIDDLE HEXA`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`ENDING PENTA`}
                      onChange={getHandleChangeCheckedValue}
                      name={`ENDING PENTA`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`ENDING 000XY`}
                      onChange={getHandleChangeCheckedValue}
                      name={`ENDING 000XY`}
                    />
                  </Col>
                  <Col md={3} xs={3}>
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`SEMI-MIRROR NUMBER`}
                      onChange={getHandleChangeCheckedValue}
                      name={`SEMI-MIRROR NUMBER`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`XY-XY-XY-XY`}
                      onChange={getHandleChangeCheckedValue}
                      name={`XY-XY-XY-XY`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`SYMMETRY NUMBER`}
                      onChange={getHandleChangeCheckedValue}
                      name={`SYMMETRY NUMBER`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`XYXY-ABAB`}
                      onChange={getHandleChangeCheckedValue}
                      name={`XYXY-ABAB`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`3 DIGIT NUMBER`}
                      onChange={getHandleChangeCheckedValue}
                      name={`3 DIGIT NUMBER`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`2 DIGIT NUMBER`}
                    />
                    <Form.Check // prettier-ignore 3
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`MIDDLE PENTA`}
                      onChange={getHandleChangeCheckedValue}
                      name={`MIDDLE PENTA`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`ENDING TETRA`}
                      onChange={getHandleChangeCheckedValue}
                      name={`ENDING TETRA`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`MIDDLE TETRA`}
                      onChange={getHandleChangeCheckedValue}
                      name={`MIDDLE TETRA`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`ENDING XXX`}
                      onChange={getHandleChangeCheckedValue}
                      name={`ENDING XXX`}
                    />
                  </Col>
                  <Col md={3} xs={3}>
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`FANCY NUMBER`}
                      onChange={getHandleChangeCheckedValue}
                      name={`FANCY NUMBER`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`LOW COST NUMBERS`}
                      onChange={getHandleChangeCheckedValue}
                      name={`LOW COST NUMBERS`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`DOUBLING NUMBER`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`ENDING XYZ-XYZ`}
                      onChange={getHandleChangeCheckedValue}
                      name={`ENDING XYZ-XYZ`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`SPECIAL DIGIT NUMBER`}
                      onChange={getHandleChangeCheckedValue}
                      name={`SPECIAL DIGIT NUMBER`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`XY-XY`}
                      onChange={getHandleChangeCheckedValue}
                      name={`XY-XY`}
                    />
                    <Form.Check // prettier-ignore 3
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`000000 NUMBERS`}
                      onChange={getHandleChangeCheckedValue}
                      name={`000000 NUMBERS`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`00000 NUMBERS`}
                      onChange={getHandleChangeCheckedValue}
                      name={`00000 NUMBERS`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`ENDING 0000`}
                      onChange={getHandleChangeCheckedValue}
                      name={`ENDING 0000`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`ENDING 0000X`}
                      onChange={getHandleChangeCheckedValue}
                      name={`ENDING 0000X`}
                    />
                  </Col>
                  <Col md={3} xs={3}>
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`ENDING XY-XY-XY`}
                      onChange={getHandleChangeCheckedValue}
                      name={`ENDING XY-XY-XY`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`MIDDLE XY-XY-XY`}
                      onChange={getHandleChangeCheckedValue}
                      name={`MIDDLE XY-XY-XY`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`STARTING XY-XY-XY`}
                      onChange={getHandleChangeCheckedValue}
                      name={`STARTING XY-XY-XY`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`ABCD-XY-ABCD`}
                      onChange={getHandleChangeCheckedValue}
                      name={`ABCD-XY-ABCD`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`COUNTING NUMBER`}
                      onChange={getHandleChangeCheckedValue}
                      name={`COUNTING NUMBER`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`STARTING XYZ-XYZ`}
                      onChange={getHandleChangeCheckedValue}
                      name={`STARTING XYZ-XYZ`}
                    />
                    <Form.Check // prettier-ignore 3
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`ENDING 0000XY`}
                      onChange={getHandleChangeCheckedValue}
                      name={`ENDING 0000XY`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`MIDDLE 0000`}
                      onChange={getHandleChangeCheckedValue}
                      name={`MIDDLE 0000`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`ENDING 000`}
                      onChange={getHandleChangeCheckedValue}
                      name={`ENDING 000`}
                    />
                    <Form.Check // prettier-ignore
                      type={"checkbox"}
                      id={`default-${"checkbox"}`}
                      label={`ENDING 000X`}
                      onChange={getHandleChangeCheckedValue}
                      name={`ENDING 000X`}
                    />
                  </Col>
                </Row>
              </div>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            {loading && <Loading loading={loading} />}
          </Modal.Body>
        </Modal>

        <Modal show={showDetails} onHide={handleCloseDetails}>
          <Modal.Header closeButton>
            <Modal.Title>{numberDetails?.number}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card style={{ width: "auto" }}>
              <ListGroup variant="flush">
                <ListGroup.Item
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <h6>Price</h6>
                  <h6>{numberDetails?.newPrice}</h6>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <h6>oldPrice</h6>
                  <h6>{numberDetails?.oldPrice}</h6>
                </ListGroup.Item>

                <ListGroup.Item
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <h6>oneTimeSum</h6>
                  <h6>{numberDetails?.oneTimeSum}</h6>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <h6>secondTimeSum</h6>
                  <h6>{numberDetails?.secondTimeSum}</h6>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <h6>thridTimeSum</h6>
                  <h6>{numberDetails?.thridTimeSum}</h6>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <h6>Category</h6>
                  <ul>
                    {numberDetails?.category.map((i, index) => (
                      <li key={index}>{i}</li>
                    ))}
                  </ul>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <h6>createdAt</h6>
                  <h6>{format(numberDetails?.createdAt)}</h6>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetails}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default FancyNumber;
