import React from "react";
import SignInForm from "./SignInForm";

const Log = () => {
  const handleSignup = () => {
    window.location = "/signup";
  };

  return (
    <div className="connection-form">
      <div className="logo-log">
        <img src="./img/icons/logo-log.svg" alt="log" />
      </div>
      <SignInForm />
      <div className="form-signup">
        <div className="account">Pas encore inscrit ?</div>
        <button className="signup" onClick={handleSignup}>
          Inscrivez-vous
        </button>
      </div>
    </div>
  );
};

export default Log;
