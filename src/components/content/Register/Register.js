import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './register.scss';


class Register extends Component {
  render() {
    return (
    
      <div className="register-container">
      
          {/* <div className="reg-header"> </div> */}
          <div className="option-container">
              <div className="option-container-inner">
                  <div className="placeholder-div">  </div>
                  <div className="option-divider"> </div>
                  <div className="create-account-outter">
                      <div className="create-account-inner">
                        <div className="create-account-tag"> Create an Account</div>
                      
                            <div className="input-tag">
                                Name
                            </div>
                            <div className="form-combined">
                            <input 
                                className="input-combined"
                                type="text" 
                                placeholder="First"
                            />
                            <input 
                                className="input-combined"
                                type="text" 
                                placeholder="Last"
                            />
                            </div>
                            <div 
                                className="input-tag">
                                Email
                            </div>
                            <input 
                                className="input-solo" 
                                type="text" 
                                placeholder="e.g, landonwjohnson@gmail.com"
                            />
                            
                            <div 
                                className="input-tag">
                                Password
                            </div>
                            <input 
                                className="input-solo" 
                                type="password" 
                                placeholder="e.g, •••••••••••••"
                            />
                            <div className="reg-btn-footer">
                            <Link to="dashboard"><button className="create-account-btn not-enough-info-btn"> Create New Account </button> </Link>
                            </div>
                      </div>
                  </div>
              </div>

          </div>
        </div>
    );
  }
}

export default Register;