import React, { Component } from 'react';
import AccountSettings from './content/AccountSettings';
import Home from './content/Home';
import Register from './Register';
import {Route, Switch, HashRouter, BrowserRouter, Link} from 'react-router-dom';

class Body extends Component {
  render() {
    return (
      <div>

        <Switch>
          <Route component={ Home } path="/" exact/>
          <Route component={ AccountSettings } path="/account-settings" exact/>
          <Route component={ Register } path="/register" exact/>
        </Switch>
      </div>
    );
  }
}

export default Body;
