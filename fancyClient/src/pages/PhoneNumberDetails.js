import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, Navbar } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DemoCard from "./DemoCard";
import { BASE_URL } from "../service/helper";
import { addToCart } from "../action/cartAction";
import { useDispatch } from "react-redux";
import useWindowSize from "../coustomHook/useWindowSize";
import { Helmet } from "react-helmet";

const PhoneNumberDetails = () => {
  const [zeroNumber, setZeroNumber] = useState(true);
  const [oneNumber, setOneNumber] = useState(false);
  const [twoNumber, setTwoNumber] = useState(false);
  const [threeNumber, setThreeNumber] = useState(false);
  const [fourNumber, setFourNumber] = useState(false);
  const [fiveNumber, setFiveNumber] = useState(false);
  const [sixNumber, setSixNumber] = useState(false);
  const [sevenNumber, setSevenNumber] = useState(false);
  const [eightNumber, setEightNumber] = useState(false);
  const [nineNumber, setNineNumber] = useState(false);

  const dispatch = useDispatch();

  const zeroIndexShow = () => {
    setZeroNumber(true);
    setOneNumber(false);
    setTwoNumber(false);
    setThreeNumber(false);
    setFourNumber(false);
    setFiveNumber(false);
    setSixNumber(false);
    setSevenNumber(false);
    setEightNumber(false);
    setNineNumber(false);
  };

  const oneIndexShow = () => {
    setZeroNumber(false);
    setOneNumber(true);
    setTwoNumber(false);
    setThreeNumber(false);
    setFourNumber(false);
    setFiveNumber(false);
    setSixNumber(false);
    setSevenNumber(false);
    setEightNumber(false);
    setNineNumber(false);
  };

  const twoIndexShow = () => {
    setZeroNumber(false);
    setOneNumber(false);
    setTwoNumber(true);
    setThreeNumber(false);
    setFourNumber(false);
    setFiveNumber(false);
    setSixNumber(false);
    setSevenNumber(false);
    setEightNumber(false);
    setNineNumber(false);
  };

  const threeIndexShow = () => {
    setZeroNumber(false);
    setOneNumber(false);
    setTwoNumber(false);
    setThreeNumber(true);
    setFourNumber(false);
    setFiveNumber(false);
    setSixNumber(false);
    setSevenNumber(false);
    setEightNumber(false);
    setNineNumber(false);
  };

  const fourIndexShow = () => {
    setZeroNumber(false);
    setOneNumber(false);
    setTwoNumber(false);
    setThreeNumber(false);
    setFourNumber(true);
    setFiveNumber(false);
    setSixNumber(false);
    setSevenNumber(false);
    setEightNumber(false);
    setNineNumber(false);
  };

  const fiveIndexShow = () => {
    setZeroNumber(false);
    setOneNumber(false);
    setTwoNumber(false);
    setThreeNumber(false);
    setFourNumber(false);
    setFiveNumber(true);
    setSixNumber(false);
    setSevenNumber(false);
    setEightNumber(false);
    setNineNumber(false);
  };

  const sixIndexShow = () => {
    setZeroNumber(false);
    setOneNumber(false);
    setTwoNumber(false);
    setThreeNumber(false);
    setFourNumber(false);
    setFiveNumber(false);
    setSixNumber(true);
    setSevenNumber(false);
    setEightNumber(false);
    setNineNumber(false);
  };

  const sevenIndexShow = () => {
    setZeroNumber(false);
    setOneNumber(false);
    setTwoNumber(false);
    setThreeNumber(false);
    setFourNumber(false);
    setFiveNumber(false);
    setSixNumber(false);
    setSevenNumber(true);
    setEightNumber(false);
    setNineNumber(false);
  };

  const eightIndexShow = () => {
    setZeroNumber(false);
    setOneNumber(false);
    setTwoNumber(false);
    setThreeNumber(false);
    setFourNumber(false);
    setFiveNumber(false);
    setSixNumber(false);
    setSevenNumber(false);
    setEightNumber(true);
    setNineNumber(false);
  };

  const nineIndexShow = () => {
    setZeroNumber(false);
    setOneNumber(false);
    setTwoNumber(false);
    setThreeNumber(false);
    setFourNumber(false);
    setFiveNumber(false);
    setSixNumber(false);
    setSevenNumber(false);
    setEightNumber(false);
    setNineNumber(true);
  };

  const { id } = useParams();

  const [data, setData] = useState(null);

  const getData = async (id) => {
    const res = await axios.get(`${BASE_URL}/api/getSingleNumber/${id}`);
    setData(res.data);
  };

  const addToCarthandler = (item) => {
    dispatch(addToCart(item.newPrice, item.number, item.oldPrice, item._id));
    // notify();
  };

  const size = useWindowSize();

  useEffect(() => {
    getData(id);
  }, [id]);

  return (
    <div style={{ height: "100vh" }}>
      <Container fluid>
        <Helmet>
          <title>Life Time Fancy Number PhoneNumberDetails</title>
          <meta
            name="description"
            content="Discover the unparalleled allure of our Life Time Fancy Numbers with PhoneNumberDetails. Each number tells a unique story, a lifetime of individuality captured in digits. Explore the exclusive details of our premium phone numbers and envision the extraordinary connection they bring. Elevate your personal and professional image with a fancy number that transcends time. Enquire now to unravel the intricate details of your personalized mobile identity. Your lifetime of distinction starts here."
          />
        </Helmet>
        <Row>
          <Col md={3} xs={12} style={{ margin: "auto" }}>
            <div>
              Status : <h3 style={{ color: "green" }}>Available</h3>
            </div>
            {data && (
              <DemoCard
                item={data}
                actions={() => addToCarthandler(data)}
                width={"100vw"}
              />
            )}
          </Col>
          <Col
            md={9}
            xs={12}
            style={{
              borderLeft: "1px solid black",
            }}
          >
            <Navbar>
              <Navbar.Brand
                style={{
                  margin: "auto",
                  fontWeight: "700",
                  fontStyle: "oblique",
                }}
              >
                Numerology : The Meaning Of Numbers 0 To 9
              </Navbar.Brand>
            </Navbar>
            <hr />
            <Navbar
              style={{
                justifyContent: "space-around",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              <span
                onClick={zeroIndexShow}
                style={{
                  width: "100vw",
                  color: `${zeroNumber ? "green" : "black"}`,
                  fontWeight: `${zeroNumber ? "700" : "500"}`,
                  fontSize: `${size.width < 600 ? "5vw" : "2vw"}`,
                }}
              >
                0
              </span>
              |
              <span
                onClick={oneIndexShow}
                style={{
                  width: "100vw",
                  color: `${oneNumber ? "green" : "black"}`,
                  fontWeight: `${oneNumber ? "700" : "500"}`,
                  fontSize: `${size.width < 600 ? "5vw" : "2vw"}`,
                }}
              >
                1
              </span>{" "}
              |
              <span
                onClick={twoIndexShow}
                style={{
                  width: "100vw",
                  color: `${twoNumber ? "green" : "black"}`,
                  fontWeight: `${twoNumber ? "700" : "500"}`,
                  fontSize: `${size.width < 600 ? "5vw" : "2vw"}`,
                }}
              >
                2
              </span>{" "}
              |
              <span
                onClick={threeIndexShow}
                style={{
                  width: "100vw",
                  color: `${threeNumber ? "green" : "black"}`,
                  fontWeight: `${threeNumber ? "700" : "500"}`,
                  fontSize: `${size.width < 600 ? "5vw" : "2vw"}`,
                }}
              >
                3
              </span>{" "}
              |
              <span
                onClick={fourIndexShow}
                style={{
                  width: "100vw",
                  color: `${fourNumber ? "green" : "black"}`,
                  fontWeight: `${fourNumber ? "700" : "500"}`,
                  fontSize: `${size.width < 600 ? "5vw" : "2vw"}`,
                }}
              >
                4
              </span>{" "}
              |
              <span
                onClick={fiveIndexShow}
                style={{
                  width: "100vw",
                  color: `${fiveNumber ? "green" : "black"}`,
                  fontWeight: `${fiveNumber ? "700" : "500"}`,
                  fontSize: `${size.width < 600 ? "5vw" : "2vw"}`,
                }}
              >
                5
              </span>{" "}
              |
              <span
                onClick={sixIndexShow}
                style={{
                  width: "100vw",
                  color: `${sixNumber ? "green" : "black"}`,
                  fontWeight: `${sixNumber ? "700" : "500"}`,
                  fontSize: `${size.width < 600 ? "5vw" : "2vw"}`,
                }}
              >
                6
              </span>{" "}
              |
              <span
                onClick={sevenIndexShow}
                style={{
                  width: "100vw",
                  color: `${sevenNumber ? "green" : "black"}`,
                  fontWeight: `${sevenNumber ? "700" : "500"}`,
                  fontSize: `${size.width < 600 ? "5vw" : "2vw"}`,
                }}
              >
                7
              </span>{" "}
              |
              <span
                onClick={eightIndexShow}
                style={{
                  width: "100vw",
                  color: `${eightNumber ? "green" : "black"}`,
                  fontWeight: `${eightNumber ? "700" : "500"}`,
                  fontSize: `${size.width < 600 ? "5vw" : "2vw"}`,
                }}
              >
                8
              </span>{" "}
              |
              <span
                onClick={nineIndexShow}
                style={{
                  width: "100vw",
                  color: `${nineNumber ? "green" : "black"}`,
                  fontWeight: `${nineNumber ? "700" : "500"}`,
                  fontSize: `${size.width < 600 ? "5vw" : "2vw"}`,
                }}
              >
                9
              </span>
            </Navbar>

            {zeroNumber && (
              <>
                <Card
                  show={zeroNumber}
                  style={{ maxHeight: "40vh", overflow: "scroll" }}
                >
                  <Card.Header>
                    The Meaning Of The Number 0 – You Are On The Right Path
                  </Card.Header>
                  <Card.Body>
                    This number is often associated with nothingness. Therefore,
                    it cannot be your life path number but can be added on the
                    end of other numbers to add greater significance, such as
                    multiples of ten which suggest increased meaning and energy
                    than one alone.If you keep seeing zeroes, don’t change
                    anything you’re doing! This number is associated with being
                    entirely on the right path, and with heading towards the
                    best version of yourself.It’s a particularly reassuring
                    number to see when you’ve been doubting yourself or your
                    abilities, so look out for it even when you’re feeling
                    insecure.
                  </Card.Body>
                </Card>
              </>
            )}

            {oneNumber && (
              <>
                <Card
                  show={oneNumber}
                  style={{ maxHeight: "40vh", overflow: "scroll" }}
                >
                  <Card.Header>
                    The Meaning Of Number 1 – Make Change And Embrace New
                    Beginnings{" "}
                  </Card.Header>
                  <Card.Body>
                    Seeing the number 1 suggests that you may be struggling with
                    negativity. Plus, since you create your own reality, this
                    number is a reminder that you may be accidentally creating
                    more negativity.Think about why, and refocus your mind
                    towards your desires rather than your fears to ensure you
                    vibrate on a frequency of abundance rather than lack.
                  </Card.Body>
                </Card>
              </>
            )}

            {twoNumber && (
              <>
                <Card
                  show={twoNumber}
                  style={{ maxHeight: "40vh", overflow: "scroll" }}
                >
                  <Card.Header>
                    The Meaning Of Number 2 – Expect Harmony And Balance
                  </Card.Header>
                  <Card.Body>
                    Have things been tough for you recently? Two symbolizes
                    balance, so if you are currently surrounded by conflict and
                    keep seeing the number 2, have faith that things will get
                    better. Repetitions of the number 2 tell you that if you
                    just hold on and wait for the balance to come. Stay true to
                    the vision you have for the future. In addition, know that
                    optimism is justified.Alternatively, if you feel like
                    nothing could go wrong, keep practicing positive thinking
                    and be prepared for anything that may try and sway your mind
                    to negativity. Design some affirmations based on the idea of
                    strength and resilience, and say each one twice. Also
                    concentrate on relationships, business partnerships, and
                    teamwork. It may be seeing the number two everywhere is a
                    sign that you need to work on your relationships with
                    another person.
                  </Card.Body>
                </Card>
              </>
            )}

            {threeNumber && (
              <>
                <Card
                  show={threeNumber}
                  style={{ maxHeight: "40vh", overflow: "scroll" }}
                >
                  <Card.Header>
                    The Meaning Of Number 3 – Chase Your Dreams
                  </Card.Header>
                  <Card.Body>
                    The number 3 indicates that sources of love and wisdom are
                    nearby, and are yours to benefit from. It is also often
                    associated with luck and good fortune.This could be the
                    exact right time to expand your knowledge base, chase your
                    dreams, and challenge yourself. After all, you may have luck
                    and wisdom on your side. This has broad applicability, so
                    when you discover your passion number this may relate to
                    everything from love to money, achievement, and personal
                    growth. So, for example, if you’re having lunch with someone
                    and see a lot of 3s on the check, think harder about how
                    this person might be able to help you get what you want in
                    life.
                  </Card.Body>
                </Card>
              </>
            )}

            {fourNumber && (
              <>
                <Card
                  show={fourNumber}
                  style={{ maxHeight: "40vh", overflow: "scroll" }}
                >
                  <Card.Header>
                    The Meaning Of Number 4 – Take A Leap Of Faith
                  </Card.Header>
                  <Card.Body>
                    The number 4 can represent stability and routine. For
                    example, the four seasons (Spring, Summer, Autumn, and
                    Winter). However, if you’ve been seeing the number 4 a lot
                    recently, you may be playing things just a little bit too
                    safe. Maybe you've been living your life on a strict
                    routine, planning extensively and waiting for the right time
                    to chase your dreams.Part of productive manifestation work
                    involves pushing yourself out of your comfort zone and
                    experimenting with new ways of being. Repeating 4s is a sign
                    that you would benefit from taking a leap of faith in some
                    respect.
                  </Card.Body>
                </Card>
              </>
            )}

            {fiveNumber && (
              <>
                <Card
                  show={fiveNumber}
                  style={{ maxHeight: "40vh", overflow: "scroll" }}
                >
                  <Card.Header>
                    The Meaning Of Number 5 – Offer Gratitude To The World
                    Around You
                  </Card.Header>
                  <Card.Body>
                    The number 5 is often associated with adventure and change.
                    It will often appear when it’s time to start listening to
                    your body (your five senses) and to the people around you.
                    Perhaps you’re struggling with something by yourself, taking
                    on too much, or not collaborating with others. The number 5
                    is here to tell you that the most positive change will
                    result from appreciating the world around you. Offer
                    gratitude for what you see, hear, touch, smell, and feel. It
                    also suggests you may go on a journey (whether that be a
                    mental, spiritual, or physical journey).
                  </Card.Body>
                </Card>
              </>
            )}

            {sixNumber && (
              <>
                <Card
                  show={sixNumber}
                  style={{ maxHeight: "40vh", overflow: "scroll" }}
                >
                  <Card.Header>
                    The Meaning Of Number 6 – Rid Your Life Of Negative Energy
                  </Card.Header>
                  <Card.Body>
                    In Tarot, six represents the Lovers. In this way, if you
                    keep seeing the number six, it may be a sign you need to
                    embrace inner peace and self-love. Similarly, when you’re
                    being held back by anxiety or fear, it’s common to see the
                    number 6 all around you. It lets you know that you need to
                    find ways to move past these feelings if you’re going to
                    manifest what you want.Journal work, therapy, and positive
                    affirmations are some of the best tools at your disposal if
                    you keep seeing the number 6.
                  </Card.Body>
                </Card>
              </>
            )}

            {sevenNumber && (
              <>
                <Card
                  show={sevenNumber}
                  style={{ maxHeight: "40vh", overflow: "scroll" }}
                >
                  <Card.Header>
                    The Meaning Of Number 7 – Prepare For A Spiritual Awakening
                  </Card.Header>
                  <Card.Body>
                    The number 7 is intimately connected with new opportunities,
                    especially ones that you weren’t expecting to come your way.
                    It might appear in connection with job adverts, dating
                    prospects, places to live, or new classes, but no matter
                    where you see repeated 7s you can be sure that there’s
                    something highly advantageous hidden in plain sight. Trust
                    your instincts when you keep seeing the number seven and
                    prepare for a spiritual awakening.
                  </Card.Body>
                </Card>
              </>
            )}

            {eightNumber && (
              <>
                <Card
                  show={sevenNumber}
                  style={{ maxHeight: "40vh", overflow: "scroll" }}
                >
                  <Card.Header>
                    The Meaning Of Number 8 – A Sign Of Success
                  </Card.Header>
                  <Card.Body>
                    In China, 8 is an incredibly lucky number. This number is
                    often a symbol of abundance and prosperity. The shape of the
                    number eight also suggests themes of momentum and repetition
                    due to its cycles and link to infinity. Therefore, if you
                    keep seeing the number eight, be sure to purge any negative
                    thinking, allowing positivity to exponentially grow inside
                    of you. Seeing repeated occurrences of the number 8 is a
                    generally positive sign, as this number is also tied to
                    balance and success. Any time you see this number, it can
                    point you towards changes to empower yourself, boost your
                    self-confidence and become more influential in your chosen
                    field.
                  </Card.Body>
                </Card>
              </>
            )}

            {nineNumber && (
              <>
                <Card
                  show={nineNumber}
                  style={{ maxHeight: "40vh", overflow: "scroll" }}
                >
                  <Card.Header>
                    The Meaning Of Number 9 – Share Your Wisdom With The World
                  </Card.Header>
                  <Card.Body>
                    Finally, the number 9 is linked to compassion and empathy.
                    It may be you are a natural empath. If you’re seeing it in
                    your life then there’s a good chance that you’re bringing a
                    lot of good into the lives of others. Nine can be a sign
                    that you should share your talents and wisdom with the
                    world! On the other hand, 9 is there to prompt you to think
                    about whether you’re working too hard to meet the needs of
                    others. It may be time to redirect some of that energy to
                    your own aims and goals. However, no matter what, be sure to
                    trust your own abilities and embrace your charitable nature.
                  </Card.Body>
                </Card>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PhoneNumberDetails;
