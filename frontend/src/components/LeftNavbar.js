import React from "react";
import { NavLink } from "react-router-dom";

const LeftNavbar = () => {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <NavLink exact to="/profil" activeClassName="active-left-nav">
          <img src="./img/icons/user-left.svg" alt="profil-icon" />
        </NavLink>
        <br />
        <NavLink exact to="/social" activeClassName="active-left-nav">
          <img src="./img/icons/social.svg" alt="social-icon" />
        </NavLink>
        <br />
        <NavLink exact to="/shop" activeClassName="active-left-nav">
          <img src="./img/icons/shopping.svg" alt="shop-icon" />
        </NavLink>
        <br />
      </div>
    </div>
  );
};

export default LeftNavbar;
