import React, { useEffect } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { getAllUsers } from "../action/userAction";

const AdminFormance = () => {
  const FancyNumberState = useSelector((state) => state.getAllNumberReducer);
  const { loading, error, numbers } = FancyNumberState;
  const dispatch = useDispatch();
  const separatedByUserId = Object.values(
    numbers.reduce((acc, item) => {
      const userId = item.currentUserId._id;
      if (!acc[userId]) {
        acc[userId] = {
          userDetails: item.currentUserId,
          items: [],
        };
      }
      acc[userId].items.push(item);
      return acc;
    }, {})
  );

  const today = new Date();
  const todayEntries = numbers.filter((item) => {
    const createdAtDate = new Date(item.createdAt);
    return (
      createdAtDate.getDate() === today.getDate() &&
      createdAtDate.getMonth() === today.getMonth() &&
      createdAtDate.getFullYear() === today.getFullYear()
    );
  });

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const lastSevenDaysEntries = numbers.filter((item) => {
    const createdAtDate = new Date(item.createdAt);
    return createdAtDate >= sevenDaysAgo;
  });

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const lastThirtyDaysEntries = numbers.filter((item) => {
    const createdAtDate = new Date(item.createdAt);
    return createdAtDate >= thirtyDaysAgo;
  });

  const yearAgo = new Date();
  yearAgo.setDate(yearAgo.getDate() - 365);

  const lastYearEntries = numbers.filter((item) => {
    const createdAtDate = new Date(item.createdAt);
    return createdAtDate >= yearAgo;
  });

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <Container fluid>
      <h6 className="text-start bg-dark text-light p-2">
        Today Total :- {todayEntries?.length}
      </h6>
      <h6 className="text-start bg-dark text-light p-2">
        Last 7 Days Total :- {lastSevenDaysEntries?.length}
      </h6>
      <h6 className="text-start bg-dark text-light p-2">
        Last 30 Days Total :- {lastThirtyDaysEntries?.length}
      </h6>
      <h6 className="text-start bg-dark text-light p-2">
        Last 365 Days Total :- {lastYearEntries?.length}
      </h6>
      <h6 className="text-start bg-dark text-light p-2">
        Start To End:- {numbers?.length}
      </h6>

      <Table striped="columns">
        <Thead>
          <Tr>
            <Th>S.NO </Th>
            <Th>Name</Th>
            <Th>Phone</Th>
            <Th>NO Count :</Th>
          </Tr>
        </Thead>

        {error && <Error error="Error While Fetching Data" />}
        {(loading && <Loading loading={loading} />) ||
          (separatedByUserId &&
            separatedByUserId?.map((user, index) => (
              <>
                <Tbody style={{ borderBottom: "0.1px solid gray" }} key={index}>
                  <Tr>
                    <Td>{index + 1}</Td>
                    <Td>{user?.userDetails?.name}</Td>
                    <Td>{user?.userDetails?.number}</Td>
                    <Td>{user?.items?.length}</Td>
                  </Tr>
                </Tbody>
              </>
            )))}
      </Table>
    </Container>
  );
};

export default AdminFormance;
