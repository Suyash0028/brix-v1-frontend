// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import TweetList from './pages/tweets/TweetList';
import App from './App';
import LoginPage from './pages/admin/LoginPage';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path={"/"} exact component={() => 
            <Redirect to={"/admin"}/>
        }/>
        <Route path={"/admin"} exact component={() => 
            <Redirect to={"/admin/login"}/>
        }/>
        <Route path={"/admin/login"} component={LoginPage}/>
        <Route path="/tweets" component={TweetList} />
      </Switch>
    </Router>
  );
};

export default Routes;