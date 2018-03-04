import React, { Component } from 'react';
import Header from './Header/Header';
import { Route, withRouter } from 'react-router-dom';
import InfoBody from './InfoBody/InfoBody';
import ProjectBody from './ProjectBody/ProjectBody';
import { findUserInfo } from '../../services/account.services';
// import { url } from 'inspector';

import { findDashboardInfo, findPersonalProjects } from '../../services/dashboard.services';
import { updateUser, updatePersonalProjects } from '../../actions/actionCreators';
import { connect } from 'react-redux';
import history from '../../history';

// import { url } from 'inspector';

class VUserBody extends Component {
  constructor(props){
    super(props);
    this.state ={
      userInfo: {},
    };

    //UI
      this.handleInitials = this.handleInitials.bind(this);
  };


  //UI
    handleInitials(){
      let userInitials;
      if(this.props.userInfo.first_name){
        if(this.props.userInfo.avatar !== ''){
          userInitials = '';
        }
        else{
          userInitials = this.props.userInfo.first_name.charAt(0).toUpperCase();
        }
        return userInitials
      }
    }

  render() {
    const userInfo = this.state.userInfo;
    const userid = this.state.userInfo.id;
    return (
      <div>
      <Header handleInitials={this.handleInitials}/>
      
        <Route path="/user/:userid/"  render={(props) => (
            <InfoBody handleInitials={this.handleInitials} {...props}/>)} />

        <Route path="/user/:userid/project/:projectid" render={(props) => (          
            <ProjectBody  {...props}/>)} />
      </div>
    );
  }
}

function mapStateToProps(state){
  return state;
}

export default connect( mapStateToProps, { updateUser, updatePersonalProjects } ) (VUserBody);





