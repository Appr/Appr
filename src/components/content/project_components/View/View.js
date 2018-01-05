import React, { Component } from 'react';
import Header from '../../../Header/Header';
import ProjectSidebar from '../ProjectSetupSidebar/ProjectSidebar';
import { createProjectView, findProjectViews, findProjectView, updateProjectView, deleteProjectView } from '../../../../services/project.view.services';
import ViewItem from './ViewItem/ViewItem';
import './view.scss';

class View extends Component {
    constructor(props) {
      super(props);
      this.state={
          views: []
      };

      this.handleAddViewButton = this.handleAddViewButton.bind(this);
      this.handleChangeView = this.handleChangeView.bind(this);
      this.handleDeleteViewButton = this.handleDeleteViewButton.bind(this);

    }


    componentWillMount() {
      const projectid = this.props.match.params.projectid || 1;
      const viewExamples = [
          { view_data: 'example: Use the force Luke.' },
          { view_data: 'example: I like this view' }
      ];

      findProjectViews(projectid)
        .then( res => {
            if(res.status !== 200) {
              console.log(res);
            }
            else {
                if(res.data.length > 0) {
                  this.setState({ views: res.data })
                }
                else {
                  this.setState({ views: viewExamples });
                }
            }
        })
        .catch(err => {throw err});
    }

    handleAddViewButton() {
        const projectid = this.props.match.params.projectid || 1;
        const reqBody = {
          name: '',
          imageUrl:  ''
        }


        createProjectView( projectid, reqBody )
            .then(res => {
                if(res.status !== 200) {
                  console.log(res);
                } else {
                   const newState = this.state.views;
                   newState.push(res.data[0]);
                   this.setState({ views: newState });
                }
            })
            .catch(err => {throw err});
    }

    handleChangeView(e, index, field) {
        const newState = this.state.views;
        newState[index][field] = e.target.value;
        this.setState({ views: newState });
    }

    submitChangeView(e, index) {
        const projectid = this.props.match.params.projectid;
        const viewid = Number(e.target.id);
        const {name, image_url} = this.state.views[index];
        const reqBody = {
          name,
          imageUrl:  image_url
        }

        updateProjectView(projectid, viewid, reqBody)
            .then(res => {
                if(res.status !== 200) {
                    console.log(res);
                }
            })
            .catch(err => {throw err});
    }

    handleDeleteViewButton(e, index) {
        const projectid = Number(this.props.match.params.projectid);
        const viewid = Number(e.target.id);
        const newState = this.state.views;
        newState.splice(index, 1);
        this.setState({ views: newState });

        deleteProjectView(projectid, viewid)
            .then(res => {
                if(res.status !== 200) {
                    console.log(res);
                }
            })
            .catch(err => {throw err});
    }

  render() {
    const { userid, projectid } = this.props.match.params;
    const views = this.state.views;
    const displayViews = views.map( view => {
        const index = views.indexOf(view);
        return <ViewItem key={`idea-${index}`} index={index} viewid={view.id} viewName={view.name} viewImgUrl={view.image_url} handleChangeView={this.handleChangeView} submitChangeView={this.submitChangeView} handleDeleteViewButton={this.handleDeleteViewButton} />
    });

    return (
        <div className="main-fix">
          <ProjectSidebar userid={userid} projectid={projectid}/>
          
          <div className="view-container">
            <div className="view-inner-con">
              <div className="project-section-header">
                  <label>View </label>
              </div>
           
              <div className="view-area drop-shadow">
                <div className="view-wrapper">

                  {displayViews}
              
                  <div className="view-footer">
                  <button className="add-button" onClick={this.handleAddViewButton}> <span/> Add View </button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default View;