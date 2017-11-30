import React, { Component } from 'react';
import './landing-slider.scss';
import { Link } from 'react-router-dom'



class LandingSlider extends Component {
    render() {
      return (
      
        <div className="slider-container">
            <div className="slider-header"> </div>
            <div className="outter-text-container">
              <div className="inner-text-container">
                  <div className="text-container">
                      <h1 className="headline-large">
                          Plan Your App
                      </h1>
                      <h2 className="headline-desc">
                          Appr lets you work more collaboratively and get more done.
                      </h2>
  
                      <Link to="/register"> <button className="register-btn">Sign Up - It's free</button></Link>
                          
                  </div>
              </div>
            </div>
  
            
            <div className="slider-footer">
                    <div className="mobile-footer-btn-set">
                        <Link to="/register" className="mobile-register-btn"> <button > Sign Up </button> </Link>
                        <Link to="/login" className="mobile-login-btn"> <button > Login </button> </Link>
                    </div>
                    <ul className="footer-nav">
                        <li className="v2">OUR TEAM</li>
                        <li className="v2">FEEDBACK</li>
                    </ul>
               
            </div>
            <div className="curtain">
              </div>
            <div className="blackscreen" />
            
        </div>
        
      );
    }
  }
  
  export default LandingSlider;
  