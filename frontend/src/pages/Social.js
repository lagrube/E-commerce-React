import React, { useContext } from "react";
import Home from "./Home";
import { UidContext } from "../components/AppContext";
import Navbar from "../components/Navbar";

const Social = () => {
  const uid = useContext(UidContext);
  return (
    <div>
      {uid ? (
        <>
          <div className="nav-container">
            <Navbar />
          </div>
          <div className="reseau">Réseau Social</div>
        </>
      ) : (
        <Home />
      )}
    </div>
  );
};

export default Social;
