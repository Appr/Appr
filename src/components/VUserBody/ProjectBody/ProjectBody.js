import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import ProjectSidebar from './ProjectSidebar/ProjectSidebar';
import IdeasUsers from './Ideas_Users/Ideas_Users';
import Features from './Features/Features';
import View from './View/View';
import Controllers from './Controllers/Controllers';
import Schema from './Schema/Schema';
import Endpoints from './Endpoints/Endpoints';
import Tracking from './Tracking/Tracking';
import { BlurOverlay, ProjectBodyContainer, Frame } from './projectbodyStyles';
import { findProject, updateProject } from '../../../services/project.services';
import { connect } from 'react-redux';
import { updateProjectRedux, updatePersonalProjects } from '../../../actions/actionCreators';
import { findPersonalProjects } from '../../../services/dashboard.services';

class ProjectBody extends Component {
  constructor(props){
    super(props)
    this.state={
      project: {},
      UI: {
        colorTheme: '',
        backgroundPreview: ''
      }
    }
    this.handleProjectBackgroundPreview = this.handleProjectBackgroundPreview.bind(this);
    this.changeProjectBackground = this.changeProjectBackground.bind(this);
    this.clearProjectBackgroundPreview = this.clearProjectBackgroundPreview.bind(this);
  }


  handleProjectBackgroundPreview(image, color){
    let newBackground = image;
    let newColor = color;
    this.setState({
      UI: {
        colorTheme: newColor,
        backgroundPreview: newBackground
      }
    })
  }

  clearProjectBackgroundPreview(){
    this.setState({
      UI: {
        colorTheme: '',
        backgroundPreview: ''
      }
    })
  }

  changeProjectBackground(){
    let userid = this.props.userInfo.id;
    console.log(userid)
    
    const projectid = this.props.match.params.projectid;
    let newBackground = this.state.UI.backgroundPreview;
    const { author_id, background, id, name, status_id } = this.props.projectInfo;
    const reqBody = {author_id: author_id, background: newBackground, id: id, name: name, status_id: status_id };
    updateProject(projectid, reqBody)
      .then( res => {
        findProject(projectid)
        .then( res => {
                this.props.updateProjectRedux(res.data[0]);
                this.setState({
                  UI: {
                    backgroundPreview: ''
                  }
                })                
        })
        findPersonalProjects(userid)
        .then(res => {
          this.props.updatePersonalProjects(res.data)
        })
      })
      .catch(err => {throw err});
  }



  render() {
    const userid = this.props.userInfo.id;
    const projectid = this.props.projectInfo.id;
    const projectBackground = this.props.projectInfo.background;
    const { colorTheme, backgroundPreview } = this.state.UI;

    return (
      <ProjectBodyContainer>
              <ProjectSidebar
                selectedBackground={this.state.UI.backgroundPreview || this.state.project.background}
                handleProjectBackground={this.handleProjectBackgroundPreview}
                projectid={projectid}
                userid={userid}
                colorTheme={colorTheme}
                changeProjectBackground={this.changeProjectBackground}
                clearProjectBackgroundPreview={this.clearProjectBackgroundPreview}
              />
              <Frame> <BlurOverlay backgroundImage={backgroundPreview || projectBackground || null} colorTheme={colorTheme} /> </Frame>
              <Route path="/user/:userid/project/:projectid/ideas" render={(props) => (
                <IdeasUsers projectid={projectid} {...props}/> )} />
              <Route component={ Features }path="/user/:userid/project/:projectid/features"/>
              <Route component={ View } path="/user/:userid/project/:projectid/views" />
              <Route component={ Controllers } path="/user/:userid/project/:projectid/controllers" />
              <Route component={ Schema } path="/user/:userid/project/:projectid/schema" />
              <Route component={ Endpoints } path="/user/:userid/project/:projectid/endpoints" />
              <Route path="/user/:userid/project/:projectid/tracker" render={(props) => (
                <Tracking projectid={projectid} {...props}/> )} />
      </ProjectBodyContainer>
    );
  }
}

function mapStateToProps(state){
  return state;
}

export default withRouter(connect( mapStateToProps, { updateProjectRedux, updatePersonalProjects } ) (ProjectBody));

