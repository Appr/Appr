import React, { Component } from 'react';
import router from '../router';

export default class Body extends Component {
  render() {
    return (
      <div>
        { router }
      </div>
    );
  }
}

