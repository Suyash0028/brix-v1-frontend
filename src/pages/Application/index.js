import React from "react";
import {
  Route,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";
import TweetList from "../tweets/TweetList";
import UserNavbarComponent from "../../components/NavbarComponent";
import LoginPage from "../admin/LoginPage";
import ProtectedRoutes from "../../privateRoutes";
import AddTweets from "../tweets/AddTweets";
import UserList from "../admin/UserList";
import UserDetails from "../admin/UserDetails";

export default function Application() {
  let location = useLocation();
  return (
    <div>
      <UserNavbarComponent />
      <Switch location={location}>
        <Route
          path={"/application"}
          exact
          component={() => <Redirect to={"/application/tweets"} />}
        />
        <Route path="/application/tweets" component={TweetList} />
        <Route
          path={"/application/admin"}
          exact
          component={() => <Redirect to={"/application/admin/login"} />}
        />
        <Route path="/application/admin/login" component={LoginPage} />
        <ProtectedRoutes path="/application/admin/add-tweets">
          <AddTweets />
        </ProtectedRoutes>
        <ProtectedRoutes path="/application/admin/user-list">
          <UserList />
        </ProtectedRoutes>
        <ProtectedRoutes path="/application/admin/user-details">
          <UserDetails />
        </ProtectedRoutes>
      </Switch>
    </div>
  );
}
