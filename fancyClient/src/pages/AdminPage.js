import React, { useEffect, useState } from "react";
import { Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";
import UserList from "./UserList"; // Import your components
import FancyNumber from "./FancyNumber";
import AddNumber from "./AddNumber";
import Orders from "./Orders";
import { Helmet } from "react-helmet";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("users");

  const handleButtonClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Container>
        <h1 className="text-center bg-dark text-light p-2">Admin Panel</h1>
        <Helmet>
          <title>Fancy Number Admin Panel</title>
          <meta name="description" content="admin access" />
        </Helmet>

        <Row>
          <Col md={0} xs={2} style={{ paddingLeft: "1vw" }}>
            <ButtonGroup vertical style={{ minHeight: "400px" }}>
              <Button
                onClick={() => handleButtonClick("users")}
                variant={activeTab === "users" ? "dark" : "light"}
              >
                Users
              </Button>
              <Button
                onClick={() => handleButtonClick("fancyNumber")}
                variant={activeTab === "fancyNumber" ? "dark" : "light"}
              >
                Fancy Number
              </Button>
              <Button
                onClick={() => handleButtonClick("addNumber")}
                variant={activeTab === "addNumber" ? "dark" : "light"}
              >
                Add
              </Button>
              <Button
                onClick={() => handleButtonClick("orders")}
                variant={activeTab === "orders" ? "dark" : "light"}
              >
                Orders
              </Button>
            </ButtonGroup>
          </Col>
          <Col md={10} xs={10} style={{ overflow: "auto", maxHeight: "65vh" }}>
            {activeTab === "users" && <UserList />}
            {activeTab === "fancyNumber" && <FancyNumber />}
            {activeTab === "addNumber" && <AddNumber />}
            {activeTab === "orders" && <Orders />}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminPanel;
