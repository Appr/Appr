import React, { Component } from 'react';
import logo from './logo.svg';
import './css/styles.css';
import Header from './components/Header';
import Home from './components/content/Home';
import Register from './components/Register';
import AccountSettings from './components/content/AccountSettings';
import Body from './components/Body';
import classnames from 'classnames';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      showHeader: true
    }
    this.handleHeader = this.handleHeader.bind(this);
}

handleHeader(){
  if(this.state.showHeader){
      this.setState({showHeader: false})
  }
  else {
      this.setState({showHeader: true})
  }
}





  render() {


    return (
      <div className="App">
          <Header />
          <Body />
      </div>
    );
  }
}

export default App;
