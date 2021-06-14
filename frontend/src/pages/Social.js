import React, { useContext } from "react";
import Home from "./Home";
import { UidContext } from "../components/AppContext";
import Navbar from "../components/Navbar";
import LeftNavbar from "../components/LeftNavbar";
import Thread from "../components/Thread";

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
            <Thread />
          </main>
        </>
      ) : (
        <Home />
      )}
    </>
  );
};

export default Social;
