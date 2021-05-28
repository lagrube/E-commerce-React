import React, { useContext } from "react";
import Home from "./Home";
import { UidContext } from "../components/AppContext";
import Navbar from "../components/Navbar";
import LeftNavbar from "../components/LeftNavbar";

const Shop = () => {
  const uid = useContext(UidContext);
  return (
    <>
      {uid ? (
        <>
          <div id="nav-container">
            <Navbar />
          </div>
          <LeftNavbar />
          <div className="reseau">Shopping</div>
        </>
      ) : (
        <Home />
      )}
    </>
  );
};

export default Shop;
