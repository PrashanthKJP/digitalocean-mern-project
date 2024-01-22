import React from "react";
import Carousel from "react-bootstrap/Carousel";
import useWindowSize from "../coustomHook/useWindowSize";

const Carousels = () => {
  const size = useWindowSize();
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../images/1.jpg")}
          alt="First slide"
          style={{
            height: `${size.width < 600 ? "20vh" : "40vh"}`,
            borderRadius: "5vh",
            padding: `${size.width < 600 ? 0 : 10}`,
          }}
        />
        {/* <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../images/2.jpg")}
          alt="Second slide"
          style={{
            height: `${size.width < 600 ? "20vh" : "40vh"}`,
            borderRadius: "5vh",
            padding: `${size.width < 600 ? 0 : 10}`,
          }}
        />
        {/* <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../images/3.jpg")}
          alt="Third slide"
          style={{
            height: `${size.width < 600 ? "20vh" : "40vh"}`,
            borderRadius: "5vh",
            padding: `${size.width < 600 ? 0 : 10}`,
          }}
        />
        {/* <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
};

export default Carousels;
