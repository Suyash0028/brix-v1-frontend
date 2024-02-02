// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import TweetList from './pages/tweets/TweetList';
import LoginPage from './pages/admin/LoginPage';
import AddTweets from './pages/tweets/AddTweets';

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
        <Route path="/addtweets" component={AddTweets} />
      </Switch>
    </Router>
  );
};

export default Routes;