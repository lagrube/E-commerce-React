import React from "react";
import SignUpForm from "../components/Log/SignUpForm";

const SignUp = () => {
  return (
    <div className="log-container">
      <div className="register-form">
        <div className="logo-log display-none">
          <img src="./img/icons/logo-log.svg" alt="log" />
        </div>
        <SignUpForm />
      </div>
      <div className="img-container display-none">
        <img src="./img/icons/hey.svg" alt="register-log" />
      </div>
    </div>
  );
};

export default SignUp;
