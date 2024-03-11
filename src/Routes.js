// src/Routes.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import TweetList from "./pages/tweets/TweetList";
import LoginPage from "./pages/admin/LoginPage";
import AddTweets from "./pages/tweets/AddTweets";
import ProtectedRoutes from "./privateRoutes";
import UserDetails from "./pages/admin/UserDetails";
import UserList from "./pages/admin/UserList";
import BackButton from "./components/BackButton";

const Routes = () => {
  return (
    <Router>
      <BackButton />
      <Switch>
        <Route path={"/"} exact component={() => <Redirect to={"/admin"} />} />
        <Route
          path={"/admin"}
          exact
          component={() => <Redirect to={"/admin/login"} />}
        />
        <Route path={"/admin/login"} component={LoginPage} />
        <Route path="/tweets" component={TweetList} />
        <ProtectedRoutes path="/admin/add-tweets">
          <AddTweets />
        </ProtectedRoutes>
        <ProtectedRoutes path="/admin/user-list">
          <UserList />
        </ProtectedRoutes>
        <ProtectedRoutes path="/admin/user-details">
          <UserDetails />
        </ProtectedRoutes>
      </Switch>
    </Router>
  );
};

export default Routes;
