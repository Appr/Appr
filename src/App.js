import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.scss';
import Body from './components/Body/Body'

class App extends Component {
  render() {
    return (
      <div className="App">
          <Body />
      </div>
    );
  }
}

export default App;
