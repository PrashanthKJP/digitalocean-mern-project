import TopNavbar from "./components/TopNavbar";
import { Route, Routes } from "react-router-dom";
import Navbar2 from "./components/Navbar2";
import Home from "./pages/Home";
import PhoneNumberDetails from "./pages/PhoneNumberDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Enquiry from "./pages/Enquiry";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminPage from "./pages/AdminPage";
import { Helmet } from "react-helmet";

import AdvanceSerchFancyNumber from "./pages/AdvanceSerchFancyNumber";
import { useEffect, useState } from "react";
import Services from "./pages/Services";

function App() {
  const [selectedSearchData, setSelectedSearchData] = useState("");
  const [selectedSearchOptions, setSearchOptions] = useState("");

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const getNavbarSearchData = (searchData, selectedOptions) => {
    setSelectedSearchData(searchData);
    setSearchOptions(selectedOptions);
  };

  useEffect(() => {}, [user]);

  return (
    <div>
      <TopNavbar />
      <Navbar2 getNavbarSearchData={getNavbarSearchData} />
      <Helmet>
        <title>well-come to life time fancy number</title>
        <meta
          name="description"
          content="🌟 Introducing VIP FancyNumber - Elevate Your Connection! 📱💎
Unlock a new level of prestige and individuality with our exclusive collection of VIP FancyNumbers! Your phone number is more than just digits; it's your personal signature in the digital world. Make a statement, stand out from the crowd, and redefine your communication experience."
        />
        <meta
          name="keywords"
          content="VIP Phone numbers, Fancy mobile numbers
, Premium phone digits, Exclusive phone numbers,Signature phone numbers,Luxury mobile numbers,Stylish mobile digits,Stylish mobile number,Special phone number,High range phone numbers,Standout phone number,Standerd phone digits"
        />
      </Helmet>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              selectedSearchData={selectedSearchData}
              selectedSearchOptions={selectedSearchOptions}
            />
          }
          exact
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/enquiry" element={<Enquiry />} />
        <Route path="/details/:id" element={<PhoneNumberDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        {user && user.isAdmin && (
          <Route path="/admin" element={<AdminPage />} />
        )}

        <Route path="/advanceSearch" element={<AdvanceSerchFancyNumber />} />
        <Route path="/about" element={<Services />} />
      </Routes>
    </div>
  );
}

export default App;
