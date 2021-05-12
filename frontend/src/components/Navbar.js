import React from "react";
import { useContext } from "react";
import { UidContext } from "./AppContext";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";
// Redux
import { useSelector } from "react-redux";

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact to="/">
            <div className="logo">
              <img src="./img/elite-tennis.jpeg" alt="icon-tennis" />
              <h3>
                Elite<span className="orange">Tennis</span>
              </h3>
            </div>
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li className="welcome">
              <NavLink to="/profil">
                <h4>Bienvenue {userData.pseudo}</h4>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink exact to="/profil">
                <img src="./img/icons/login.svg" alt="login" />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
