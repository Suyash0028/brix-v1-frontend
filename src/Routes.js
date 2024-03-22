import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Application from "./pages/Application";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path={"/"} exact component={() => <Redirect to={"/application"} />} />
        <Route path="/application" component={Application} />
      </Switch>
    </Router>
  );
};

export default Routes;
