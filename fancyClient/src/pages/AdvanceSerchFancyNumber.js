import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { addToCart } from "../action/cartAction";
import useWindowSize from "../coustomHook/useWindowSize";
import DemoCard from "./DemoCard";
import { Helmet } from "react-helmet";

const AdvanceSerchFancyNumber = () => {
  const dispatch = useDispatch();
  const advanceState = useSelector((state) => state.advanceNumberReducer);
  const { advanceNumbers, loading, error } = advanceState;

  const addToCarthandler = (item) => {
    dispatch(addToCart(item.newPrice, item.number, item.oldPrice, item._id));
    // notify();
  };

  const size = useWindowSize();

  return (
    <div>
      <Container fluid>
        <Helmet>
          <title>Life Time Fancy Number for Advance Search</title>
          <meta
            name="description"
            content="Unlock the power of precision with our Life Time Fancy Number Advance Search. Dive into a world of personalized mobile identities with an advanced search feature designed for discerning individuals. Tailor your search criteria to find the perfect fancy number that resonates with your unique style. Explore, discover, and secure a lifetime of distinction with a premium phone number that complements your individuality. Begin your advanced search now and redefine your communication experience!"
          />
        </Helmet>

        <Row>
          <Col md={12}>
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
                  (advanceNumbers &&
                    advanceNumbers.map((item, index) => (
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
                  (advanceNumbers &&
                    advanceNumbers.map((item, index) => (
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
  );
};

export default AdvanceSerchFancyNumber;
