import React, { Component } from 'react';
import Login from '../Login/Login';
import LandingSlider from '../Landing-Slider/Landing-Slider';
import Header from '../../Header/Header';
import './home.scss';


class Home extends Component {
  render() {
    return (
      <div className="home-container">
          <Login history={this.props.history}/>
          <LandingSlider />
      </div>
    );
  }
}

export default Home;
