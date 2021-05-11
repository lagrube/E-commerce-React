import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Log from "../components/Log/index";

const Profil = () => {
  const uid = useContext(UidContext);

  return (
    <div className="profil-page">
      {uid ? (
        <h1>UPDATE PROFIL</h1>
      ) : (
        <div className="log-container">
          <Log />
          <div className="img-container">
            <img src="./img/tennis-slam.svg" alt="log" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
