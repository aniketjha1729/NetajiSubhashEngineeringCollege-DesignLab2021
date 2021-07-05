import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Write from "../pages/write/Write";
import Single from "../pages/Post/Single";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/post/:id" component={Single} />
      <PrivateRoute exact path="/write" component={Write} />
    </Switch>
  );
};

export default Routes;
