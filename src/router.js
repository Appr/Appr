import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AccountSettings from './components/content/AccountSettings/AccountSettings';
// import GroupDashboard from 'UNDEFINED PATH';
// import GroupSettings from 'UNDEFINED PATH';
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

export default (
    <Switch>
        <Route component={ Home } exact path="/"/>
        <Route component={ Register } path="/register"/>
        <Route component={ Login } path="/login"/>

        {/* Future Sub Routes */}
            <Route component={ Dashboard } path="/dashboard/:userid"/>
            <Route component={ AccountSettings } path="/account-settings/:userid"/>
            {/* <Route component={ GroupDashboard } path="/group-dashboard/:groupid"/> */}
            {/* <Route component={ GroupSettings } path="/group-settings/:groupid"/> */}

        {/* Future Sub Routes In Wizard */}
            <Route component={ IdeasUsers } path="/project/:projectid/ideas"/>
            <Route component={ Features } path="/project/:projectid/features"/>
            <Route component={ View } path="/project/:projectid/views"/>
            <Route component={ Controllers } path="/project/:projectid/controllers"/>
            <Route component={ Schema } path="/project/:projectid/schema"/>
            <Route component={ Endpoints } path="/project/:projectid/endpoints"/>
            <Route component={ Tracker } path="/project/:projectid/tracker"/>
            <Route component={ Tracking } path="/project/:projectid/tracking"/>
    </Switch>
);
