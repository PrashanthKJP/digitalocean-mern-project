import React from "react";
import { Button, Card, ToastContainer } from "react-bootstrap";
import { Link } from "react-router-dom";
import useWindowSize from "../coustomHook/useWindowSize";

const DemoCard = ({ item, actions, width }) => {
  const size = useWindowSize();

  function formatNumber(
    number,
    groupSize1,
    groupSize2,
    groupSize3,
    groupSize4,
    groupSize5
  ) {
    const regexPattern = new RegExp(
      `^(\\d{${groupSize1}})(\\d{${groupSize2}})(\\d{${groupSize3}})(\\d{${groupSize4}})(\\d{${groupSize5}})?$`
    );
    return number.replace(regexPattern, (_, g1, g2, g3, g4, g5) => {
      const groups = [g1, g2, g3, g4, g5].filter(Boolean); // Filter out undefined (empty) groups
      return groups.join("-");
    });
  }

  const dynamicGroupSize1 = parseInt(item.splitNumber1);
  const dynamicGroupSize2 = parseInt(item.splitNumber2);
  const dynamicGroupSize3 = parseInt(item.splitNumber3);
  const dynamicGroupSize4 = parseInt(item.splitNumber4);
  const dynamicGroupSize5 = parseInt(item.splitNumber5);

  const formattedNumber = formatNumber(
    item.number,
    dynamicGroupSize1,
    dynamicGroupSize2,
    dynamicGroupSize3,
    dynamicGroupSize4,
    dynamicGroupSize5
  );

  return (
    <>
      <Card
        className="custom-card productCard "
        style={{
          maxWidth: `${width && width ? width : "40vw"}`,
          backgroundImage:
            'url("https://wallpapers.com/images/hd/professional-background-4b31fgiuezafrguu.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          border: "none",
          boxSizing: "border-box",
        }}
      >
        <Card.Body>
          <Card.Title
            className="card-title"
            style={{ fontSize: `${size.width < 600 ? "4vw" : "auto"}` }}
          >
            {formattedNumber}
          </Card.Title>
          <Card.Text>
            <div
              className="card-details"
              style={{ fontSize: `${size.width < 600 ? "2.8vw" : "auto"}` }}
            >
              <span>
                SUM-TOTAL :- {item.oneTimeSum} = {item.secondTimeSum}
                {item.thridTimeSum ? ` + ${item.thridTimeSum}` : ""}
              </span>
            </div>
            {/* <div className="view-details">
              <Link to={`/details/${item._id}`} className="view-details-link">
                View Details
              </Link>
            </div> */}
          </Card.Text>
          <div
            className="price-section"
            style={{
              marginTop: "-2vh",
            }}
          >
            <span
              className=" productPrice"
              style={{ fontSize: `${size.width < 600 ? "3.1vw" : "auto"}` }}
            >
              Rs: {item.newPrice}
            </span>
            <span
              className=" productPrice"
              style={{ fontSize: `${size.width < 600 ? "3.1vw" : "auto"}` }}
            >
              {item.oldPrice && <del>Rs: {item.oldPrice}</del>}
            </span>
          </div>
          <div className="button-section" style={{ marginTop: "0.5vh" }}>
            <Link to="/cart">
              <Button
                variant="success"
                className="buy-now-button"
                onClick={() => actions(item)}
                size="sm"
                style={{
                  fontSize: `${size.width < 600 ? "2.6vw" : "1.1vw"}`,
                }}
              >
                Buy Now
              </Button>
            </Link>
            &nbsp;&nbsp;
            <Button
              className="add-to-cart-button"
              onClick={() => actions(item)}
              style={{
                fontSize: `${size.width < 600 ? "2.6vw" : "1.1vw"}`,
                // maxWidth: "30vw",
              }}
            >
              Add To Cart
            </Button>
            <ToastContainer />
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default DemoCard;
