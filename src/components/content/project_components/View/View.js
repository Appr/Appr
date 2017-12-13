import React, { Component } from 'react';
import Header from '../../../Header/Header';
import ProjectSetupSidebar from '../ProjectSetupSidebar/ProjectSetupSidebar';
import { getUId } from '../../../../utils/uid.utils';
import { createProjectView, findProjectViews, findProjectView, updateProjectView, deleteProjectView } from '../../../../services/project.view.services';
import './view.scss';

class View extends Component {
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
                  <button className="add-button" onClick={this.addViewItemHandler}> <span/> Add View </button>
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