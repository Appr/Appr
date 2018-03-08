import React, { Component } from 'react';
import { createProjectView, findProjectViews, updateProjectView, deleteProjectView } from '../../../../services/project.view.services';
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

  render() {
    const userid = this.props.userInfo.id;
    const projectid = this.props.projectInfo.id;
    const views = this.state.views;
    const displayViews = views.map( view => {
        const index = views.indexOf(view);
        return (
            <div className="view-item" key={`idea-${index}`}>
                <section>
                    <label>{(index + 1) + '.'}</label>
                    <input className="view-input-name" type="text" placeholder="Name" id={view.id} value={view.name} onChange={e => this.handleChangeView(e, index, "name")} />
                    <input className="view-input-imgurl" type="text" placeholder="Wireframe URL" id={view.id} value={view.image_url} onChange={e => this.handleChangeView(e, index, "image_url")} />
                </section>
                    {/* <button className="input-complete-btn"  id={view.id} onClick={e => this.submitChangeView(e, index)}>Save</button> */}
                    <button className="delete-x" id={view.id} onClick={e => this.handleDeleteViewButton(e, index)}>&times;</button>
            </div>
        )
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