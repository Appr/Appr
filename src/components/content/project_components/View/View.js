import React, { Component } from 'react';
import Header from '../../../Header/Header';
import ProjectSetupSidebar from '../ProjectSetupSidebar/ProjectSetupSidebar'
import './view.scss';

class View extends Component {
  render() {
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
                  <div className="view-item">
                    <section>
                      <label>1.</label>
                      <input className="view-input-name" placeholder="Name" type="text" />
                      <input className="view-input-imgurl" placeholder="Image URL" type="text" />
                    </section>
                      <button className="not-enough-info-btn">Save</button>
                      <span className="delete-x">&times;</span> 

                  </div>
              
                  <div className="view-footer">
                  <button className="add-button"> <span /> Add View </button>
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