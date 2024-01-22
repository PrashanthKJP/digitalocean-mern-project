import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getAllOrders } from "../action/orderAction";
import { FaTrash } from "react-icons/fa";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import Loading from "../components/Loading";
import Error from "../components/Error";

const Orders = () => {
  const { orders, loading, error } = useSelector(
    (state) => state.getAllOrderReducer
  );
  const [newOrder, setNewrOrder] = useState(orders);

  const dispatch = useDispatch();

  const handleDeleteOrder = (id, currentOrder) => {
    dispatch(deleteOrder(id));
    const reStartOrder = newOrder.filter(
      (currnetItem) => currnetItem !== currentOrder
    );
    setNewrOrder(reStartOrder);
  };

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <Container fluid>
      <Table striped="columns">
        <Thead>
          <Tr>
            <Th>S.NO</Th>
            <Th>Name</Th>
            <Th>User Number</Th>
            <Th>Selected Number</Th>
            <Th>Action's</Th>
          </Tr>
        </Thead>
        {error && <Error error="Error While Fetching Users" />}
        {(loading && <Loading loading={loading} />) ||
          (newOrder &&
            newOrder.map((item, index) => (
              <>
                <Tbody key={index} style={{ borderBottom: "0.1px solid gray" }}>
                  <Tr>
                    <Td>{index + 1}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.phoneNumber}</Td>

                    <Td>
                      {item?.numbers &&
                        item.numbers.map((i, index) => (
                          <>
                            <div key={index}>{i}</div>
                          </>
                        ))}
                    </Td>

                    <Td>
                      <FaTrash
                        className="text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleDeleteOrder(item._id, item);
                        }}
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </>
            )))}
      </Table>
    </Container>
  );
};

export default Orders;
