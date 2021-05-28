import React, { useContext } from "react";
import Home from "./Home";
import { UidContext } from "../components/AppContext";
import Navbar from "../components/Navbar";
import LeftNavbar from "../components/LeftNavbar";

const Social = () => {
  const uid = useContext(UidContext);
  return (
    <div>
      {uid ? (
        <>
          <div id="nav-container">
            <Navbar />
          </div>
          <LeftNavbar />
          <div className="reseau">Réseau Social</div>
        </>
      ) : (
        <Home />
      )}
    </div>
  );
};

export default Social;
