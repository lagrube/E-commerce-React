import React, { useContext } from "react";
import Home from "./Home";
import { UidContext } from "../components/AppContext";
import Navbar from "../components/Navbar";

const Shop = () => {
  const uid = useContext(UidContext);
  return (
    <>
      {uid ? (
        <>
          <div className="nav-container">
            <Navbar />
          </div>
          <div className="reseau">Shopping</div>
        </>
      ) : (
        <Home />
      )}
    </>
  );
};

export default Shop;
