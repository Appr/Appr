import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class LandingSlider extends Component {
  render() {
    return (
    
      <div className="slider-container">
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
              
                  <ul className="footer-nav">
                      <li>OUR TEAM</li>
                      <li>FEEDBACK</li>
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
