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
import Trending from "../../pages/Trending";

const index = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profil" component={Profil} />
          <Route path="/signup" component={SignUp} />
          <Route path="/trending" component={Trending} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
};

export default index;
