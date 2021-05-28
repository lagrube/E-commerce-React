import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import SignUp from "../../pages/SignUp";
import Shop from "../../pages/Shop";
import Social from "../../pages/Social";

const index = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profil" component={Profil} />
          <Route path="/signup" component={SignUp} />
          <Route path="/shop" component={Shop} />
          <Route path="/social" component={Social} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
};

export default index;
