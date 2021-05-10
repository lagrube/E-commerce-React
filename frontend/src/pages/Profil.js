import React from "react";
import Log from "../components/Log/index";

const Profil = () => {
  return (
    <div>
      <div className="profil-page">
        <div className="log-container">
          <Log />
          <div className="img-container">
            <img src="./img/tennis-slam.svg" alt="log" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
