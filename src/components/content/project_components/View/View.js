import React, { Component } from 'react';
import Header from '../../../Header/Header';
import ProjectSetupSidebar from '../ProjectSetupSidebar/ProjectSetupSidebar';
import { getUId } from '../../../../utils/uid.utils';
import { createProjectView, findProjectViews, findProjectView, updateProjectView, deleteProjectView } from '../../../../services/project.view.services';
import './view.scss';

class View extends Component {
<<<<<<< HEAD
  constructor(props){
  super(props);
  this.state={
      view: {
          arr:[{
              key: 1,
              label: 1,
              name: 'Name',
              imageurl: 'ImageURL',
          }]
      }
    }
    this.addViewItemHandler = this.addViewItemHandler.bind(this);
    this.removeViewItemHandler = this.removeViewItemHandler.bind(this);
  }

  addViewItemHandler(){
    let ViewList = this.state.view.arr;
    ViewList.push({
      key: 2,
      label: 2,
      name: 'Name',
      imageurl: 'ImageURL',
    })
    this.setState({arr: ViewList})
  }

  removeViewItemHandler(){
    let ViewList = this.state.view.arr;
    ViewList.splice(1, 1);
    this.setState({arr: ViewList})
  }


  
  render() {
    const displayViews = this.state.view.arr.map( view => {
      return(
        <div className="view-item">
        <section>
          <label>{view.label + '.'}</label>
          <input className="view-input-name" placeholder="Name" type="text" />
          <input className="view-input-imgurl" placeholder="Image URL" type="text" />
        </section>
          <button className="not-enough-info-btn">Save</button>
          <span className="delete-x" onClick={this.removeViewItemHandler}>&times;</span> 
      </div>
      )
    })
=======
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
        const body = {viewData: ''};
        const newState = this.state.views;
        newState.push(body);
        this.setState({ views: newState });


        createProjectView( projectid, body )
            .then(res => {
                if(res.status !== 200) {
                  console.log(res);
                }
            })
            .catch(err => {throw err});
    }

    handleChangeView(e, index) {
        const newState = this.state.views;
        newState[index].view_data = e.target.value;
        this.setState({ views: newState });
    }

    submitChangeView(e, index) {
        const projectid = this.props.match.params.projectid;
        const viewid = Number(e.target.id);
        const body = this.state.views[index].view_data;

        updateProjectView(projectid, viewid, body)
            .then(res => {
                if(res.status !== 200) {
                    console.log(res);
                }
            })
            .catch(err => {throw err});
    }

    handleDeleteViewButton(e, index) {
        const projectid = this.props.match.params.projectid;
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
    const views = this.state.views;
    const displayViews = views.map( view => {
        const index = views.indexOf(view);
        return (
          <div className="view-item" key={`idea-${index}`}>
          <section>
            <label>{(index + 1) + '.'}</label>
            <input className="view-input-name" type="text" id={view.id} value={view.name} onChange={e => this.handleChangeView(e, index)} />
            <input className="view-input-imgurl" type="text" id={view.id} value={view.image_url} onChange={e => this.handleChangeView(e, index)} />
          </section>
            <button  id={view.id} onClick={e => this.submitChangeView(e, index)}>Save</button>
            <span className="delete-x" id={view.id} onClick={e => this.handleDeleteViewButton(e, index)}>&times;</span> 
        </div>
        )
    });
>>>>>>> 253c30a77110759fdf8281f75b75c97ff6a39c53

    return (
      <div>
      <Header />
        <div className="main-fix">
          <ProjectSetupSidebar />
          
          <div className="view-container">
            <div className="view-inner-con">
              <div className="project-section-header">
                  <label>View </label>
              </div>
           
              <div className="view-area drop-shadow">
                <div className="view-wrapper">
                  {displayViews}
              
                  <div className="view-footer">
<<<<<<< HEAD
                  <button className="add-button" onClick={this.addViewItemHandler}> <span/> Add View </button>
=======
                  <button className="add-button" onClick={this.handleAddViewButton}> <span/> Add View </button>
>>>>>>> 253c30a77110759fdf8281f75b75c97ff6a39c53
                  </div>
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