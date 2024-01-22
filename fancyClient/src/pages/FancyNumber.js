import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Modal,
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
// import "table/dist/SuperResponsiveTableStyle.css ";

const FancyNumber = () => {
  const FancyNumberState = useSelector((state) => state.getAllNumberReducer);
  const { loading, error, numbers } = FancyNumberState;
  const { currentUser } = useSelector((state) => state.loginUser);
  const [letestNumber, setLetestNumber] = useState(numbers);

  const [numberUpdate, setNumberUpdate] = useState(null);
  const [newPriceUpdate, setNewPriceUpdate] = useState(null);
  const [oldPriceUpdate, setOldPriceUpdate] = useState(null);
  const [categoryUpdate, setCategoryUpdate] = useState([]);
  const [splitNumberUpdate, setSplitNumberUpdate] = useState(null);

  const dispatch = useDispatch();

  //edit modal
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  //get Number details Modal
  const [numberDetails, setNumberDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleCloseDetails = () => setShowDetails(false);
  const handleShowDetails = () => setShowDetails(true);

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
    var strToNum = total.map((str) => parseInt(str));

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

    //thired time sum

    const numberToStr1 = secondTimeSum.toString().split("");
    if (numberToStr1.length > 1) {
      var strToNum2 = numberToStr1.map((str) => parseInt(str));
      var thridTimeSum = strToNum2.reduce(
        (previousScore, currentScore) => previousScore + currentScore,
        0
      );
    }

    const data = {
      number: numberUpdate || selectedItem.number,
      newPrice: newPriceUpdate || selectedItem.newPrice,
      oldPrice: oldPriceUpdate || selectedItem.oldPrice,
      currentUserId: currentUser._id,
      oneTimeSum,
      secondTimeSum,
      thridTimeSum,
      category: categoryUpdate || selectedItem.category,
      splitNumber: splitNumberUpdate || selectedItem.splitNumber,
    };

    dispatch(editNumber(data, selectedItem._id));

    setShow(false);
  };

  const size = useWindowSize();

  useEffect(() => {
    dispatch(getAllNumber());
    console.log(selectedItem);
  }, [dispatch, selectedItem, numberDetails]);

  const handleDeleteNumber = (id, item) => {
    dispatch(deleteNumber(id));
    const reloadedNumber = letestNumber.filter(
      (currnetItem) => currnetItem !== item
    );
    setLetestNumber(reloadedNumber);
  };

  return (
    <Container fluid>
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
          (letestNumber &&
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
                  <Container fluid>
                    <Row>
                      <Col md={12}>
                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Edit FancyNumber</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form onSubmit={handleEditButtonSubmit}>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                              >
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                  type="number"
                                  placeholder={`${
                                    selectedItem && selectedItem.number
                                  }`}
                                  onChange={(e) =>
                                    setNumberUpdate(e.target.value)
                                  }
                                />
                              </Form.Group>

                              <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                              >
                                <Form.Label>New Price</Form.Label>
                                <Form.Control
                                  type="number"
                                  placeholder={`${
                                    selectedItem && selectedItem.newPrice
                                  }`}
                                  onChange={(e) =>
                                    setNewPriceUpdate(e.target.value)
                                  }
                                />
                              </Form.Group>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                              >
                                <Form.Label>Old Price</Form.Label>
                                <Form.Control
                                  type="number"
                                  placeholder={`${
                                    selectedItem && selectedItem.oldPrice
                                  }`}
                                  onChange={(e) =>
                                    setOldPriceUpdate(e.target.value)
                                  }
                                />
                              </Form.Group>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                              >
                                <Form.Label>Split Number</Form.Label>
                                <Form.Control
                                  type="number"
                                  placeholder={`${
                                    selectedItem && selectedItem?.splitNumber
                                  }`}
                                  onChange={(e) =>
                                    setSplitNumberUpdate(e.target.value)
                                  }
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
                                  fontSize: `${
                                    size.width < 600 ? "2vw" : "0.6vw"
                                  }`,
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
                      </Col>
                    </Row>
                  </Container>
                </Tbody>
              </>
            )))}
      </Table>
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
  );
};

export default FancyNumber;
