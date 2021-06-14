import React, { useContext } from "react";
import Home from "./Home";
import { UidContext } from "../components/AppContext";
import Navbar from "../components/Navbar";
import LeftNavbar from "../components/LeftNavbar";

const Social = () => {
  const uid = useContext(UidContext);
  return (
    <>
      {uid ? (
        <>
          <header>
            <div id="nav-container">
              <Navbar />
            </div>
          </header>
          <main>
            <LeftNavbar />
            <div className="reseau">Réseau Social</div>
          </main>
        </>
      ) : (
        <Home />
      )}
    </>
  );
};

export default Social;
