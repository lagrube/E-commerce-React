import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Log from "../components/Log/index";
import Navbar from "../components/Navbar";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
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
          <UpdateProfil />
        </>
      ) : (
        <div className="log-container">
          <Log />
          <div className="img-container display-none">
            <img src="./img/icons/tennis-slam.svg" alt="log" />
          </div>
        </div>
      )}
    </>
  );
};

export default Profil;
