import React, { Component } from 'react';
import Header from '../../../Header/Header';
import ProjectSetupSidebar from '../ProjectSetupSidebar/ProjectSetupSidebar'
import './tracker.scss';

class Tracker extends Component {
  render() {
    const { userid, projectid } = this.props.match.params;
    return (
      <div>
      <Header />
        <div className="main-fix">
          <ProjectSetupSidebar userid={userid} projectid={projectid}/>
          <div className="tracker-container">
            <div className="tracker-wrapper">
              <div className="project-section-header">Tracker</div>
              <div className="tracker-list-container">
                  <div className="tracker-item">
                      <label>1.</label>
                      <input type="text" placeholder="(To Do)" />
                  </div>

                  <div className="tracker-item">
                      <label>2.</label>
                      <input type="text" placeholder="(Backlog)" />
                  </div>

                  <div className="tracker-item">
                      <label>3.</label>
                      <input type="text" placeholder="(Repo)" />
                  </div>

                  <div className="tracker-item">
                      <label>4.</label>
                      <input type="text" placeholder="(Routing)" />
                  </div>

                  <div className="tracker-item">
                      <label>5.</label>
                      <input type="text" placeholder="(Database)" />
                  </div>

                  <button> Add List </button>

              </div>
            </div>
              
          </div>
        </div>
      </div>
    );
  }
}

export default Tracker;