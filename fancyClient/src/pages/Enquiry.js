import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";

const Enquiry = () => {
  const [showWhyWeNeed, setShowWhyWeNeed] = useState(true);
  const [showHowToGet, setShowHowToGet] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showFollow, setShowFollow] = useState(false);

  const whyWeNeedShow = () => {
    setShowWhyWeNeed(true);
    setShowHowToGet(false);
    setShowPayment(false);
    setShowAbout(false);
    setShowFollow(false);
  };
  const whyWeNeedClose = () => {
    setShowWhyWeNeed(false);
  };

  const HowToGetShow = () => {
    setShowHowToGet(true);
    setShowWhyWeNeed(false);
    setShowPayment(false);
    setShowAbout(false);
    setShowFollow(false);
  };
  const HowToGetClose = () => {
    setShowHowToGet(false);
  };

  const PaymentShow = () => {
    setShowPayment(true);
    setShowHowToGet(false);
    setShowWhyWeNeed(false);
    setShowAbout(false);
    setShowFollow(false);
  };
  const PaymentClose = () => {
    setShowPayment(false);
  };

  const aboutShow = () => {
    setShowAbout(true);
    setShowPayment(false);
    setShowHowToGet(false);
    setShowWhyWeNeed(false);
    setShowFollow(false);
  };
  const aboutClose = () => {
    setShowAbout(false);
  };
  const followShow = () => {
    setShowFollow(true);
    setShowPayment(false);
    setShowHowToGet(false);
    setShowWhyWeNeed(false);
    setShowAbout(false);
  };
  const followClose = () => {
    setShowFollow(false);
  };
  return (
    <div style={{ height: "100vh" }}>
      <Container fluid>
        <Helmet>
          <title>Life Time Fancy Number Enquiry</title>
          <meta
            name="description"
            content="Unlock a lifetime of exclusivity with our premium Fancy Phone Numbers! Enquire now to reserve a unique, personalized mobile number that will be yours for a lifetime. Elevate your communication experience with a phone number that reflects your individuality. Stand out from the crowd and make a lasting impression. Enquire today and secure a fancy number that transcends time and trends!"
          />
        </Helmet>
        <Row>
          <Col md={6} xs={12}>
            <div
              style={{ minHeight: "50vh", padding: "5vh", fontStyle: "italic" }}
            >
              <h6 onClick={whyWeNeedShow} style={{ cursor: "pointer" }}>
                1. Why We Need
              </h6>
              <h6 onClick={HowToGetShow} style={{ cursor: "pointer" }}>
                2. How to get a Fancy Mobile Number
              </h6>
              <h6 onClick={PaymentShow} style={{ cursor: "pointer" }}>
                3. Payment Accepted
              </h6>
              <h6 onClick={aboutShow} style={{ cursor: "pointer" }}>
                4. About Company
              </h6>
              <h6 onClick={followShow} style={{ cursor: "pointer" }}>
                5. Follow Us
              </h6>
            </div>
          </Col>
          <Col md={6} xs={12}>
            {showWhyWeNeed && (
              <>
                <Card show={showWhyWeNeed} onHide={whyWeNeedClose}>
                  <Card.Header>Why We Need</Card.Header>
                  <Card.Body>
                    Getting fancy mobile number is one of the small luxuries
                    everyone desires, since it's so easy to remember and share
                    with others. vip fancy number are made available inside a
                    sequence whenever a telecom operator releases a batch of
                    numbers.
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="primary" onClick={whyWeNeedClose}>
                      Okay.
                    </Button>
                  </Card.Footer>
                </Card>
              </>
            )}

            {showHowToGet && (
              <>
                <Card show={showHowToGet} onHide={HowToGetClose}>
                  <Card.Header>How to get a Fancy Mobile Number</Card.Header>
                  <Card.Body>
                    Most of our numbers get sold very quickly as they come on
                    our portal at the best prices. These numbers are available
                    for online vip fancy number. All the VIP fancy Numbers we
                    sell all over India from the low range of Rs 1,200 to the
                    highest price of Rs 24,50,000. Once the payment is done, Our
                    team will share a Unique Porting Code (UPC) for the fancy
                    mobile number along with an invoice for the same. Once you
                    receive the UPC, you can go for the registration to your
                    telecom provider's service center and provide them the UPC
                    and supporting documents. The new fancy mobile number
                    usually takes 4-5 days to activate.
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="primary" onClick={HowToGetClose}>
                      Okay.
                    </Button>
                  </Card.Footer>
                </Card>
              </>
            )}

            {showPayment && (
              <>
                <Card show={showPayment} onHide={PaymentClose}>
                  <Card.Header>Payment Accepted</Card.Header>
                  <Card.Body>
                    We accept payment through all available payment methods.
                    Here we assure you 100% payment protection guaranteed. So
                    you can purchase any number with our hassle-free process. We
                    wish you all the best for your future.
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="primary" onClick={PaymentClose}>
                      Okay.
                    </Button>
                  </Card.Footer>
                </Card>
              </>
            )}

            {showAbout && (
              <>
                <Card show={showAbout} onHide={aboutClose}>
                  <Card.Header>About Company</Card.Header>
                  <Card.Body>
                    Terms & Conditions Refund & Cancellation Policy Privacy
                    Policy What You Need To Know About Fancy Numbers Best VIP
                    Number Provider In India Choose Favourite Mobile Number For
                    Your Business
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="primary" onClick={aboutClose}>
                      Okay.
                    </Button>
                  </Card.Footer>
                </Card>
              </>
            )}

            {showFollow && (
              <>
                <Card show={showFollow} onHide={followClose}>
                  <Card.Header>Follow Us</Card.Header>
                  <Card.Body>Facebook Instagram Pinterest</Card.Body>
                  <Card.Footer>
                    <Button variant="primary" onClick={followClose}>
                      Okay.
                    </Button>
                  </Card.Footer>
                </Card>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Enquiry;
