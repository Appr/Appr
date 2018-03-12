

import React, { Component } from 'react';
import ProjectMobileBar from '../components/VUserBody/ProjectBody/ProjectSidebar/ProjectMobileBar/ProjectMobileBar';

class MobileProjectNavTest extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            errorText: ''
        }
    }


    render() {

      return (
        <div style={{width: '640px',height: '100%', border: '1px solid'}}>
            <ProjectMobileBar />
        </div>
      );
    }
  }


  export default (MobileProjectNavTest);





