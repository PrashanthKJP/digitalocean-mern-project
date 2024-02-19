import React, { useState } from "react";
import {
  Button,
  Card,
  Container,
  ListGroup,
  Modal,
  Navbar,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../action/userAction";
import { format } from "timeago.js";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import ExcelJS from "exceljs";

const UserList = () => {
  const userState = useSelector((state) => state.getAllUsersReducer);
  const { loading, error, users } = userState;
  const [letestUser, setLetestUser] = useState(users && users);

  const [clickUser, setClickUser] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const getUserDetails = (user) => {
    setClickUser(user);
    handleShow();
  };

  const handleDeleteUser = (id, user) => {
    dispatch(deleteUser(id));
    const reloadedUser = letestUser.filter(
      (currnetItem) => currnetItem !== user
    );
    setLetestUser(reloadedUser);
  };

  const handleCurrnetUserClick = () => {
    alert("you cannot delete Admin account");
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
        header: "Id",
        key: "id",
        width: 20,
      },
      {
        header: "Name",
        key: "name",
        width: 20,
      },
      {
        header: "Number",
        key: "number",
        width: 20,
      },
      {
        header: "IsAdmin",
        key: "isAdmin",
        width: 10,
      },
      {
        header: "CreatedAt",
        key: "createdAt",
        width: 15,
      },
    ];

    letestUser?.map(async (product, index) => {
      sheet.addRow({
        id: index + 1,
        name: product?.name,
        number: product?.number,
        isAdmin: product?.isAdmin,
        createdAt: product?.createdAt,
      });
    });

    workbook.xlsx.writeBuffer().then(function (data) {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob, "Users.xlsx");
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "Users.xlsx";
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <Container fluid>
      <Navbar>
        <Navbar.Brand>Total {letestUser.length} No Of User's</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button onClick={exportExcelFile}>download excel</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <Table striped="columns">
        <Thead>
          <Tr>
            <Th>S.NO </Th>
            <Th>Name</Th>
            <Th>Date</Th>
            <Th>Action's</Th>
          </Tr>
        </Thead>

        {error && <Error error="Error While Fetching Users" />}
        {(loading && <Loading loading={loading} />) ||
          (letestUser &&
            letestUser.map((user, index) => (
              <>
                <Tbody style={{ borderBottom: "0.1px solid gray" }} key={index}>
                  <Tr>
                    <Td>{index + 1}</Td>
                    <Td>{user.name}</Td>
                    <Td>{format(user.createdAt)}</Td>
                    <Td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        {user.isAdmin ? (
                          <span>
                            <FaTrash
                              className="text-dark"
                              style={{ cursor: "pointer" }}
                              onClick={handleCurrnetUserClick}
                            />
                          </span>
                        ) : (
                          <span>
                            <FaTrash
                              className="text-danger"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handleDeleteUser(user._id, user);
                              }}
                            />
                          </span>
                        )}
                        <span>
                          <FcViewDetails
                            className="text-danger"
                            style={{ cursor: "pointer" }}
                            onClick={() => getUserDetails(user)}
                          />
                        </span>
                      </div>
                    </Td>
                  </Tr>
                </Tbody>
              </>
            )))}
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{clickUser?.isAdmin ? "Admin" : "User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card style={{ width: "auto" }}>
            <ListGroup variant="flush">
              <ListGroup.Item
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <h6>name</h6>
                <h6>{clickUser?.name}</h6>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <h6>number</h6>
                <h6>{clickUser?.number}</h6>
              </ListGroup.Item>

              <ListGroup.Item
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <h6>Role</h6>
                <h6>{clickUser?.isAdmin ? "Admin" : "User"}</h6>
              </ListGroup.Item>
              <ListGroup.Item
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <h6>createdAt</h6>
                <h6>{format(clickUser?.createdAt)}</h6>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserList;
