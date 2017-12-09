import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AccountSettings from './components/content/AccountSettings/AccountSettings';
import Home from './components/content/Home/Home';
import Register from './components/content/Register/Register';
import Dashboard from './components/content/Dashboard/Dashboard';
import Login from './components/content/Login/Login';
import IdeasUsers from './components/content/project_components/Ideas_Users/Ideas_Users';
import Features from './components/content/project_components/Features/Features';
import Controllers from './components/content/project_components/Controllers/Controllers';
import View from './components/content/project_components/View/View';
import Schema from './components/content/project_components/Schema/Schema'
import Endpoints from './components/content/project_components/Endpoints/Endpoints';
import Tracker from './components/content/project_components/Tracker/Tracker';
import Tracking from './components/content/project_components/Tracking/Tracking';



export default  (
        <Switch>
            <Route component={ Home } path="/" exact/>
            <Route component={ Register } path="/register" exact/>
            <Route component={ Login } path="/login" exact/>

            {/* Future Sub Routes */}
                <Route component={ Dashboard } path="/dashboard" exact/>
                <Route component={ AccountSettings } path="/account-settings" exact/>

            {/* Future Sub Routes In Wizard */}
                <Route component={ IdeasUsers } path="/ideas" exact/>
                <Route component={ Features } path="/features" exact/>
                <Route component={ View } path="/views" exact/>
                <Route component={ Controllers } path="/controllers" exact/>
                <Route component={ Schema } path="/schema" exact/>
                <Route component={ Endpoints } path="/endpoints" exact/>
                <Route component={ Tracker } path="/tracker" exact/>
                <Route component={ Tracking } path="/tracking" exact/>
        </Switch> 
    )