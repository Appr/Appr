import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Dashboard from './Dashboard/Dashboard';
import AccountSettings from './AccountSettings/AccountSettings';

class InfoBody extends Component {
  render() {
      const { handleInitials } = this.props;
    return (
       <div>
         
            <Route component={ Dashboard }  path="/user/:userid/dashboard"/>
            <Route path="/user/:userid/account/settings/:userid" render={(props) => (
                  <AccountSettings handleInitials={handleInitials}  {...props} />
            )}/>
        
      </div>
    );
  }
}

export default InfoBody;
