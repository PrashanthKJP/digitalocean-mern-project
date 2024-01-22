import React, { useEffect, useState } from "react";
import { Button, Card, Container, ListGroup, Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, deleteUser } from "../action/userAction";
import { format } from "timeago.js";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

const UserList = () => {
  const userState = useSelector((state) => state.getAllUsersReducer);
  const { loading, error, users } = userState;
  const [letestUser, setLetestUser] = useState(users && users);
  const { currentUser } = useSelector((state) => state.loginUser);

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
    alert("you cannot delete your account");
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, letestUser, getAllUsers]);

  return (
    <Container fluid>
      <Table striped="columns">
        <Thead>
          <Tr>
            <Th>S.NO</Th>
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
                        {user._id === currentUser._id ? (
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
                <h6>password</h6>
                <h6>{clickUser?.password}</h6>
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
