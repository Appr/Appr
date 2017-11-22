import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import AccountSettings from './components/content/AccountSettings';
import Home from './components/content/Home';
import Register from './components/content/Register';
import Dashboard from './components/content/Dashboard';
import Login from './components/content/Login';


export default  (
        <Switch>
            <Route component={ Home } path="/" exact/>
            <Route component={ Register } path="/register" exact/>
            <Route component={ Dashboard } path="/dashboard" exact/>
            <Route component={ AccountSettings } path="/account-settings" exact/>
            <Route component={ Login } path="/login" exact/>
        </Switch> 
    )
