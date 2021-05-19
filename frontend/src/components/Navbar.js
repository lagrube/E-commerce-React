import React, { useState } from "react";
import { useContext } from "react";
import { UidContext } from "./AppContext";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";
// Redux
import { useSelector } from "react-redux";

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  const [toggle, setToggle] = useState(false);

  // Show Sidebar
  const show = () => {
    setToggle(!toggle);
  };

  // Remove Sidebar
  // const remove = () => {
  //   setToggle(false);
  // };

  return (
    <>
      {uid ? (
        <>
          <div id="sidebar" className={`${toggle ? "active-nav" : ""}`}>
            <div className="toggle-btn" id="toggle-btn" onClick={show}>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <ul>
              <li>
                <NavLink exact to="/" activeClassName="active">
                  Accueil
                </NavLink>
              </li>
              <li>
                <NavLink to="/social" activeClassName="active">
                  Social
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop" activeClassName="active">
                  Shop
                </NavLink>
              </li>
            </ul>
          </div>
          <NavLink to="/profil">
            <li className="user">
              <p className="invisible">Bonjour {userData.pseudo}</p>
              <img src="./img/icons/user.svg" alt="" />
            </li>
          </NavLink>
          <Logout />
        </>
      ) : (
        <div className="home-login">
          <li>
            <NavLink exact to="/profil">
              <img src="./img/icons/login.svg" alt="login" />
            </NavLink>
          </li>
        </div>
      )}
    </>
  );
};

export default Navbar;
