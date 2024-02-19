import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import Error from "../components/Error";
import Loading from "../components/Loading";

const AdminFormance = () => {
  const FancyNumberState = useSelector((state) => state.getAllNumberReducer);
  const { loading, error, numbers } = FancyNumberState;
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

  // const today1 = new Date();
  // const todayEntries1 = numbers.filter((item) => {
  //   const createdAtDate = new Date(item.createdAt);
  //   return (
  //     createdAtDate.getDate() === today1.getDate() &&
  //     createdAtDate.getMonth() === today1.getMonth() &&
  //     createdAtDate.getFullYear() === today1.getFullYear()
  //   );
  // });

  // const countEntriesByCurrentUser = {};

  // todayEntries1.forEach((item) => {
  //   const userId = item.currentUserId._id;
  //   const userName = item.currentUserId.name;
  //   if (!countEntriesByCurrentUser[userId]) {
  //     countEntriesByCurrentUser[userId] = { userName: userName, count: 0 };
  //   }
  //   countEntriesByCurrentUser[userId].count++;
  // });

  // console.log(countEntriesByCurrentUser);

  return (
    <Container fluid>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <h4>Today Total :- {todayEntries?.length}</h4>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <h4>Last 7 Days Total :- {lastSevenDaysEntries?.length}</h4>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <h4>Last 30 Days Total :- {lastThirtyDaysEntries?.length}</h4>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <h4>Last 365 Days Total :- {lastYearEntries?.length}</h4>
          </Navbar.Brand>
        </Container>
      </Navbar>
      {/* <Table striped="columns">
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
            separatedByUserId.map((user, index) => (
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
      </Table> */}
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <h4>Start To End {numbers?.length}</h4>
          </Navbar.Brand>
        </Container>
      </Navbar>
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
            separatedByUserId.map((user, index) => (
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
