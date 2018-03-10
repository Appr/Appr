import React, { Component } from 'react';
import { createProjectView, findProjectViews, updateProjectView, deleteProjectView } from '../../../../services/project.view.services';
import ViewItem from './ViewItem/ViewItem';
import './view.scss';
import { connect } from 'react-redux';

class View extends Component {
    constructor(props) {
      super(props);
      this.state={
          views: []
      };
      this.handleAddViewButton = this.handleAddViewButton.bind(this);
      this.handleChangeView = this.handleChangeView.bind(this);
      this.handleDeleteViewButton = this.handleDeleteViewButton.bind(this);
      this.pullFromBackend = this.pullFromBackend.bind(this);
      this.handleSaveChange = this.handleSaveChange.bind(this);
    }

    pullFromBackend(projectid){
        findProjectViews(projectid)
        .then( res => {
            if(res.status !== 200) {
              console.log(res);
            }
            else if(res.data.length > 0) {
                  this.setState({ views: res.data })
            }
        })
        .catch(err => {throw err});
    }

    scrollToBottom = () => {
        this.listEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
      const projectid = this.props.projectInfo.id;
      this.pullFromBackend(projectid);
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
                   this.pullFromBackend(projectid)
                   this.scrollToBottom();
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
        const projectid = this.props.projectInfo.id;
        const viewid = Number(e.target.id);

        deleteProjectView(projectid, viewid)
            .then(res => {
                if(res.status !== 200) {
                    console.log(res);
                }
                this.pullFromBackend(projectid);
            })
            .catch(err => {throw err});
    }

    handleSaveChange(e, index) {
        const projectid = this.props.projectInfo.id;
        const viewid = this.state.views[index].id;
        const reqBody = {
            name: this.state.views[index].name,
            imageUrl: this.state.views[index].image_url
        };
        updateProjectView(projectid, viewid, reqBody)
        .then( res => {
            if(res.status !== 200) {
                alert(res);
            }
        })
        .catch(err => {throw err});
    }


  render() {
    const userid = this.props.userInfo.id;
    const projectid = this.props.projectInfo.id;
    const views = this.state.views;
    const displayViews = views.map( view => {
        const index = views.indexOf(view);
        const id = view.id;
        return (<ViewItem
                    key={`idea-${index}`}
                    index={index}
                    projectid={projectid}
                    id={id}
                    viewName={view.name}
                    viewImageUrl={view.image_url}
                    handleChangeView={this.handleChangeView}
                    handleDeleteViewButton={this.handleDeleteViewButton}
                    handleSaveChange={this.handleSaveChange} />
        );
    });

    return (
          <div className="view-container">
            <div className="view-inner-con">
              <div className="project-section-header">
                  <label>View </label>
              </div>

              <div className="view-area drop-shadow">
                <div className="view-wrapper">

                  {displayViews}

                  <div className="view-footer" ref={(el) => { this.listEnd = el; }}>
                  <button className="add-button" onClick={this.handleAddViewButton}> <span/> Add View </button>
                  </div>
                </div>
              </div>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps)(View);