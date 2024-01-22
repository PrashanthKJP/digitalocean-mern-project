import React, { useEffect, useState } from "react";
import { Button, Card, ToastContainer } from "react-bootstrap";
import { Link } from "react-router-dom";
import useWindowSize from "../coustomHook/useWindowSize";

const DemoCard = ({ item, actions, width }) => {
  const size = useWindowSize();

  function formatNumber(number, groupSize) {
    const regexPattern = new RegExp(
      `\\B(?=(\\d{${groupSize}}|\\d{${groupSize}})+(?!\\d))`,
      "g"
    );
    return number.toString().replace(regexPattern, "-");
  }

  const dynamicGroupSize = item.splitNumber || 4;
  const formattedNumber = formatNumber(item.number, dynamicGroupSize);

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
              style={{ fontSize: `${size.width < 600 ? "3vw" : "auto"}` }}
            >
              <span>
                SUM-TOTAL :- {item.oneTimeSum} + {item.secondTimeSum}
                {item.thirdTimeSum ? ` + ${item.thirdTimeSum}` : ""}
              </span>
            </div>
            <div className="view-details">
              <Link to={`/details/${item._id}`} className="view-details-link">
                View Details
              </Link>
            </div>
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
                style={{
                  fontSize: `${size.width < 600 ? "1.8vw" : "auto"}`,
                }}
              >
                Buy Now
              </Button>
            </Link>
            <Button
              className="add-to-cart-button"
              onClick={() => actions(item)}
              style={{
                fontSize: `${size.width < 600 ? "1.8vw" : "auto"}`,
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
