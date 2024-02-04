import React, { useEffect, useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addNumber, getSingleNumber } from "../action/numberAction";
import Loading from "../components/Loading";
import useWindowSize from "../coustomHook/useWindowSize";
import axios from "axios";
import { BASE_URL } from "../service/helper";

const AddNumber = () => {
  const [number, setNumber] = useState(null);
  const [newPrice, setNewPrice] = useState(null);
  const [oldPrice, setOldPrice] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [splitNumber1, setSplitNumber1] = useState(0);
  const [splitNumber2, setSplitNumber2] = useState(0);
  const [splitNumber3, setSplitNumber3] = useState(0);
  const [splitNumber4, setSplitNumber4] = useState(0);
  const [splitNumber5, setSplitNumber5] = useState(0);

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.loginUser);
  const addNumberState = useSelector((state) => state.addNumberReducer);
  const { loading } = addNumberState;

  const getHandleChangeCheckedValue = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      setSelectedCategory((pre) => [...pre, name]);
    } else {
      setSelectedCategory((pre) => {
        return [...pre.filter((item) => item !== name)];
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // total Sum logic
    const total = number.split("");
    var strToNum = total.map((str) => parseInt(str));
    const oneTimeSum = strToNum.reduce(
      (previousScore, currentScore, index) => previousScore + currentScore,
      0
    );

    // Second time sum + once again sum
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
      number,
      newPrice,
      oldPrice,
      oneTimeSum,
      secondTimeSum,
      thridTimeSum,
      currentUserId: currentUser._id,
      category: selectedCategory,
      splitNumber1,
      splitNumber2,
      splitNumber3,
      splitNumber4,
      splitNumber5,
    };
    dispatch(addNumber(data));
  };

  const size = useWindowSize();

  useEffect(() => {
    dispatch(getSingleNumber(number));
  }, [selectedCategory, dispatch, number]);

  return (
    <Form onSubmit={handleSubmit}>
      <Container fluid>
        <Row>
          <Col md={6} xs={12}>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number"
                onChange={(e) => setNumber(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6} xs={12}>
            <Form.Group>
              <Form.Label>Old Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Amount"
                onChange={(e) => setOldPrice(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6} xs={12}>
            <Form.Group>
              <Form.Label>New Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Amount"
                onChange={(e) => setNewPrice(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Form.Label>Add Split Number</Form.Label>

          <Col md={6} xs={6}>
            <Form.Group>
              <Form.Control
                type="number"
                placeholder="Number 1"
                onChange={(e) => setSplitNumber1(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6} xs={6}>
            <Form.Group>
              <Form.Control
                type="number"
                placeholder="Number 2"
                onChange={(e) => setSplitNumber2(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6} xs={6}>
            <Form.Group>
              <Form.Control
                type="number"
                placeholder="Number 3"
                onChange={(e) => setSplitNumber3(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6} xs={6}>
            <Form.Group>
              <Form.Control
                type="number"
                placeholder="Number 4"
                onChange={(e) => setSplitNumber4(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6} xs={6}>
            <Form.Group>
              <Form.Control
                type="number"
                placeholder="Number 5"
                onChange={(e) => setSplitNumber5(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <div
          className="scrollBar"
          style={{
            padding: "1vw 2vw",
          }}
        >
          <Row>
            <Col md={4} xs={4}>
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`WITHOUT 2,4 & 8`}
                onChange={getHandleChangeCheckedValue}
                name={`WITHOUT 2,4 & 8`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`HIGH RANGE NUMBER`}
                onChange={getHandleChangeCheckedValue}
                name={`HIGH RANGE NUMBER`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`MIRROR NUMBER`}
                onChange={getHandleChangeCheckedValue}
                name={`MIRROR NUMBER`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore 2
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`XXX-YYY`}
                onChange={getHandleChangeCheckedValue}
                name={`XXX-YYY`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`ABCD-ABCD`}
                onChange={getHandleChangeCheckedValue}
                name={`ABCD-ABCD`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`786 SPECIAL`}
                onChange={getHandleChangeCheckedValue}
                name={`786 SPECIAL`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore 3
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`00X00 & 00XY00`}
                onChange={getHandleChangeCheckedValue}
                name={`00X00 & 00XY00`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore 2
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`ENDING HEXA`}
                onChange={getHandleChangeCheckedValue}
                name={`ENDING HEXA`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`MIDDLE HEXA`}
                onChange={getHandleChangeCheckedValue}
                name={`MIDDLE HEXA`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`ENDING PENTA`}
                onChange={getHandleChangeCheckedValue}
                name={`ENDING PENTA`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`ENDING 000XY`}
                onChange={getHandleChangeCheckedValue}
                name={`ENDING 000XY`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`SEMI-MIRROR NUMBER`}
                onChange={getHandleChangeCheckedValue}
                name={`SEMI-MIRROR NUMBER`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`STARTING XYZ-XYZ`}
                onChange={getHandleChangeCheckedValue}
                name={`STARTING XYZ-XYZ`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore 3
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`ENDING 0000XY`}
                onChange={getHandleChangeCheckedValue}
                name={`ENDING 0000XY`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`MIDDLE 0000`}
                onChange={getHandleChangeCheckedValue}
                name={`MIDDLE 0000`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
            </Col>
            <Col md={4} xs={4}>
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`XY-XY-XY-XY`}
                onChange={getHandleChangeCheckedValue}
                name={`XY-XY-XY-XY`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`SYMMETRY NUMBER`}
                onChange={getHandleChangeCheckedValue}
                name={`SYMMETRY NUMBER`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`XYXY-ABAB`}
                onChange={getHandleChangeCheckedValue}
                name={`XYXY-ABAB`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`3 DIGIT NUMBER`}
                onChange={getHandleChangeCheckedValue}
                name={`3 DIGIT NUMBER`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`2 DIGIT NUMBER`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore 3
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`MIDDLE PENTA`}
                onChange={getHandleChangeCheckedValue}
                name={`MIDDLE PENTA`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`ENDING TETRA`}
                onChange={getHandleChangeCheckedValue}
                name={`ENDING TETRA`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`MIDDLE TETRA`}
                onChange={getHandleChangeCheckedValue}
                name={`MIDDLE TETRA`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`ENDING XXX`}
                onChange={getHandleChangeCheckedValue}
                name={`ENDING XXX`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`FANCY NUMBER`}
                onChange={getHandleChangeCheckedValue}
                name={`FANCY NUMBER`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`LOW COST NUMBERS`}
                onChange={getHandleChangeCheckedValue}
                name={`LOW COST NUMBERS`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`DOUBLING NUMBER`}
                onChange={getHandleChangeCheckedValue}
                name={`LOW COST NUMBERS`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`ENDING 000`}
                onChange={getHandleChangeCheckedValue}
                name={`ENDING 000`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`ENDING 000X`}
                onChange={getHandleChangeCheckedValue}
                name={`ENDING 000X`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
            </Col>
            <Col md={4} xs={4}>
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`ENDING XYZ-XYZ`}
                onChange={getHandleChangeCheckedValue}
                name={`ENDING XYZ-XYZ`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`SPECIAL DIGIT NUMBER`}
                onChange={getHandleChangeCheckedValue}
                name={`SPECIAL DIGIT NUMBER`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`XY-XY`}
                onChange={getHandleChangeCheckedValue}
                name={`XY-XY`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore 3
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`000000 NUMBERS`}
                onChange={getHandleChangeCheckedValue}
                name={`000000 NUMBERS`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`00000 NUMBERS`}
                onChange={getHandleChangeCheckedValue}
                name={`00000 NUMBERS`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`ENDING 0000`}
                onChange={getHandleChangeCheckedValue}
                name={`ENDING 0000`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`ENDING 0000X`}
                onChange={getHandleChangeCheckedValue}
                name={`ENDING 0000X`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`ENDING XY-XY-XY`}
                onChange={getHandleChangeCheckedValue}
                name={`ENDING XY-XY-XY`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`MIDDLE XY-XY-XY`}
                onChange={getHandleChangeCheckedValue}
                name={`MIDDLE XY-XY-XY`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`STARTING XY-XY-XY`}
                onChange={getHandleChangeCheckedValue}
                name={`STARTING XY-XY-XY`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`ABCD-XY-ABCD`}
                onChange={getHandleChangeCheckedValue}
                name={`ABCD-XY-ABCD`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`default-${"checkbox"}`}
                label={`COUNTING NUMBER`}
                onChange={getHandleChangeCheckedValue}
                name={`COUNTING NUMBER`}
                style={{ fontSize: `${size.width < 600 ? "2vw" : "1vw"}` }}
              />
            </Col>
          </Row>
          {loading && <Loading loading={loading} />}

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Container>
    </Form>
  );
};

export default AddNumber;
