

import React, { Component } from 'react';
import PasswordIcon from '../../../img/icons/Key-Icon.svg';
import UsernameIcon from '../../../img/icons/Username-Icon.svg';
import { Link } from 'react-router-dom';
import './login.scss';

class Login extends Component {
  render() {
    return (
      <div className="login-parent">
          <div className="login-container">
                <div className="login-top">
                    <div className="logo-container">
                    <div className="logo-login">Appr</div>
                    </div>
                </div>
                <div className="login-middle">
                    <div className="usr-pswd-container">
                    <div className="usr-pswd-row">
                        <div className="lgn-icon-con">
                        <div className="lgn-icon"> 
                            <img src={UsernameIcon} alt="username icon"/> 
                        </div>
                        </div>
                        <input className="usr-pswd-input" placeholder="Username" type="text" />
                    </div>
                    <div className="usr-pswd-row">
                        <div className="lgn-icon-con">
                        <div className="lgn-icon">
                            <img src={PasswordIcon} alt="password icon"/> 
                        </div>
                        </div>
                        <input className="usr-pswd-input" placeholder="Password" type="password" />
                    </div>
                    
                    
                    <div className="login-btn-con">
                        <Link to="/dashboard"> <button className="login-btn"> LOGIN</button></Link>
                    </div>
                    </div>
                </div>
                <div className="login-bottom"></div>
                </div>
      </div>
    );
  }
}

export default Login;
