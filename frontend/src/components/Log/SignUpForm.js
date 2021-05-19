import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControllPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const confirmPasswordError = document.querySelector(
      ".password-confirm.error"
    );

    confirmPasswordError.innerHTML = "";
    emailError.innerHTML = "";
    pseudoError.innerHTML = "";
    passwordError.innerHTML = "";

    if (password !== controlPassword)
      confirmPasswordError.innerHTML =
        "Les mots de passe ne sont pas identique !";
    else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/user/register`,
        data: { pseudo, email, password },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            console.log(res.data);
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <h4 className="success">
            Enregistrement réussi, veuillez vous connecter.
          </h4>
        </>
      ) : (
        <>
          <h2>Inscription</h2>
          <form action="" onSubmit={handleRegister} id="sign-up-form">
            <label htmlFor="pseudo">Pseudo</label>
            <br />
            <input
              type="text"
              name="pseudo"
              id="pseudo"
              onChange={(e) => setPseudo(e.target.value)}
              value={pseudo}
            />
            <div className="pseudo error"></div>
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <div className="email error"></div>
            <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="password error"></div>
            <br />
            <label htmlFor="password-confirm">Confirmer mot de passe</label>
            <br />
            <input
              type="password"
              name="password"
              id="password-confirm"
              onChange={(e) => setControllPassword(e.target.value)}
              value={controlPassword}
            />
            <div className="password-confirm error"></div>
            <br />
            <input type="submit" value="Créer un compte" />
          </form>
        </>
      )}
    </>
  );
};

export default SignUpForm;
